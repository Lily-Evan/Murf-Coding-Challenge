import React from 'react';
import './ModeSelector.css';

const ModeSelector = ({ currentMode, onModeChange }) => {
    const modes = [
        {
            id: 'storyteller',
            name: 'StoryTeller',
            icon: '📚',
            description: 'Transform concepts into engaging stories',
            color: '#FF6B6B'
        },
        {
            id: 'voxcoach',
            name: 'VoxCoach',
            icon: '🎤',
            description: 'Public speaking coaching & feedback',
            color: '#4ECDC4'
        },
        {
            id: 'voxbridge',
            name: 'VoxBridge',
            icon: '🌉',
            description: 'Summarization & translation',
            color: '#45B7D1'
        },
        {
            id: 'talkmate',
            name: 'TalkMate',
            icon: '💬',
            description: 'Natural conversation & Q&A',
            color: '#96CEB4'
        }
    ];

    return (
        <div className="mode-selector">
            <h3>🎯 Choose Your Mode</h3>
            <div className="modes-grid">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        className={`mode-button ${currentMode === mode.id ? 'active' : ''}`}
                        onClick={() => onModeChange(mode.id)}
                        style={{
                            '--mode-color': mode.color
                        }}
                    >
                        <div className="mode-icon">{mode.icon}</div>
                        <div className="mode-info">
                            <div className="mode-name">{mode.name}</div>
                            <div className="mode-description">{mode.description}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ModeSelector;
