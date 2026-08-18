ResumeIQ

AI-powered resume intelligence and job matching platform built with Python, FastAPI, React, NLP, and machine learning.

🚀 Live Demo — ResumeIQ

ResumeIQ is an end-to-end AI/ML web application designed to help students and job seekers understand the quality of their resumes and evaluate how well their skills and experience align with a target job description.

The project combines PDF text extraction, rule-based skill detection, resume structure analysis, resume quality scoring, job skill matching, text similarity, recommendations, and an interactive web interface into a single application.

📌 Project Overview

A traditional resume checker often focuses only on keywords.

ResumeIQ attempts to provide a broader analysis by examining:

Resume structure
Resume sections
Technical skills
Resume content
Skill distribution
Job requirements
Matched skills
Missing skills
Text similarity
Overall resume quality

The system produces both a resume quality score and a job compatibility score.

🎯 Problem Statement

Students and freshers often face two major problems when applying for jobs:

They don't know how strong their resume actually is.
They don't know whether their resume matches a particular job description.

Manually comparing a resume with multiple job descriptions is time-consuming.

ResumeIQ attempts to simplify this process by automatically analyzing a resume and comparing it against job requirements.

💡 Solution

ResumeIQ provides two major capabilities.

1. Resume Intelligence

Upload a PDF resume and the system analyzes:

Resume
  ↓
PDF Text Extraction
  ↓
Section Detection
  ↓
Skill Detection
  ↓
Structure Analysis
  ↓
Content Analysis
  ↓
Resume Quality Score
2. Job Matching

The extracted resume information can then be compared against a job description:

Resume
   +
Job Description
   ↓
Skill Matching
   +
Text Similarity
   ↓
Hybrid Match Score
   ↓
Matched Skills
Missing Skills
Recommendations
✨ Features
📄 Resume Upload
PDF resume upload
Drag-and-drop support
File validation
Maximum file size of 5 MB
PDF text extraction using PyMuPDF
🧠 Resume Skill Detection

ResumeIQ identifies technical skills from resume content and organizes them into categories.

Current categories include:

Programming Languages
Data Science
Machine Learning
Databases
Web Development
Cloud & DevOps
AI Tools

Skills are detected using a predefined skill database stored in:

backend/app/data/skills.json

The extractor normalizes text and performs controlled skill matching rather than relying entirely on exact raw string comparison.

📊 Resume Quality Analysis

ResumeIQ evaluates a resume across multiple dimensions:

Sections
Skills
Content
Structure

These individual measurements contribute to an overall resume quality score.

The frontend presents the result using an animated score visualization.

Example:

             ┌──────────────┐
             │              │
             │      82%     │
             │    Strong    │
             │              │
             └──────────────┘


Sections      ████████████░░
Skills        █████████████░
Content       ███████████░░░
Structure     ████████████░░
🎯 Job Matching

Users can provide a job description and compare it with their resume.

ResumeIQ calculates:

Skill match score
Text similarity score
Overall match score
Matched skills
Missing skills

The matching system is implemented using:

HybridMatcher
      │
      ├── JobMatcher
      │
      └── SemanticMatcher
🔗 Hybrid Matching

The original matching architecture combines two signals:

40% Skill Match
       +
60% Semantic/Text Similarity
       =
Final Match Score
Skill Matching

The JobMatcher normalizes resume and job-description skills and determines:

Matched Skills
Missing Skills
Skill Match Percentage
Semantic Matching

During local development, ResumeIQ uses:

Sentence Transformers
        ↓
all-MiniLM-L6-v2
        ↓
Text Embeddings
        ↓
Cosine Similarity

This allows the application to compare the meaning of resume and job-description text rather than relying only on exact keywords.

🧮 Free-Tier Production Optimization

During deployment, the original Sentence Transformer + PyTorch stack exceeded the memory available on free hosting infrastructure.

Instead of paying for a larger server, the production architecture was optimized.

Local Development
Sentence Transformers
        ↓
all-MiniLM-L6-v2
        ↓
Embedding Similarity
Production
TF-IDF Vectorization
        ↓
Cosine Similarity
        ↓
Lightweight Text Similarity

The production matcher therefore avoids loading the large PyTorch/Sentence Transformer stack.

The same SemanticMatcher interface is maintained while the implementation switches based on the environment.

ENVIRONMENT=development
        ↓
all-MiniLM-L6-v2




ENVIRONMENT=production
        ↓
TF-IDF

This allowed ResumeIQ to remain deployed on free infrastructure without removing the original ML implementation from the development environment.

💡 Recommendation Engine

ResumeIQ also analyzes missing skills and generates recommendations based on the detected gaps.

Recommendations can include:

Missing skills
Priority
Reason
Suggested action
Potential resume impact

This helps move the application beyond simply saying:

"You are missing X."

and toward:

"Here is what you could improve."

🎨 UI/UX

The frontend was designed to feel like a modern AI product rather than a basic form-based application.

The UI includes:

Professional dark interface
Resume/job themed animated background
Drag-and-drop resume upload
Animated processing states
Interactive score visualization
Animated progress indicators
Interactive skill cards
Category-based skill visualization
Hover animations
Responsive layouts
Smooth transitions
AI-style visual feedback

