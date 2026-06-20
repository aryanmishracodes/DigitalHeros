# BulletCraft - AI Resume Bullet Generator

BulletCraft is a premium, client-side web application designed to help developers and students instantly generate high-impact, ATS-optimized project descriptions, resume bullet points, professional summaries, LinkedIn launch posts, and keywords.

This project was built for a hiring assessment and is optimized for zero-cost, local execution using custom algorithmic template compilation in the browser.

---

## 🚀 Live Demo & Deployment
- **Built for Digital Heroes**: [digitalheroesco.com](https://digitalheroesco.com)
- **Deployment Platform**: Vercel Hobby Plan (Serverless, Static Edge Hosting)

---

## ✨ Features
1. **Resume Bullet Point Compiler**: Crafts professional bullet points leveraging action verbs, specific technical stack details, and quantifiable business outcomes/impacts.
2. **Cohesive Project Summary**: Generates a professional 2-3 sentence overview of the project scope.
3. **LinkedIn Project Post Creator**: Formulates an engaging, copy-ready post with bullet points and auto-extracted hashtags.
4. **ATS Keyword Optimizer**: Synthesizes and expands your technology inputs into highly searchable skill keywords.
5. **Interactive Controls**:
   - **Demo Data Loader**: Pre-fills fields with diverse real-world developer projects.
   - **Clipboard Copying**: Integrated copy buttons for each generated section.
   - **Text Exporter**: Downloads full generated report as a structured `.txt` file.
   - **Auto-Growing Textareas**: Smart height adjustment preventing layout shifts.
   - **Dual Theme Support**: Persisted dark and light theme options utilizing Tailwind CSS v4 custom variants.

---

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Module Verification)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first engine)
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVG icons

---

## 📂 Project Structure
```text
src/
├── assets/          # Static elements and logo SVGs
├── components/      # Modular, reusable presentation components
│   ├── Button.tsx     # Custom Button with presets & spinner loaders
│   ├── Card.tsx       # Glassmorphism container cards
│   ├── TextArea.tsx   # Textarea wrapper with character counting and auto-resize
│   ├── ThemeToggle.tsx# Sun/Moon state switcher
│   └── Toast.tsx      # Copy confirmation popup
├── constants/       # Generator datasets, templates, and example data
│   └── templates.ts
├── hooks/           # Domain-agnostic React hooks
│   ├── useLocalStorage.ts
│   └── useTextAreaResize.ts
├── pages/           # High-level layouts
│   └── GeneratorPage.tsx
├── utils/           # Business logic and parsing
│   └── generator.ts
├── App.tsx          # Page coordinator
├── index.css        # Tailwind v4 configuration, theme variables & animations
└── main.tsx         # Render mount point
```

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "Digital Heros"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

### Building for Production
1. Compile and bundle assets:
   ```bash
   npm run build
   ```
2. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🚀 Deploying to Vercel

Since this is a client-side Vite project, deploying to Vercel is free and requires zero environment variables or server logic.

### Method 1: Vercel Git Integration (Recommended)
1. Push this codebase to a public GitHub repository.
2. Go to the [Vercel Dashboard](https://vercel.com).
3. Click **Add New** > **Project** and import your GitHub repository.
4. Vercel will automatically detect the Vite setup:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Method 2: Vercel CLI
If you have Vercel CLI installed:
```bash
npm install -g vercel
vercel
```
Follow the CLI prompts to deploy directly from your local terminal.

---

## 🎯 Compliance Checklist (Hiring Requirements Met)

- [x] **Fully Client-Side**: No environment variables or API keys needed. Works free, locally, in the browser.
- [x] **"Built for Digital Heroes" Button**: Label matches exactly, links to `https://digitalheroesco.com`, and opens in a new tab.
- [x] **Developer Profile Pinned**: Visible on all screen sizes (Aryan Mishra & aryanmishracodes@gmail.com).
- [x] **Production-Grade UI/UX**: Custom glassmorphism, responsive grids, transitions, and system-wide dark/light states.
- [x] **Actionable Text Output**: Genuinely processes stack, features, and impacts into realistic copy.
- [x] **Code Quality**: Structured clean architecture, strict TypeScript typing, and type-safe verbatim module imports.

---

## 👤 Developer Profile
- **Aryan Mishra**
- **Email**: [aryanmishracodes@gmail.com](mailto:aryanmishracodes@gmail.com)
- **GitHub**: [github.com/aryanmishracodes](https://github.com/aryanmishracodes)
