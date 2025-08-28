import React, { useState, useRef, useEffect } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import ChatInterface from './components/ChatInterface';
import ModeSelector from './components/ModeSelector';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

function App() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "🎙️ Hello! I'm VoiceFlow AI, your intelligent voice companion. How can I help you today?",
            isUser: false,
            timestamp: new Date(),
            mode: 'system'
        }
    ]);
    const [currentMode, setCurrentMode] = useState('talkmate');
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [settings, setSettings] = useState({
        voice: 'en-US-Neural2-F',
        speed: 1.0,
        language: 'en-US',
        autoSpeak: true,
        apiUrl: 'http://localhost:5000'
    });

    const addMessage = (message, isUser = false) => {
        const newMessage = {
            id: Date.now(),
            text: message,
            isUser,
            timestamp: new Date(),
            mode: currentMode
        };
        setMessages(prev => [...prev, newMessage]);
        return newMessage;
    };

    const handleVoiceInput = async (audioBlob) => {
        setIsProcessing(true);
        
        try {
            // Convert speech to text
            const formData = new FormData();
            formData.append('audio', audioBlob);
            formData.append('language', settings.language);

            const response = await fetch(`${settings.apiUrl}/api/voice/speech-to-text`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Speech recognition failed');
            }

            const { transcription } = await response.json();
            
            if (transcription) {
                addMessage(transcription, true);
                await processMessage(transcription);
            }
        } catch (error) {
            console.error('Voice input error:', error);
            addMessage('Sorry, I couldn\'t understand that. Please try again.', false);
        } finally {
            setIsProcessing(false);
        }
    };

    const processMessage = async (message) => {
        setIsProcessing(true);
        
        try {
            const response = await fetch(`${settings.apiUrl}/api/voice/conversation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    mode: currentMode,
                    context: messages.slice(-10).map(msg => ({
                        role: msg.isUser ? 'user' : 'assistant',
                        content: msg.text
                    }))
                })
            });

            if (!response.ok) {
                throw new Error('Conversation processing failed');
            }

            const { response: aiResponse } = await response.json();
            addMessage(aiResponse, false);

            // Auto-speak if enabled
            if (settings.autoSpeak) {
                await speakText(aiResponse);
            }
        } catch (error) {
            console.error('Message processing error:', error);
            addMessage('Sorry, I encountered an error. Please try again.', false);
        } finally {
            setIsProcessing(false);
        }
    };

    const speakText = async (text) => {
        try {
            const response = await fetch(`${settings.apiUrl}/api/voice/text-to-speech`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    voice: settings.voice,
                    speed: settings.speed
                })
            });

            if (!response.ok) {
                throw new Error('Text-to-speech failed');
            }

            const { audioUrl } = await response.json();
            
            // For demo purposes, we'll use the browser's speech synthesis
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = settings.speed;
                utterance.lang = settings.language;
                speechSynthesis.speak(utterance);
            }
        } catch (error) {
            console.error('Text-to-speech error:', error);
        }
    };

    const handleTextInput = async (message) => {
        addMessage(message, true);
        await processMessage(message);
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <h1>🎙️ VoiceFlow AI</h1>
                    <p>Your Intelligent Voice Companion</p>
                </div>
                <div className="mode-indicator">
                    Mode: <span className={`mode-badge ${currentMode}`}>
                        {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)}
                    </span>
                </div>
            </header>

            <div className="app-content">
                <div className="sidebar">
                    <ModeSelector 
                        currentMode={currentMode}
                        onModeChange={setCurrentMode}
                    />
                    <SettingsPanel 
                        settings={settings}
                        onSettingsChange={setSettings}
                    />
                </div>

                <div className="main-content">
                    <ChatInterface 
                        messages={messages}
                        onSendMessage={handleTextInput}
                        isProcessing={isProcessing}
                        currentMode={currentMode}
                    />
                    
                    <VoiceRecorder
                        onVoiceInput={handleVoiceInput}
                        isRecording={isRecording}
                        setIsRecording={setIsRecording}
                        isProcessing={isProcessing}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
