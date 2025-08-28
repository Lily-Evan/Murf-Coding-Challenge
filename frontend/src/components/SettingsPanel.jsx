import React, { useState } from 'react';
import './SettingsPanel.css';

const SettingsPanel = ({ settings, onSettingsChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const voices = [
        { id: 'en-US-Neural2-F', name: 'Emma (Female)', language: 'en-US' },
        { id: 'en-US-Neural2-M', name: 'James (Male)', language: 'en-US' },
        { id: 'en-GB-Neural2-F', name: 'Sophie (British)', language: 'en-GB' },
        { id: 'es-ES-Neural2-F', name: 'Maria (Spanish)', language: 'es-ES' },
        { id: 'fr-FR-Neural2-F', name: 'Claire (French)', language: 'fr-FR' },
    ];

    const languages = [
        { code: 'en-US', name: 'English (US)' },
        { code: 'en-GB', name: 'English (UK)' },
        { code: 'es-ES', name: 'Spanish' },
        { code: 'fr-FR', name: 'French' },
        { code: 'de-DE', name: 'German' },
        { code: 'it-IT', name: 'Italian' },
        { code: 'pt-PT', name: 'Portuguese' },
        { code: 'ru-RU', name: 'Russian' },
        { code: 'ja-JP', name: 'Japanese' },
        { code: 'ko-KR', name: 'Korean' },
        { code: 'zh-CN', name: 'Chinese (Simplified)' },
    ];

    const updateSetting = (key, value) => {
        onSettingsChange({
            ...settings,
            [key]: value
        });
    };

    return (
        <div className="settings-panel">
            <button 
                className="settings-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                ⚙️ Settings
            </button>

            {isOpen && (
                <div className="settings-content">
                    <h3>🔧 Voice Settings</h3>
                    
                    <div className="setting-group">
                        <label>Voice:</label>
                        <select 
                            value={settings.voice}
                            onChange={(e) => updateSetting('voice', e.target.value)}
                        >
                            {voices.map(voice => (
                                <option key={voice.id} value={voice.id}>
                                    {voice.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="setting-group">
                        <label>Speech Speed:</label>
                        <input
                            type="range"
                            min="0.5"
                            max="2.0"
                            step="0.1"
                            value={settings.speed}
                            onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
                        />
                        <span>{settings.speed}x</span>
                    </div>

                    <div className="setting-group">
                        <label>Language:</label>
                        <select 
                            value={settings.language}
                            onChange={(e) => updateSetting('language', e.target.value)}
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="setting-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.autoSpeak}
                                onChange={(e) => updateSetting('autoSpeak', e.target.checked)}
                            />
                            Auto-speak responses
                        </label>
                    </div>

                    <div className="setting-group">
                        <label>API URL:</label>
                        <input
                            type="text"
                            value={settings.apiUrl}
                            onChange={(e) => updateSetting('apiUrl', e.target.value)}
                            placeholder="http://localhost:5000"
                        />
                    </div>

                    <div className="settings-info">
                        <p>💡 Adjust these settings to customize your VoiceFlow AI experience</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPanel;