The UI was developed iteratively, with the initial functional interface later redesigned to improve the overall visual experience.

🏗️ System Architecture
                         ┌─────────────────────┐
                         │      User           │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ React Frontend      │
                         │ Vite + Tailwind     │
                         │ Framer Motion       │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │ FastAPI Backend     │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │ Resume      │       │ Resume      │       │ Job         │
       │ Service     │       │ Analysis    │       │ Matching    │
       └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │ PyMuPDF     │       │ Skills      │       │ Hybrid      │
       │             │       │ Sections    │       │ Matcher     │
       └─────────────┘       │ Quality     │       └──────┬──────┘
                             └─────────────┘              │
                                                         ▼
                                                  ┌─────────────┐
                                                  │ Results &   │
                                                  │ Recommend.  │
                                                  └─────────────┘
🔄 Complete Workflow
                    PDF Resume
                        │
                        ▼
                ┌───────────────┐
                │ PDF Extraction│
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Resume Text   │
                └───────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      Sections        Skills       Content
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                Resume Quality
                     Score
                        │
                        ▼
                ┌───────────────┐
                │ Job Description│
                └───────┬───────┘
                        │
                        ▼
               ┌────────────────┐
               │ Job Skill Match│
               └───────┬────────┘
                       │
                       +
               ┌───────▼────────┐
               │ Text Similarity │
               └───────┬────────┘
                       │
                       ▼
                Hybrid Match Score
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
      Matched Skills       Missing Skills
                                   │
                                   ▼
                           Recommendations
🛠️ Technology Stack
Frontend
React
Vite
Tailwind CSS
Framer Motion
Lucide React
Axios
Backend
Python
FastAPI
Uvicorn
Pydantic
SQLAlchemy
AI / ML / NLP
Sentence Transformers
scikit-learn
NumPy
Pandas
spaCy ecosystem was explored during development, but the final backend implementation does not directly import spaCy.
Resume Processing
PyMuPDF
Database
SQLite
SQLAlchemy
Development & Deployment
Git
GitHub
Ubuntu/Linux
Python virtual environments
Render
📁 Project Structure
ResumeIQ/
│
├── backend/
│   └── app/
│       ├── api/
│       │   ├── analysis.py
│       │   ├── database_test.py
│       │   ├── job.py
│       │   └── resume.py
│       │
│       ├── core/
│       │   ├── config.py
│       │   └── database.py
│       │
│       ├── data/
│       │   └── skills.json
│       │
│       ├── models/
│       │   └── analysis.py
│       │
│       ├── repositories/
│       │   └── analysis_repository.py
│       │
│       ├── schemas/
│       │   └── analysis.py
│       │
│       ├── services/
│       │   ├── analysis_service.py
│       │   ├── hybrid_matcher.py
│       │   ├── job_matcher.py
│       │   ├── recommendation_engine.py
│       │   ├── resume_quality_analyzer.py
│       │   ├── resume_section_detector.py
│       │   ├── resume_service.py
│       │   ├── semantic_matcher.py
│       │   └── skill_extractor.py
│       │
│       └── main.py
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── analysis/
│       │   │   └── ResumeScore.jsx
│       │   │
│       │   ├── job/
│       │   │   ├── JobDescription.jsx
│       │   │   ├── JobMatchResult.jsx
│       │   │   └── JobRecommendations.jsx
│       │   │
│       │   ├── resume/
│       │   │   ├── DetectedSkills.jsx
│       │   │   ├── ExtractedResume.jsx
│       │   │   └── ResumeStructure.jsx
│       │   │
│       │   └── upload/
│       │       └── ResumeUpload.jsx
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── jobService.js
│       │   └── resumeService.js
│       │
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── requirements.txt
├── requirements-render.txt
├── .python-version
├── resumeiq.db
└── README.md
⚙️ Local Installation
1. Clone the repository
git clone https://github.com/prathambr1631/ResumeIQ.git
cd ResumeIQ
2. Create a virtual environment
python3.12 -m venv .venv

Activate it:

source .venv/bin/activate
3. Install Python dependencies
pip install -r requirements.txt
4. Install frontend dependencies
cd frontend
npm install
▶️ Running Locally

ResumeIQ requires the backend and frontend to run simultaneously.

Backend

Terminal 1:

cd ~/ResumeIQ
source .venv/bin/activate
uvicorn backend.app.main:app --reload

Backend:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs
Frontend

Terminal 2:

cd ~/ResumeIQ/frontend
npm run dev

Frontend:

http://localhost:5173
🔌 API Endpoints
Health Check
GET /health

Example response:

{
  "status": "healthy",
  "service": "ResumeIQ API",
  "environment": "production"
}
Resume Extraction
POST /api/resumes/extract

Accepts a PDF resume and processes its contents.

Job Matching
POST /api/jobs/match

Compares resume information against a supplied job description.

API Documentation

FastAPI automatically provides interactive documentation at:

/docs
☁️ Deployment

ResumeIQ is deployed using Render.

