const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Only audio files are allowed'));
        }
    }
});

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Mock Speech-to-Text (replace with actual service)
router.post('/speech-to-text', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        // For demo purposes - in production, use Google Speech-to-Text API
        // This is a mock response
        const mockTranscriptions = [
            "Hello, can you help me understand quantum physics?",
            "Tell me a story about artificial intelligence",
            "I need help with my presentation skills",
            "Can you translate this text to Spanish?",
            "What's the weather like today?"
        ];

        const transcription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json({ 
            transcription,
            confidence: 0.95,
            language: req.body.language || 'en-US'
        });

    } catch (error) {
        console.error('Speech-to-text error:', error);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: 'Speech recognition failed' });
    }
});

// Mock Text-to-Speech (replace with actual service)
router.post('/text-to-speech', async (req, res) => {
    try {
        const { text, voice = 'en-US-Neural2-F', speed = 1.0 } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'No text provided' });
        }

        // For demo purposes - return a mock audio URL
        // In production, use Google Text-to-Speech API
        res.json({
            audioUrl: '/api/voice/mock-audio',
            text,
            voice,
            speed
        });

    } catch (error) {
        console.error('Text-to-speech error:', error);
        res.status(500).json({ error: 'Speech synthesis failed' });
    }
});

// Mock audio endpoint
router.get('/mock-audio', (req, res) => {
    // Return a small silent audio file for demo
    const silentAudio = Buffer.from([
        0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45,
        0x66, 0x6D, 0x74, 0x20, 0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
        0x44, 0xAC, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00, 0x02, 0x00, 0x10, 0x00,
        0x64, 0x61, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00
    ]);
    
    res.set({
        'Content-Type': 'audio/wav',
        'Content-Length': silentAudio.length,
    });
    
    res.send(silentAudio);
});

// Voice conversation endpoint
router.post('/conversation', async (req, res) => {
    try {
        const { message, mode = 'talkmate', context = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'No message provided' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Mode-specific prompts
        const modePrompts = {
            storyteller: `You are in StoryTeller mode. Transform the user's request into an engaging story with characters and narrative. Make it educational and memorable. Use vivid descriptions and creative scenarios.`,
            voxcoach: `You are in VoxCoach mode. Provide public speaking coaching, presentation feedback, and communication tips. Be encouraging, constructive, and offer specific actionable advice.`,
            voxbridge: `You are in VoxBridge mode. Help with summarization and translation tasks. Be concise, accurate, and clear in your responses.`,
            talkmate: `You are in TalkMate mode. Engage in natural conversation, answer questions, and be a helpful, friendly companion. Be personable and supportive.`
        };

        const systemPrompt = modePrompts[mode] || modePrompts.talkmate;
        const conversationHistory = context.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n');
        
        const prompt = `${systemPrompt}\n\nConversation History:\n${conversationHistory}\n\nUser: ${message}\n\nAssistant:`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.json({ 
            response,
            mode,
            timestamp: new Date().toISOString(),
            usage: {
                promptTokens: prompt.length,
                completionTokens: response.length
            }
        });

    } catch (error) {
        console.error('Conversation error:', error);
        res.status(500).json({ error: 'Conversation processing failed' });
    }
});

// Get available voices
router.get('/voices', (req, res) => {
    const voices = [
        { id: 'en-US-Neural2-F', name: 'Emma (Female)', language: 'en-US' },
        { id: 'en-US-Neural2-M', name: 'James (Male)', language: 'en-US' },
        { id: 'en-GB-Neural2-F', name: 'Sophie (British Female)', language: 'en-GB' },
        { id: 'es-ES-Neural2-F', name: 'Maria (Spanish Female)', language: 'es-ES' },
        { id: 'fr-FR-Neural2-F', name: 'Claire (French Female)', language: 'fr-FR' },
    ];
    
    res.json({ voices });
});

module.exports = router;
backend/routes/ai.js

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI processing endpoint
router.post('/process', async (req, res) => {
    try {
        const { prompt, mode, options = {} } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'No prompt provided' });
        }

        const model = genAI.getGenerativeModel({ 
            model: options.model || 'gemini-pro',
            generationConfig: {
                temperature: options.temperature || 0.7,
                topP: options.topP || 0.8,
                topK: options.topK || 40,
                maxOutputTokens: options.maxTokens || 1024,
            }
        });

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.json({
            response,
            mode,
            usage: {
                promptTokens: prompt.length,
                completionTokens: response.length,
                totalTokens: prompt.length + response.length
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('AI processing error:', error);
        res.status(500).json({ error: 'AI processing failed' });
    }
});

// Translation endpoint
router.post('/translate', async (req, res) => {
    try {
        const { text, targetLanguage, sourceLanguage = 'auto' } = req.body;

        if (!text || !targetLanguage) {
            return res.status(400).json({ error: 'Text and target language required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
        const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Only return the translation, no explanations:\n\n${text}`;
        
        const result = await model.generateContent(prompt);
        const translation = result.response.text().trim();

        res.json({
            originalText: text,
            translatedText: translation,
            sourceLanguage,
            targetLanguage,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

// Summarization endpoint
router.post('/summarize', async (req, res) => {
    try {
        const { text, length = 'medium' } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'No text provided' });
        }

        const lengthPrompts = {
            short: 'Provide a brief 1-2 sentence summary',
            medium: 'Provide a concise paragraph summary',
            long: 'Provide a detailed summary with key points'
        };

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
        const prompt = `${lengthPrompts[length] || lengthPrompts.medium} of the following text:\n\n${text}`;
        
        const result = await model.generateContent(prompt);
        const summary = result.response.text().trim();

        res.json({
            originalText: text,
            summary,
            length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Summarization error:', error);
        res.status(500).json({ error: 'Summarization failed' });
    }
});

module.exports = router;
