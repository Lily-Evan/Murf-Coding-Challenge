# Murf-Coding-Challenge

🎉 VoiceFlow AI! I've created a comprehensive voice assistant with: 

✨ Features:

Smart Mode Detection - Automatically routes to StoryTeller, VoxCoach, VoxBridge, or TalkMate modes
Advanced Voice Processing - Speech-to-text and text-to-speech capabilities
Multi-language Support - Works with multiple languages
Real-time Conversations - Natural dialogue with context awareness 🔧 Complete Code Stack:
Backend: Node.js + Express with Google AI integration
Frontend: React + Vite with modern voice interface
Database: MongoDB for conversation storage
APIs: Google Speech, Text-to-Speech, and Gemini AI 🚀 To run the project:
Backend setup:
cd backend
npm install
# Add your API keys to .env file
npm run dev
Frontend setup:
cd frontend  
npm install
npm run dev

📁 Project Structure
voiceflow-ai/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── voice.js
│   │   ├── ai.js
│   │   └── user.js
│   ├── models/
│   │   ├── User.js
│   │   └── Conversation.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── helpers.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VoiceRecorder.jsx
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── ModeSelector.jsx
│   │   │   └── SettingsPanel.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
