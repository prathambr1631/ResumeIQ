# ResumeIQ

### AI-Powered Resume Intelligence & Job Matching Platform

ResumeIQ is a full-stack AI/ML web application that helps students and job seekers understand the quality of their resume, identify their technical skills, compare their profile against a target job description, and discover the skills they should improve.

Instead of acting as a simple keyword-based resume checker, ResumeIQ combines **PDF text extraction, resume structure analysis, skill detection, resume quality scoring, job skill matching, text similarity, and personalized recommendations** into one interactive platform.

> **Understand your resume. Understand your opportunities.**

---

## 🚀 Live Demo

**ResumeIQ:** https://resumeiq-ry78.onrender.com/

The application is deployed using Render with a React/Vite frontend and FastAPI backend.

---

## ✨ Features

### 📄 Resume Upload & Extraction

* Upload a PDF resume
* Drag-and-drop file support
* PDF validation
* Maximum file size of 5 MB
* Extract text directly from PDF files using PyMuPDF
* Display extracted resume content
* Copy extracted text directly from the interface

---

### 🧠 Resume Intelligence

ResumeIQ analyzes the uploaded resume across multiple dimensions.

The system evaluates:

* Resume sections
* Technical skills
* Resume content
* Resume structure
* Overall resume quality

The result is presented through an interactive score visualization.

Example analysis:

```text
Overall Resume Score
        82%
       Strong

Sections     60%
Skills      100%
Content      85%
Structure   100%
```

---

### 🧩 Resume Structure Analysis

ResumeIQ detects common resume sections and shows which sections are present or missing.

Currently analyzed sections include:

* Summary
* Experience
* Education
* Skills
* Projects
* Certifications
* Achievements
* Languages

The system calculates a section coverage score based on the detected structure.

---

### 🛠️ Automatic Skill Detection

ResumeIQ extracts technical skills from the uploaded resume and organizes them into categories.

Current skill categories include:

* Programming
* Data Science
* Machine Learning
* Web Development
* Cloud & DevOps
* Databases
* AI Tools

Skills are detected using a predefined skill database located at:

```text
backend/app/data/skills.json
```

The extracted skills are then visualized using interactive category cards.

Example:

```text
Programming
├── C
├── C++
├── Java
├── JavaScript
├── Python
└── R

Data Science
├── Jupyter
└── Pandas

Machine Learning
├── Machine Learning
├── Regression
└── Scikit-learn

Web Development
├── HTML
├── CSS
├── React
├── FastAPI
└── REST APIs
```

---

## 🎯 Job Matching

ResumeIQ allows users to paste a real job description and compare it against their resume.

The system analyzes:

* Required skills
* Skills already present in the resume
* Missing skills
* Skill match percentage
* Text similarity
* Overall job compatibility

Example:

```text
Job Match Score
      33%
    Low Match

Skill Match       56%
Semantic Match    18%

Matched Skills
├── Git
├── Machine Learning
├── Pandas
├── Python
└── Scikit-learn

Missing Skills
├── Docker
├── Model Evaluation
├── NumPy
└── SQL
```

---

## 🔗 Hybrid Matching System

ResumeIQ uses a hybrid approach instead of depending only on keyword matching.

The matching architecture combines:

```text
                 Resume
                   │
                   ▼
             Skill Extraction
                   │
                   ▼
            ┌───────────────┐
            │ Job Matcher   │
            └───────┬───────┘
                    │
              Skill Match
                    │
                    ▼
             ┌───────────────┐
             │   Semantic    │
             │    Matcher    │
             └───────┬───────┘
                     │
               Text Similarity
                     │
                     ▼
             Hybrid Match Score
```

The current scoring architecture uses:

```text
40% Skill Match
        +
60% Semantic / Text Similarity
        =
Final Match Score
```

This allows ResumeIQ to consider both explicit technical skills and broader textual similarity between a resume and a job description.

---

## 🤖 Semantic Matching

During local development, ResumeIQ can use:

```text
Sentence Transformers
        ↓
all-MiniLM-L6-v2
        ↓
Text Embeddings
        ↓
Cosine Similarity
```

This allows resume and job-description text to be compared based on semantic similarity rather than only exact keyword overlap.

---

## ⚡ Production Optimization

One of the interesting engineering challenges in ResumeIQ was deploying an ML application on free hosting infrastructure.

The original local semantic-matching implementation uses Sentence Transformers and PyTorch.

However, loading the complete transformer stack exceeded the memory available on the free deployment environment.

Instead of removing the semantic matching architecture completely, the application was optimized based on the execution environment.

