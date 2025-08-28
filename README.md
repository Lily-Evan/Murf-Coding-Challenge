# Murf-Coding-Challenge

🎉 VoiceFlow AI! I've created a comprehensive voice assistant with: 

✨ Features:

Smart Mode Detection - Automatically routes to StoryTeller, VoxCoach, VoxBridge, or TalkMate modes
Advanced Voice Processing - Speech-to-text and text-to-speech capabilities
Multi-language Support - Works with multiple languages
Real-time Conversations - Natural dialogue with context awareness

🔧 Complete Code Stack:
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

🚀 Setup Instructions
Clone and setup backend:
mkdir voiceflow-ai && cd voiceflow-ai
mkdir backend && cd backend
npm init -y
npm install express cors dotenv mongoose multer @google/generative-ai
# Copy the backend code files
cp .env.example .env
# Add your API keys to .env
npm run dev
Setup frontend:
cd ../
mkdir frontend && cd frontend
npm create vite@latest . -- --template react
npm install axios lucide-react
# Copy the frontend code files
npm run dev
Environment setup:
Get a Gemini API key from Google AI Studio
Set up MongoDB (local or cloud)
Update the .env file with your credentials
Your VoiceFlow AI is now ready with complete voice processing, multiple AI modes, and a beautiful interface! 🎉

<img width="1635" height="551" alt="image" src="https://github.com/user-attachments/assets/1e0ed72c-7287-4f57-86c4-292a7fd0afb1" />