Frontend
React + Vite
        ↓
Render Static Site
        ↓
https://resumeiq-ry78.onrender.com
Backend
FastAPI
        ↓
Render Web Service
        ↓
https://resumeiq-api-python.onrender.com

The frontend communicates with the backend using the production API URL:

https://resumeiq-api-python.onrender.com

CORS is configured on the backend to allow requests from the deployed frontend.

🔐 Environment Variables
Frontend

The frontend uses:

VITE_API_URL

Example:

VITE_API_URL=https://resumeiq-api-python.onrender.com

For local development, the application can fall back to:

http://127.0.0.1:8000
Backend

Important backend configuration values include:

ENVIRONMENT
ALLOWED_ORIGINS
DATABASE_URL

Production uses:

ENVIRONMENT=production
🧪 Testing & Verification

The project was tested incrementally during development.

Backend
FastAPI startup
Health endpoint
API documentation
Resume processing
Job matching
Production matcher
ML

Local semantic matching was tested using:

all-MiniLM-L6-v2

Production matching was tested using:

TF-IDF + cosine similarity
Frontend

Production build was verified using:

npm run build

The Vite production build completed successfully.

Deployment

The deployed application was tested end-to-end:

Live Frontend
      ↓
Live Backend
      ↓
Resume Analysis
      ↓
Skill Detection
      ↓
Resume Scoring
      ↓
Job Matching
🧠 Development Journey

ResumeIQ was developed iteratively rather than being built as a single application in one step.

The major development stages were:

Phase 1 — Backend Foundation
FastAPI application architecture
API routing
Configuration
Database setup
Resume processing foundation
Phase 2 — Resume Intelligence
PDF extraction
Resume section detection
Skill database
Skill extraction
Resume quality analysis
Phase 3 — Job Matching
Job skill matching
Missing skill detection
Semantic similarity
Hybrid matching
Recommendation engine
Phase 4 — Frontend
React/Vite application
Resume upload interface
API integration
Analysis components
Job matching interface
Phase 5 — UI/UX

The initial functional UI was redesigned to provide:

Better visual hierarchy
Professional color system
Animations
Interactive score visualization
Interactive skill cards
Animated background
Better responsive behavior
Phase 6 — Deployment
GitHub repository setup
Production environment
Render backend
Free-tier memory optimization
Production frontend
CORS configuration
End-to-end live testing
🤖 LLM / AI-Assisted Development

An LLM was used as a development assistant throughout the project.

Its role included assistance with:

Understanding technical concepts
Project architecture discussions
Debugging
Troubleshooting errors
Code suggestions
Refactoring ideas
UI/UX ideas
Deployment troubleshooting
Git/GitHub guidance
Documentation
Explaining errors and implementation decisions

The project was developed iteratively by implementing, running, testing, debugging, and modifying the code in the local development environment.

The LLM was therefore used as a development and learning tool, rather than treating generated code as an automatically completed project.

⚠️ Current Limitations

ResumeIQ is currently a student/developer project and has several limitations.

Semantic Matching

The production deployment uses TF-IDF instead of the Sentence Transformer model because of free-tier memory constraints.

Therefore, production semantic matching is not identical to the local embedding-based implementation.

Skill Detection

Skill detection currently relies on the predefined skill database.

A skill that is not present in the database may not be detected automatically.

PDF Processing

The current implementation primarily works with text-based PDF resumes.

Scanned/image-only resumes may require OCR support.

Database

The current project uses SQLite for its database layer.

A production-scale deployment would benefit from a managed database such as PostgreSQL.

🚧 Future Improvements

Possible future improvements include:

OCR for scanned resumes
Larger skill database
Advanced NLP-based skill extraction
Better semantic ranking
Resume improvement suggestions
ATS compatibility analysis
Resume keyword optimization
Job recommendation system
User authentication
Resume version management
User profiles
Resume history
PostgreSQL deployment
Cloud-based ML inference
LinkedIn integration
Personalized career roadmap
More advanced job ranking
🎓 What I Learned

Building ResumeIQ provided hands-on experience with:

Python backend development
FastAPI
REST APIs
React
Vite
Tailwind CSS
Framer Motion
PDF processing
NLP concepts
Text similarity
Machine learning workflows
Sentence Transformers
TF-IDF
Cosine similarity
SQLAlchemy
SQLite
Environment variables
CORS
Git/GitHub
Linux development
Cloud deployment
Free-tier resource optimization
Debugging production deployments

One of the most valuable parts of the project was learning that an ML solution that works locally may require architectural changes when deployed under strict resource constraints.

🚀 Future Vision

ResumeIQ can eventually evolve from a resume analyzer into a broader AI career assistant capable of helping users:

Resume
   ↓
Skills
   ↓
Career Profile
   ↓
Job Matching
   ↓
Skill Gaps
   ↓
Learning Recommendations
   ↓
Career Roadmap
👨‍💻 Author

Pratham B R

BTech AI & ML Student

GitHub:

github.com/prathambr1631

Project:

ResumeIQ on GitHub

Live Application:

ResumeIQ Live Demo