### Local Development

```text
Sentence Transformers
        ↓
all-MiniLM-L6-v2
        ↓
Embeddings
        ↓
Cosine Similarity
```

### Production

```text
TF-IDF Vectorization
        ↓
Cosine Similarity
        ↓
Lightweight Text Similarity
```

The environment determines which implementation is used:

```text
ENVIRONMENT=development
        ↓
all-MiniLM-L6-v2

ENVIRONMENT=production
        ↓
TF-IDF
```

This allows ResumeIQ to remain deployed on resource-constrained infrastructure while preserving the original ML-based architecture for local development.

---

## 💡 Personalized Recommendations

ResumeIQ doesn't stop at showing missing skills.

It generates improvement recommendations based on the detected skill gaps.

Recommendations can include:

* Missing skill
* Skill category
* Priority
* Reason for recommendation
* Suggested action
* Potential resume impact

For example:

```text
Docker
Category: DevOps
Priority: High

Why ResumeIQ flagged this:
Docker appears to be relevant to the target role but
was not detected in the resume.

Suggested Action:
Dockerize an existing project and document how to
build and run it.

Resume Impact:
High
```

This turns the system from a simple resume checker into a basic **career improvement assistant**.

---

## 🎨 User Interface

ResumeIQ was designed to feel more like a modern AI product than a traditional form-based resume analyzer.

The interface includes:

* Dark AI-inspired interface
* Animated background
* Modern dashboard-style cards
* Smooth transitions
* Animated score visualizations
* Interactive skill cards
* Resume upload interface
* Job description analysis
* Match score visualization
* Skill gap visualization
* Recommendation cards
* Progress indicators
* Responsive layouts
* Hover interactions
* AI-style status indicators

The application was developed iteratively, with the initial functional interface later redesigned into the current visual experience.

---

## 🏗️ System Architecture

```text
                         ┌──────────────────┐
                         │       User       │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │     React Frontend      │
                    │                         │
                    │ Vite + Tailwind CSS     │
                    │ Framer Motion            │
                    │ Axios                    │
                    └────────────┬────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     FastAPI Backend     │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
     ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
     │    Resume    │    │    Resume    │    │     Job      │
     │   Service    │    │   Analysis   │    │   Matching   │
     └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
            │                   │                   │
            ▼                   ▼                   ▼
       ┌─────────┐       ┌─────────────┐      ┌─────────────┐
       │ PyMuPDF │       │ Skill       │      │ Hybrid      │
       │         │       │ Extraction  │      │ Matcher     │
       └─────────┘       └─────────────┘      └──────┬──────┘
                                                     │
                                      ┌──────────────┼──────────────┐
                                      │                             │
                                      ▼                             ▼
                               Skill Matching              Text Similarity
                                      │                             │
                                      └──────────────┬──────────────┘
                                                     ▼
                                            Match Score
                                                     │
                                                     ▼
                                            Recommendations
```

---

## 🔄 Complete Workflow

```text
                    PDF Resume
                        │
                        ▼
                ┌───────────────┐
                │ PDF Extraction│
                └───────┬───────┘
                        │
                        ▼
                  Resume Text
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      Sections       Skills        Content
          │             │             │
          └─────────────┼─────────────┘
                        ▼
              Resume Quality Score
                        │
                        ▼
                Resume Intelligence
                        │
                        │
                + Job Description
                        │
                        ▼
                ┌───────────────┐
                │ Job Skill Match│
                └───────┬───────┘
                        │
                        +
                        │
                ┌───────▼────────┐
                │ Text Similarity│
                └───────┬────────┘
                        │
                        ▼
                 Hybrid Match Score
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
       Matched Skills        Missing Skills
                                     │
                                     ▼
                             Recommendations
```

---

# 🛠️ Technology Stack

## Frontend

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| React         | Frontend application          |
| Vite          | Development and build tooling |
| Tailwind CSS  | Styling                       |
| Framer Motion | Animations and transitions    |
| Lucide React  | UI icons                      |
| Axios         | API communication             |

---

## Backend

| Technology | Purpose               |
| ---------- | --------------------- |
| Python     | Core backend language |
| FastAPI    | REST API framework    |
| Uvicorn    | ASGI server           |
| Pydantic   | Data validation       |
| SQLAlchemy | Database ORM          |

---

## AI / ML / NLP

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| Sentence Transformers | Semantic text embeddings     |
| all-MiniLM-L6-v2      | Local semantic model         |
| scikit-learn          | TF-IDF and cosine similarity |
| NumPy                 | Numerical processing         |
| Pandas                | Data processing              |

