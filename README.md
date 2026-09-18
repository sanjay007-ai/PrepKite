# ✈️ PrepKite

### Interview Preparation & Interview Intelligence Platform

PrepKite is a modern interview-preparation platform designed to help candidates prepare for **roles, companies, skills, projects, technical questions, behavioral interviews, practical assessments, and mock interviews** in one connected workspace.

The platform is designed around a personalized preparation journey instead of a simple collection of interview questions.

> **Prepare smarter. Practice consistently. Understand your progress.**

---

## 🌐 Live Website

**Production:** https://prepkite.vercel.app

## 💻 Source Code

**GitHub:** https://github.com/sanjay007-ai/PrepKite

---

## 🎯 What is PrepKite?

Preparing for an interview usually requires candidates to use multiple resources:

- Job descriptions
- Company research
- Interview-question websites
- YouTube/tutorials
- Resume/project preparation
- Technical practice
- Mock interviews
- Progress tracking

PrepKite brings these preparation activities into one structured experience.

The candidate can build a profile, select a company and role, identify relevant skills and projects, practice questions, complete challenges, run mock interviews, and review progress.

---

## 🧭 Core Preparation Flow

```text
Profile
   ↓
Company + Role
   ↓
Skills + Projects
   ↓
Question Engine
   ↓
Daily Preparation
   ↓
Practice
   ↓
Mock Interview
   ↓
Strengths / Improvement Areas
   ↓
Weekly Progress
   ↓
Readiness
   ↓
Dashboard
```

---

## ✨ Key Features

### 👤 Personalized Candidate Profile

Create a preparation profile containing information such as:

- Name
- Email
- Target role
- Experience level
- Skills
- Projects
- Career information
- Preparation preferences

The profile is used throughout the application to personalize the preparation experience.

---

### 🏢 Company Preparation

Choose a company and prepare around publicly available interview themes and commonly reported areas.

PrepKite can organize preparation around:

- Company-related topics
- Role expectations
- Technical skills
- Practical skills
- Behavioral questions
- HR questions
- Project questions
- Resume-related discussion

> PrepKite does not claim access to confidential, leaked, guaranteed, or secret company interview questions. Company preparation should be understood as research-based and practice-oriented.

---

### 💼 Role-Based Preparation

Preparation can be aligned with the selected career role.

Examples include:

- Data Analyst
- Business Analyst
- Software Developer
- Frontend Developer
- Backend Developer
- Data Scientist
- QA / Testing
- Product roles
- Other technical and non-technical roles

---

### 🧠 Interview Question Categories

PrepKite is designed to cover different types of interview questions rather than only technical questions.

#### Company Questions
Questions related to the selected organization and its publicly known context.

#### Role Questions
Questions connected to the responsibilities and expectations of the selected role.

#### Knowledge Questions
Conceptual and fundamentals-based questions.

#### Practical Questions
Questions that test how a candidate applies knowledge to realistic situations.

#### Technical Questions
Skill-specific interview preparation such as:

- SQL
- Excel
- Python
- HTML
- CSS
- JavaScript
- Data Analytics
- Programming
- Other role-specific skills

#### Project Questions
Preparation around:

- Project explanation
- Architecture/workflow
- Technologies used
- Challenges
- Decisions
- Results
- Improvements
- Follow-up questions

#### Resume Questions
Questions based on the candidate's experience, skills, projects, and career information.

#### Behavioral / HR Questions
Examples include:

- Tell me about yourself
- Strengths
- Areas for improvement
- Teamwork
- Conflict handling
- Leadership
- Problem solving
- Career goals
- Situational questions

---

## 📅 Daily Preparation

PrepKite includes a preparation workflow designed to encourage consistent practice.

The experience can track activities such as:

- Daily preparation
- Practice sessions
- Questions completed
- Challenges
- Mock interviews
- Progress
- Streak/attendance-style activity

---

## 🎯 Practice Workspace

The Practice area provides a focused environment for working through interview questions.

The goal is to move from:

```text
Read
 ↓
Understand
 ↓
Answer
 ↓
Practice
 ↓
Review
 ↓
Improve
```

---

## 🎤 Mock Interviews

PrepKite includes a dedicated Mock Interview experience for interview-style practice.

A mock interview can be used to simulate interview preparation across areas such as:

- Technical
- Role-specific
- Behavioral
- HR
- Company-focused
- Project-focused

The application records mock-interview activity locally in the current frontend architecture.

---

## 🧩 Challenges

Challenges provide additional practice beyond standard question lists.

They are intended to help candidates apply their knowledge through focused preparation activities.

---

## 📈 Progress & Improvement

