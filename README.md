# 🤖 AI Resume Matcher

An intelligent full-stack AI application that analyzes resumes against job descriptions using **RAG (Retrieval-Augmented Generation)**, **Gemini AI**, and **vector similarity search**.

It gives:
- ATS Score
- Matched Skills
- Missing Skills
- Resume Improvement Suggestions
- AI Summary

---

# 🚀 Features

- 📄 Upload Resume PDF
- 🧠 AI-Powered Resume Analysis
- 🔍 Semantic Matching using Vector Search
- 📊 ATS Score Calculation
- ✅ Matched Skills Detection
- ❌ Missing Skills Detection
- 💡 Resume Improvement Suggestions
- ⚡ Fast and Modern UI
- 🔗 Full Stack Architecture

---

# 🛠️ Tech Stack

## Frontend
- Next.js 15
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- Multer
- pdf-parse
- LangChain
- FAISS
- Gemini AI

## AI / RAG
- Google Gemini Embeddings
- Gemini 2.0 Flash
- FAISS Vector Database
- RecursiveCharacterTextSplitter

---

# 📁 Project Structure

```bash
ai-resume-matcher/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── gemini.js
│   │   ├── routes/
│   │   │   ├── upload.js
│   │   │   └── analyze.js
│   │   ├── services/
│   │   │   ├── pdfParser.js
│   │   │   ├── chunker.js
│   │   │   ├── embedder.js
│   │   │   ├── vectorStore.js
│   │   │   └── analyzer.js
│   │   ├── utils/
│   │   │   ├── fileHelper.js
│   │   │   └── promptBuilder.js
│   │   └── app.js
│   │
│   ├── uploads/
│   ├── data/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.js
│   │   ├── results/
│   │   │   └── page.js
│   │   ├── layout.js
│   │   └── globals.css
│   │
│   ├── components/
│   ├── lib/
│   │   └── api.js
│   └── .env.local
│
└── README.md

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/ai-resume-matcher.git
cd ai-resume-matcher
```

---

# 🔧 Backend Setup

## Install Dependencies

```bash
cd backend
npm install
```

## Create `.env`

```env
PORT=5000
GOOGLE_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:3000
```

⚠️ IMPORTANT:

Use:

```env
GOOGLE_API_KEY=
```

NOT:

```env
GEMINI_API_KEY=
```

Because LangChain Gemini embeddings require `GOOGLE_API_KEY`.

---

## Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Install Dependencies

```bash
cd ../frontend
npm install
```

## Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🧠 How RAG Works

## 1. Resume Upload

```text
PDF → Text Extraction → Chunking → Embeddings → FAISS Storage
```

## 2. Job Description Analysis

```text
Job Description → Embedding → Similarity Search → Top Resume Chunks
```

## 3. AI Generation

```text
Resume Chunks + Job Description → Gemini AI → ATS Analysis
```

---

# 📦 Required Packages

## Backend

```bash
npm install express cors dotenv multer morgan pdf-parse
npm install @google/generative-ai
npm install @langchain/google-genai
npm install @langchain/community
npm install @langchain/textsplitters
npm install langchain
npm install faiss-node
```

## Frontend

```bash
npm install axios
```

---

# 🌟 Future Improvements

- User Authentication
- Resume History
- Cover Letter Generator
- PDF Export
- DOCX Support
- AI Resume Rewrite
- Interview Question Generator

---

# 👨‍💻 Author

## Hasir Ali

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.

---

Built with ❤️ using:

- Gemini AI
- LangChain
- FAISS
- Next.js
- Express.js