---

## Resume Processing

| Technology | Purpose             |
| ---------- | ------------------- |
| PyMuPDF    | PDF text extraction |

---

## Database

| Technology | Purpose                    |
| ---------- | -------------------------- |
| SQLite     | Local application database |
| SQLAlchemy | Database abstraction       |

---

## Development & Deployment

| Technology                 | Purpose                 |
| -------------------------- | ----------------------- |
| Git                        | Version control         |
| GitHub                     | Source code hosting     |
| Ubuntu/Linux               | Development environment |
| Python Virtual Environment | Dependency isolation    |
| Render                     | Cloud deployment        |

---

# 📁 Project Structure

```text
ResumeIQ/
│
├── backend/
│   └── app/
│       │
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
│       │
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
├── .gitignore
├── resumeiq.db
└── README.md
```

---

# ⚙️ Local Installation

## 1. Clone the Repository

```bash
git clone https://github.com/prathambr1631/ResumeIQ.git
cd ResumeIQ
```

---

## 2. Create a Python Virtual Environment

ResumeIQ is developed using Python 3.12.

```bash
python3.12 -m venv .venv
```

Activate the environment:

### Linux / macOS

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

---

## 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# ▶️ Running Locally

ResumeIQ requires the frontend and backend to run simultaneously during local development.

## Start the Backend

Open Terminal 1:

```bash
cd ResumeIQ
source .venv/bin/activate

uvicorn backend.app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Start the Frontend

Open Terminal 2:

```bash
cd ResumeIQ/frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

## Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy",
  "service": "ResumeIQ API",
  "environment": "production"
}
```

---

## Resume Extraction

```http
POST /api/resumes/extract
```

Accepts a PDF resume and extracts its text for analysis.

---

## Job Matching

```http
POST /api/jobs/match
```

Compares the extracted resume information against a supplied job description.

---

## API Documentation

FastAPI automatically provides interactive API documentation:

```text
/docs
```

---

# ☁️ Deployment

ResumeIQ is deployed using Render.

```text
                 Production
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   React + Vite            FastAPI
   Static Site             Web Service
          │                     │
          └──────────┬──────────┘
                     │
                   REST API
```

### Production Environment

```text
Frontend
React + Vite
        ↓
Render Static Site

Backend
FastAPI
        ↓
Render Web Service
```

The frontend communicates with the deployed FastAPI backend through the configured production API URL.

CORS is configured on the backend to allow communication with the deployed frontend.

---

# 🔐 Environment Variables

## Frontend

The frontend uses:

```text
VITE_API_URL
```

Example:

```env
VITE_API_URL=https://resumeiq-api-python.onrender.com
```

For local development, the application can fall back to:

```text
http://127.0.0.1:8000
```

---

## Backend

Important configuration values include:

```env
ENVIRONMENT
ALLOWED_ORIGINS
DATABASE_URL
```

Production uses:

```env
ENVIRONMENT=production
```

---

# 🧪 Testing & Verification

ResumeIQ was tested incrementally throughout development.

### Backend

Verified:

* FastAPI startup
* Health endpoint
* API documentation
* Resume processing
* PDF extraction
* Skill detection
* Resume scoring
* Job matching
* Recommendation generation
* Production matcher

### Semantic Matching

Local development:

```text
all-MiniLM-L6-v2
```

Production:

```text
TF-IDF + Cosine Similarity
```

### Frontend

Production build verified using:

```bash
npm run build
```

### End-to-End Testing

The deployed application was tested through the complete workflow:

```text
Live Frontend
      ↓
Live Backend
      ↓
Resume Upload
      ↓
PDF Extraction
      ↓
Skill Detection
      ↓
Resume Analysis
      ↓
Resume Score
      ↓
Job Description
      ↓
Job Matching
      ↓
Missing Skills
      ↓