PrepKite provides a dedicated Progress experience for reviewing preparation activity.

The broader platform is designed around:

- Practice consistency
- Completed preparation
- Mock interview activity
- Challenge activity
- Strength areas
- Improvement areas
- Weekly progress
- Readiness signals

---

## 📊 Dashboard

The Dashboard acts as the candidate's preparation overview.

It connects information from the preparation workflow and provides a central place to review progress and continue preparation.

---

## 👤 Profile Context

The long-term goal is to let candidates maintain their preparation context in one place.

Useful candidate information can include:

```text
Candidate
   │
   ├── Target Role
   ├── Company
   ├── Skills
   ├── Projects
   ├── Resume Context
   ├── Experience
   └── Preparation Progress
```

This context can then support:

- Dashboard
- Prepare
- Practice
- Questions
- Mock Interview
- Progress
- Challenges

---

## 🗂️ Main Application Pages

Current application structure includes:

```text
Landing
   ↓
Authentication
   ↓
Onboarding
   ↓
Dashboard
   ├── Prepare
   ├── Companies
   ├── Questions
   ├── Practice
   ├── Mock Interview
   ├── Challenges
   ├── Progress
   ├── Profile
   └── Help
```

---

## 🎨 User Experience

PrepKite is designed with a modern interview-intelligence visual direction.

The application focuses on:

- Clean navigation
- Dark professional interface
- Clear information hierarchy
- Responsive layouts
- Focused preparation workflows
- Desktop and mobile usability
- Connected preparation sections
- Reduced repetition between pages

---

## 📱 Responsive Design

PrepKite is designed to work across:

- 💻 Desktop
- 🖥️ Laptop
- 📱 Mobile
- 🌐 Modern web browsers

The interface is designed so candidates can continue preparation from different screen sizes.

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Lucide React
- Tailwind CSS
- Responsive UI architecture

### Application Architecture

- React component architecture
- Context-based application state
- Browser storage for the current client-side persistence layer
- Modular page structure
- Reusable UI components
- Localized application data and interview content

### Deployment

- GitHub
- Vercel
- Vite production build
- Automatic deployment from GitHub

---

## 📁 Project Structure

```text
PrepKite/
│
├── src/
│   ├── components/
│   │   ├── AppErrorBoundary.tsx
│   │   ├── AppShell.tsx
│   │   └── ui.tsx
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── data/
│   │   └── catalog.ts
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── coaching.ts
│   │   ├── interviewData.ts
│   │   ├── platform.ts
│   │   ├── storage.ts
│   │   ├── usePageMeta.ts
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   ├── AuthPage.tsx
│   │   ├── ChallengesPage.tsx
│   │   ├── CompaniesPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── HelpPage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── MockInterviewPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── OnboardingPage.tsx
│   │   ├── PracticePage.tsx
│   │   ├── PreparePage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ProgressPage.tsx
│   │   └── QuestionsPage.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── styles/
│       └── main.css
│
├── public/
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Run PrepKite Locally

### 1. Clone the repository

```bash
git clone https://github.com/sanjay007-ai/PrepKite.git
```

### 2. Open the project

```bash
cd PrepKite
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, normally similar to:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

Create a production build with:

```bash
npm run build
```

The project currently uses the following build command:

```json
"build": "node node_modules/vite/bin/vite.js build"
```

This build setup avoids the executable-permission issue encountered during Vercel deployment.

---

## 🔍 Type Checking

Run TypeScript validation with:

```bash
npm run typecheck
```

The project also provides:

```bash
npm run check
```

which runs type checking followed by the production build.

---

## 🔄 GitHub → Vercel Deployment

PrepKite is connected to Vercel through GitHub.

```text
Local Project
     ↓
git add .
     ↓
git commit
     ↓
git push
     ↓
GitHub
     ↓
Vercel Automatic Deployment
     ↓
Production Website
```

After the GitHub repository is connected to Vercel, pushes to the configured branch can trigger a new deployment automatically.

---

## 🌐 Production Deployment

**Live application:**

https://prepkite.vercel.app

**GitHub repository:**

https://github.com/sanjay007-ai/PrepKite

---

## 💾 Current Data Architecture

The current frontend version uses browser-side storage for user/profile/activity persistence.

Examples include:

```text
localStorage
   │
   ├── User
   ├── Profile
   ├── Activity
   └── Mock Interview Data
```

This means the current application is suitable for a client-side/demo deployment, but browser-local storage is **not a global multi-user database**.

---

## 🔐 Authentication

The current application includes an authentication experience and stores the current client-side user state locally.

For a production multi-user platform, authentication should eventually be moved to a secure backend authentication provider.

