

import React, { useState, useRef, useEffect } from 'react';
import './VoiceRecorder.css';

const VoiceRecorder = ({ onVoiceInput, isRecording, setIsRecording, isProcessing }) => {
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const [audioLevel, setAudioLevel] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 48000
                } 
            });

            // Set up audio level monitoring
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            
            analyserRef.current.fftSize = 256;
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateAudioLevel = () => {
                if (isRecording) {
                    analyserRef.current.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / bufferLength;
                    setAudioLevel(average);
                    requestAnimationFrame(updateAudioLevel);
                }
            };
            updateAudioLevel();

            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(chunksRef.current, { 
                    type: 'audio/webm;codecs=opus' 
                });
                onVoiceInput(audioBlob);
                
                // Stop all tracks and clean up
                stream.getTracks().forEach(track => track.stop());
                if (audioContextRef.current) {
                    audioContextRef.current.close();
                }
                setAudioLevel(0);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="voice-recorder">
            <div className="recorder-container">
                <button
                    className={`record-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
                    onClick={toggleRecording}
                    disabled={isProcessing}
                    style={{
                        transform: isRecording ? `scale(${1 + audioLevel / 500})` : 'scale(1)'
                    }}
                >
                    {isProcessing ? (
                        <div className="processing-spinner">
                            <div className="spinner"></div>
                        </div>
                    ) : isRecording ? (
                        <div className="recording-indicator">
                            <div className="pulse"></div>
                            🔴
                        </div>
                    ) : (
                        <div className="mic-icon">🎤</div>
                    )}
                </button>
                
                {isRecording && (
                    <div className="audio-visualizer">
                        <div 
                            className="audio-bar" 
                            style={{ height: `${Math.min(audioLevel / 2, 50)}px` }}
                        ></div>
                    </div>
                )}
            </div>
            
            <div className="recorder-status">
                {isProcessing ? 'Processing your voice...' : 
                 isRecording ? 'Listening... Click to stop' : 
                 'Click to start voice input'}
            </div>

            <div className="recorder-tips">
                <p>💡 Tip: Speak clearly and wait for the processing to complete</p>
            </div>
        </div>
    );
};

export default VoiceRecorder;