Recommendations
```

---

# 🧠 Development Journey

ResumeIQ was developed iteratively rather than being created as a single finished application.

## Phase 1 — Backend Foundation

* FastAPI application architecture
* API routing
* Configuration
* Database setup
* Resume processing foundation

## Phase 2 — Resume Intelligence

* PDF extraction
* Resume section detection
* Skill database
* Skill extraction
* Resume quality analysis

## Phase 3 — Job Matching

* Job skill matching
* Missing skill detection
* Semantic similarity
* Hybrid matching
* Recommendation engine

## Phase 4 — Frontend

* React/Vite application
* Resume upload interface
* API integration
* Resume analysis components
* Job matching interface

## Phase 5 — UI/UX

The initial functional UI was redesigned to provide:

* Better visual hierarchy
* Modern dark interface
* Animated background
* Interactive score visualization
* Interactive skill cards
* Smooth transitions
* Improved responsive behavior

## Phase 6 — Deployment

* GitHub repository setup
* Production configuration
* Render deployment
* CORS configuration
* Free-tier memory optimization
* Production frontend
* End-to-end live testing

---

# 🤖 AI-Assisted Development

An LLM was used as a development assistant throughout the project.

Its role included assistance with:

* Understanding technical concepts
* Architecture discussions
* Debugging
* Troubleshooting
* Code suggestions
* Refactoring ideas
* UI/UX ideas
* Deployment troubleshooting
* Git/GitHub guidance
* Documentation
* Explaining implementation decisions

The application was still developed iteratively through the process of:

```text
Implement
   ↓
Run
   ↓
Test
   ↓
Debug
   ↓
Modify
   ↓
Repeat
```

AI assistance was therefore used as a development and learning tool rather than treating generated code as an automatically completed project.

---

# ⚠️ Current Limitations

ResumeIQ is currently a student/developer project and has several limitations.

## Semantic Matching

The production deployment uses TF-IDF instead of the Sentence Transformer model because of free-tier memory constraints.

Therefore:

```text
Local Semantic Matching
        ≠
Production Text Similarity
```

The local environment provides the more advanced embedding-based implementation.

---

## Skill Detection

Skill detection currently relies on the predefined skill database.

Therefore, a technical skill that is not present in:

```text
backend/app/data/skills.json
```

may not be detected automatically.

---

## PDF Processing

The current implementation primarily works with text-based PDF resumes.

Scanned or image-only resumes may require OCR support.

---

## Database

The current application uses SQLite.

For a production-scale application, a managed relational database such as PostgreSQL would be more appropriate.

---

# 🚧 Future Improvements

Potential future improvements include:

* OCR support for scanned resumes
* Larger skill database
* Advanced NLP-based skill extraction
* Improved semantic ranking
* More advanced resume recommendations
* ATS compatibility analysis
* Resume keyword optimization
* Automated job recommendation
* User authentication
* User profiles
* Resume version management
* Resume history
* PostgreSQL deployment
* Cloud-based ML inference
* LinkedIn integration
* Personalized career roadmap
* Advanced job ranking
* Learning resource recommendations

---

# 🎓 What I Learned

Building ResumeIQ provided hands-on experience with:

* Python backend development
* FastAPI REST APIs
* React
* Vite
* Tailwind CSS
* Framer Motion
* PDF processing
* NLP concepts
* Text similarity
* Machine learning workflows
* Sentence Transformers
* TF-IDF
* Cosine similarity
* SQLAlchemy
* SQLite
* Environment variables
* CORS
* Git/GitHub
* Linux development
* Cloud deployment
* Free-tier resource optimization
* Debugging production applications

One of the most valuable lessons from this project was understanding that an ML solution that works locally may need architectural changes when deployed under strict resource constraints.

The production TF-IDF optimization is an example of adapting an ML architecture to real-world infrastructure limitations.

---

# 🔮 Future Vision

ResumeIQ can eventually evolve from a resume analyzer into a broader AI-powered career assistant.

The long-term concept is:

```text
                    Resume
                       │
                       ▼
                 Skill Profile
                       │
                       ▼
                Career Profile
                       │
                       ▼
                 Job Matching
                       │
                       ▼
                  Skill Gaps
                       │
                       ▼
             Learning Recommendations
                       │
                       ▼
                Career Roadmap
```

The goal would be to help users move from:

> "Is my resume good?"

to:

> "What should I learn and improve to become a stronger candidate for the jobs I want?"

---

# 📌 Project Highlights

```text
✓ Full-stack AI/ML application
✓ React + FastAPI architecture
✓ PDF resume processing
✓ Automated skill extraction
✓ Resume quality scoring
✓ Resume structure analysis
✓ Job description matching
✓ Hybrid skill + text matching
✓ Semantic matching architecture
✓ TF-IDF production optimization
✓ Personalized skill-gap recommendations
✓ SQLite database integration
✓ REST API
✓ Responsive interactive UI
✓ Production deployment
✓ Free-tier ML optimization
```

---

# 👨‍💻 Author

**Pratham B R**

BTech AI & ML Student

GitHub: `github.com/prathambr1631`

---

# 📄 License

This project is intended primarily as a learning and portfolio project.

If you use or modify the project, please provide appropriate attribution to the original repository.



### ResumeIQ

**Understand your resume.
Understand your opportunities.**
