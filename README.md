🎙 VoiceFlow AI

VoiceFlow AI is a comprehensive voice assistant platform that leverages advanced AI to provide multi-mode, real-time voice interactions. Whether it’s storytelling, coaching, translating, or casual conversation, VoiceFlow AI adapts intelligently to your needs.

✨ Features

Smart Mode Detection – Automatically switches between:

StoryTeller – Narrates stories dynamically

VoxCoach – Provides coaching and guidance

VoxBridge – Translates or connects conversations across languages

TalkMate – General-purpose AI chat

Advanced Voice Processing – High-quality speech-to-text and text-to-speech support

Multi-language Support – Converse naturally in multiple languages

Real-time Conversations – Context-aware dialogue for smooth interactions

🛠 Tech Stack

Backend: Node.js + Express + Google AI integration

Frontend: React + Vite with modern voice UI

Database: MongoDB for conversation storage

APIs: Google Speech-to-Text, Text-to-Speech, Gemini AI

🚀 Getting Started
1. Backend Setup
# Navigate to project directory
mkdir voiceflow-ai && cd voiceflow-ai
mkdir backend && cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express cors dotenv mongoose multer @google/generative-ai


Copy backend code files into backend/

Duplicate .env.example → .env and add your API keys

Start the backend server:

npm run dev

2. Frontend Setup
cd ../
mkdir frontend && cd frontend

# Create React + Vite project
npm create vite@latest . -- --template react

# Install dependencies
npm install axios lucide-react


Copy frontend code files into frontend/

Start the frontend server:

npm run dev

3. Environment Configuration

Google AI Studio: Obtain a Gemini API key

MongoDB: Set up a local or cloud instance

Add your credentials to the .env file

Your VoiceFlow AI is now ready to run with full voice capabilities, multiple AI modes, and a clean interface! 🎉

📂 Folder Structure
voiceflow-ai/
├─ backend/
│  ├─ index.js
│  ├─ routes/
│  ├─ controllers/
│  ├─ models/
│  └─ .env
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ App.jsx
│  ├─ public/
│  └─ package.json
└─ README.md

🔑 Environment Variables

Example .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_api_key
GEMINI_API_KEY=your_gemini_api_key

💡 Tips

Ensure backend is running before starting frontend

For multi-language support, configure the Google Speech API accordingly

Keep .env secure — never commit API keys

<img width="1666" height="607" alt="image" src="https://github.com/user-attachments/assets/c02d64c7-3932-4e54-8a6b-ac807745f806" />


