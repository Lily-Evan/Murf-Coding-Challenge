import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ messages, onSendMessage, isProcessing, currentMode }) => {
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() && !isProcessing) {
            onSendMessage(inputText.trim());
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const getModeIcon = (mode) => {
        const icons = {
            storyteller: '📚',
            voxcoach: '🎤',
            voxbridge: '🌉',
            talkmate: '💬',
            system: '🤖'
        };
        return icons[mode] || '💬';
    };

    const formatMessage = (text) => {
        // Simple markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    };

    return (
        <div className="chat-interface">
            <div className="messages-container">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`message ${message.isUser ? 'user' : 'assistant'} ${message.mode}`}
                    >
                        <div className="message-header">
                            <span className="message-icon">
                                {message.isUser ? '👤' : getModeIcon(message.mode)}
                            </span>
                            <span className="message-time">
                                {message.timestamp.toLocaleTimeString()}
                            </span>
                        </div>
                        <div 
                            className="message-content"
                            dangerouslySetInnerHTML={{ 
                                __html: formatMessage(message.text) 
                            }}
                        />
                    </div>
                ))}
                
                {isProcessing && (
                    <div className="message assistant processing">
                        <div className="message-header">
                            <span className="message-icon">🤖</span>
                            <span className="message-time">Now</span>
                        </div>
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            Thinking...
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <div className="input-container">
                    <textarea
                        ref={inputRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Type your message for ${currentMode} mode...`}
                        disabled={isProcessing}
                        rows={1}
                        className="message-input"
                    />
                    <button 
                        type="submit" 
                        disabled={!inputText.trim() || isProcessing}
                        className="send-button"
                    >
                        {isProcessing ? '⏳' : '📤'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
