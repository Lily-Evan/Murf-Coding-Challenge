🎙 VoiceFlow AI








VoiceFlow AI is a smart voice assistant platform with multi-mode AI support. It enables storytelling, coaching, language translation, and natural conversation with real-time context awareness.

✨ Features

Smart Mode Detection: Automatically switches between modes:

StoryTeller – Dynamic storytelling

VoxCoach – Coaching & guidance

VoxBridge – Translating & bridging conversations

TalkMate – General AI chat

Advanced Voice Processing: Speech-to-text and text-to-speech

Multi-language Support – Converse in multiple languages

Real-time Conversations: Maintains context-aware dialogue

🛠 Tech Stack

Backend: Node.js + Express + Google AI

Frontend: React + Vite

Database: MongoDB

APIs: Google Speech-to-Text, Text-to-Speech, Gemini AI

🚀 Installation
Backend
mkdir voiceflow-ai && cd voiceflow-ai
mkdir backend && cd backend
npm init -y
npm install express cors dotenv mongoose multer @google/generative-ai


Copy backend code files

Duplicate .env.example → .env and add your API keys

Start the backend server:

npm run dev

Frontend
cd ../
mkdir frontend && cd frontend
npm create vite@latest . -- --template react
npm install axios lucide-react


Copy frontend code files

Start the frontend server:

npm run dev

⚙️ Environment Variables

Create a .env file in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_api_key
GEMINI_API_KEY=your_gemini_api_key

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

💡 Tips

Start the backend before the frontend

Keep .env private and secure

Configure Google APIs for multi-language support

<img width="1666" height="607" alt="image" src="https://github.com/user-attachments/assets/c02d64c7-3932-4e54-8a6b-ac807745f806" />