---

## 👨‍💼 Future Admin & Platform Analytics

A future production backend can provide an owner/admin workspace with real database-backed metrics such as:

```text
Total Users
New Users
Active Users
Practice Sessions
Mock Interviews
Completed Profiles
Popular Roles
Popular Companies
Daily Activity
Weekly Activity
```

These metrics should come from real application data rather than hard-coded numbers.

---

## 🗄️ Planned Backend / Database Architecture

The next production architecture can introduce:

```text
PrepKite Frontend
        ↓
Authentication
        ↓
Backend / API
        ↓
Database
        ↓
User Profiles
        ↓
Preparation Activity
        ↓
Practice
        ↓
Mock Interviews
        ↓
Progress
        ↓
Admin Analytics
```

Potential production capabilities include:

- Secure authentication
- Cloud user profiles
- Persistent preparation history
- Cross-device synchronization
- Saved interview sessions
- Global usage analytics
- Admin dashboard
- User management
- Cloud storage
- More advanced personalization

---

## 🧠 Interview Intelligence Philosophy

PrepKite is designed around the idea that interview preparation should be personalized.

Instead of:

```text
Question List
Question List
Question List
```

the intended experience is:

```text
Who are you?
      ↓
What role do you want?
      ↓
Which company?
      ↓
What skills do you have?
      ↓
What projects have you built?
      ↓
What should you prepare?
      ↓
What should you practice today?
      ↓
How are you improving?
```

---

## 🏢 Company Research Approach

Company-specific preparation should be based on publicly available information and commonly reported interview themes.

Sources and signals may include:

- Public company information
- Job descriptions
- Public interview experiences
- Role requirements
- Common technical topics
- Publicly discussed hiring patterns

PrepKite should clearly distinguish between:

**Known/public information**

and

**Practice-oriented generated questions**

It should not present generated or commonly reported questions as guaranteed questions for a particular company's interview.

---

## 🎓 Who is PrepKite For?

PrepKite is intended for candidates preparing for:

- Entry-level interviews
- Internship interviews
- Graduate roles
- Experienced roles
- Technical interviews
- Analytics interviews
- Software interviews
- Business roles
- HR interviews
- Company-specific preparation
- Career transitions

---

## 🛣️ Roadmap

### Phase 1 — Core Platform

- [x] Modern landing page
- [x] Authentication experience
- [x] Onboarding
- [x] Candidate profile
- [x] Dashboard
- [x] Company preparation
- [x] Questions
- [x] Practice
- [x] Mock Interview
- [x] Challenges
- [x] Progress
- [x] Responsive interface
- [x] Vercel deployment
- [x] GitHub repository

### Phase 2 — Production Data Layer

- [ ] Secure cloud authentication
- [ ] Production database
- [ ] Persistent cloud profiles
- [ ] Cross-device synchronization
- [ ] Cloud preparation history
- [ ] Persistent mock-interview history

### Phase 3 — Platform Intelligence

- [ ] More personalized question generation
- [ ] Stronger role/company preparation
- [ ] Resume-aware preparation
- [ ] More advanced interview evaluation
- [ ] Personalized weekly plans
- [ ] Improved readiness analytics
- [ ] Adaptive practice

### Phase 4 — Platform Administration

- [ ] Owner/admin authentication
- [ ] Real user-count analytics
- [ ] Activity analytics
- [ ] Role analytics
- [ ] Company analytics
- [ ] User management
- [ ] Platform monitoring

---

## 🔒 Security Principles

For future production deployment:

- Never commit passwords or API keys.
- Never expose private secrets in frontend code.
- Use environment variables for secrets.
- Use secure authentication.
- Validate user input on the server.
- Protect admin endpoints.
- Use database access controls.
- Use HTTPS in production.
- Keep private user information protected.

---

## 🤝 Contributing

Contributions, ideas, bug reports, and improvements are welcome.

Typical workflow:

```bash
git clone https://github.com/sanjay007-ai/PrepKite.git
cd PrepKite
npm install
npm run dev
```

Create a branch for your changes, test the application, and submit a pull request.

---

## 📄 License

This project does not currently declare a separate open-source license.

If the project is intended to be distributed as open source, a license should be added explicitly to the repository.

---

## 👨‍💻 Creator

**PrepKite**

Made by **Sanjay**

Built with the goal of making interview preparation more structured, personalized, practical, and measurable.

---

## ⭐ Project

If PrepKite is useful to you, consider starring the repository on GitHub.

**Live:** https://prepkite.vercel.app

**GitHub:** https://github.com/sanjay007-ai/PrepKite
