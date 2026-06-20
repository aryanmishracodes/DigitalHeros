import { useState, useRef } from 'react';
import {
  Sparkles,
  Copy,
  Download,
  Trash2,
  BookOpen,
  ArrowRight,
  Mail,
  User,
  Heart,
  ExternalLink,
  Code,
  Sliders,
  FileText,
  Award,
  List,
  Key,
  Check
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TextArea } from '../components/TextArea';
import { Toast } from '../components/Toast';
import { ThemeToggle } from '../components/ThemeToggle';
import { generateResumeContent } from '../utils/generator';
import type { GeneratedOutputs } from '../utils/generator';
import { EXAMPLE_PROJECTS, TONES } from '../constants/templates';
import type { ProjectInput, GeneratorTone } from '../constants/templates';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function GeneratorPage() {
  const [inputs, setInputs] = useState<ProjectInput>({
    name: '',
    techStack: '',
    features: '',
    impact: ''
  });

  const [tone, setTone] = useState<GeneratorTone>('technical');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [outputs, setOutputs] = useState<GeneratedOutputs | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'bullets' | 'summary' | 'linkedin' | 'keywords'>('bullets');

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof ProjectInput, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleClearField = (field: keyof ProjectInput) => {
    handleInputChange(field, '');
    setToastMessage(`Cleared ${field.replace(/([A-Z])/g, ' $1')}`);
    setIsToastOpen(true);
  };

  const validateForm = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!inputs.name.trim()) nextErrors.name = 'Project Name is required.';
    if (!inputs.techStack.trim()) nextErrors.techStack = 'Tech Stack is required.';
    if (!inputs.features.trim()) nextErrors.features = 'Project Features are required.';
    if (!inputs.impact.trim()) nextErrors.impact = 'Achievements / Impact is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setToastMessage('Please fill in all required fields.');
      setIsToastOpen(true);
      return;
    }

    setIsGenerating(true);

    // Simulate premium AI generation delay for professional experience
    setTimeout(() => {
      const results = generateResumeContent(inputs, tone);
      setOutputs(results);
      setIsGenerating(false);
      setToastMessage('Content Generated Successfully!');
      setIsToastOpen(true);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 750);
  };

  const handleLoadExample = () => {
    const example = EXAMPLE_PROJECTS[exampleIndex];
    setInputs(example);
    setErrors({});
    setExampleIndex(prev => (prev + 1) % EXAMPLE_PROJECTS.length);
    setToastMessage(`Loaded Example: ${example.name}`);
    setIsToastOpen(true);
  };

  const handleClearForm = () => {
    setInputs({
      name: '',
      techStack: '',
      features: '',
      impact: ''
    });
    setErrors({});
    setOutputs(null);
    setToastMessage('Form cleared.');
    setIsToastOpen(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setToastMessage(`Copied ${label} Successfully`);
        setIsToastOpen(true);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        setToastMessage('Failed to copy text.');
        setIsToastOpen(true);
      });
  };

  const handleDownloadTxt = () => {
    if (!outputs) return;

    const fileContent = `==================================================
AI RESUME BULLET GENERATOR - REPORT
Project: ${inputs.name}
Tone of Voice: ${TONES[tone]}
Tech Stack: ${inputs.techStack}
==================================================

[1] RESUME BULLET POINTS
${outputs.bullets.map(b => `• ${b}`).join('\n')}

[2] PROJECT SUMMARY
${outputs.summary}

[3] LINKEDIN PROJECT DESCRIPTION
${outputs.linkedin}

[4] ATS KEYWORDS
${outputs.keywords.join(', ')}

==================================================
Generated on BulletCraft AI (Built for Digital Heroes)
Developer: Aryan Mishra (aryanmishracodes@gmail.com)
==================================================`;

    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${inputs.name.toLowerCase().replace(/\s+/g, '_')}_resume_bullets.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setToastMessage('Downloaded TXT report successfully.');
    setIsToastOpen(true);
  };

  const tabs = [
    { id: 'bullets', label: 'Resume Bullets', icon: <List className="w-3.5 h-3.5" /> },
    { id: 'summary', label: 'Summary', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'linkedin', label: 'LinkedIn Post', icon: <LinkedInIcon className="w-3.5 h-3.5" /> },
    { id: 'keywords', label: 'ATS Keywords', icon: <Key className="w-3.5 h-3.5" /> }
  ] as const;

  return (
    <div className="min-h-screen bg-grid-pattern text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans pb-32 relative overflow-hidden">
      
      {/* Dynamic Background Blurring Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

      {/* Floating Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-tight bg-gradient-to-r from-brand-600 to-fuchsia-600 dark:from-brand-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                BulletCraft
              </span>
              <span className="text-[10px] block font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">
                AI Resume Core
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-600 dark:text-brand-400 border border-brand-500/20 dark:border-brand-500/30 bg-brand-500/5 hover:bg-brand-500/10 transition-all duration-300 hover:scale-102"
            >
              Built for Digital Heroes
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-none">
          AI Resume{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-fuchsia-600 dark:from-brand-400 dark:via-indigo-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            Bullet Generator
          </span>
        </h1>
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Generate professional ATS-optimized project descriptions, resume bullets, and LinkedIn-ready summaries in seconds. Fully local, zero API configuration.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button
            variant="glow"
            onClick={() => document.getElementById('generator-form')?.scrollIntoView({ behavior: 'smooth' })}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Generate Content
          </Button>
          <Button variant="secondary" onClick={handleLoadExample} leftIcon={<BookOpen className="w-4 h-4" />}>
            Try an Example
          </Button>
        </div>
      </section>

      {/* Main App Content Area */}
      <main id="generator-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        
        {/* Left Side: Input Form */}
        <section className="lg:col-span-5">
          <Card className="p-6 sm:p-8" variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-brand-500" />
                Project Details
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLoadExample}
                  className="p-1.5 rounded-lg text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-500/10 transition-colors"
                  title="Load demo data"
                >
                  Demo Data
                </button>
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="p-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1"
                  title="Clear form"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Form
                </button>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              {/* Tone of Voice Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5 px-1">
                  <Sliders className="w-3.5 h-3.5 text-brand-500" />
                  Tone of Voice
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-200/50 dark:bg-slate-950/40 p-1 rounded-2xl border border-gray-200/60 dark:border-white/5">
                  {(Object.keys(TONES) as GeneratorTone[]).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`py-2 text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                        tone === t
                          ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-md border border-gray-200/40 dark:border-white/5'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                    >
                      {TONES[t].split('/')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <TextArea
                label="Project Name"
                value={inputs.name}
                onChange={e => handleInputChange('name', e.target.value)}
                onClear={() => handleClearField('name')}
                placeholder="e.g. Customer Segmentation System"
                maxLength={80}
                error={errors.name}
                icon={<FileText className="w-3.5 h-3.5" />}
              />

              <TextArea
                label="Tech Stack"
                value={inputs.techStack}
                onChange={e => handleInputChange('techStack', e.target.value)}
                onClear={() => handleClearField('techStack')}
                placeholder="e.g. Python, Flask, React, KMeans, Chart.js"
                maxLength={150}
                error={errors.techStack}
                helperText="Comma separated list of libraries, frameworks, or databases."
                icon={<Code className="w-3.5 h-3.5" />}
              />

              <TextArea
                label="Project Features"
                value={inputs.features}
                onChange={e => handleInputChange('features', e.target.value)}
                onClear={() => handleClearField('features')}
                placeholder="e.g. KMeans clustering algorithms, customer behavior grouping, interactive visualization charts"
                maxLength={400}
                error={errors.features}
                rows={3}
                helperText="Describe 2-4 core features. Separate by commas or newlines."
                icon={<Sparkles className="w-3.5 h-3.5" />}
              />

              <TextArea
                label="Achievements / Impact"
                value={inputs.impact}
                onChange={e => handleInputChange('impact', e.target.value)}
                onClear={() => handleClearField('impact')}
                placeholder="e.g. Improved customer grouping efficiency and increased marketing conversion by 25%"
                maxLength={300}
                error={errors.impact}
                rows={2}
                helperText="What was the business outcome, performance boost, or goal achieved?"
                icon={<Award className="w-3.5 h-3.5" />}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3"
                  isLoading={isGenerating}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Content
                </Button>
              </div>
            </form>
          </Card>
        </section>

        {/* Right Side: Generated Outputs (Tabbed SaaS Dashboard) */}
        <section ref={resultsRef} className="lg:col-span-7 space-y-6">
          {!outputs ? (
            <Card className="p-12 text-center h-full flex flex-col justify-center items-center border-dashed border-2 border-gray-300 dark:border-slate-800 bg-white/30 dark:bg-slate-900/20 shadow-none">
              <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-700 animate-float mb-4" />
              <h3 className="font-display font-semibold text-lg text-gray-500 dark:text-gray-400">
                Ready to generate
              </h3>
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-1 max-w-sm">
                Fill in the project details on the left, select a Tone of Voice, and click "Generate Content" to craft your resume.
              </p>
            </Card>
          ) : (
            <div className="space-y-6 animate-slide-in">
              
              {/* Dashboard Action Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-slate-900/20 backdrop-blur-md p-4 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm">
                <div>
                  <h3 className="font-display font-bold text-sm tracking-tight text-slate-500 dark:text-gray-400 uppercase">
                    Project Deliverables
                  </h3>
                  <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {inputs.name}
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownloadTxt}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                    className="w-full sm:w-auto text-xs"
                  >
                    Export Report (.TXT)
                  </Button>
                </div>
              </div>

              {/* Tab Selector Dashboard Row */}
              <div className="flex gap-1.5 p-1.5 bg-slate-200/50 dark:bg-slate-950/40 rounded-2xl border border-gray-200/60 dark:border-white/5 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-md border border-gray-200/40 dark:border-white/5'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Dashboard Cards */}
              <div className="transition-all duration-300">
                {activeTab === 'bullets' && (
                  <Card className="p-6 relative group" variant="glow">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <List className="w-4 h-4 text-brand-500" />
                        <h4 className="font-display font-bold text-sm tracking-wider uppercase text-brand-600 dark:text-brand-400">
                          Resume Bullet Points ({TONES[tone]})
                        </h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(outputs.bullets.map(b => `• ${b}`).join('\n'), 'Resume Bullets')}
                        className="p-2 rounded-xl text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 transition-all cursor-pointer"
                        title="Copy Resume Bullets"
                        aria-label="Copy Resume Bullets"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <ul className="space-y-4 pl-5 list-disc text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                      {outputs.bullets.map((bullet, idx) => (
                        <li key={idx} className="marker:text-brand-500">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/5 flex justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(outputs.bullets.map(b => `• ${b}`).join('\n'), 'Resume Bullets')}
                        leftIcon={<Copy className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Copy Bullets
                      </Button>
                    </div>
                  </Card>
                )}

                {activeTab === 'summary' && (
                  <Card className="p-6 relative" variant="glass">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-violet-500" />
                        <h4 className="font-display font-bold text-sm tracking-wider uppercase text-violet-600 dark:text-violet-400">
                          Project Summary
                        </h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(outputs.summary, 'Project Summary')}
                        className="p-2 rounded-xl text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-violet-500/5 dark:hover:bg-violet-500/10 transition-all cursor-pointer"
                        title="Copy Summary"
                        aria-label="Copy Summary"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-gray-200/60 dark:border-white/5">
                      {outputs.summary}
                    </p>
                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/5 flex justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(outputs.summary, 'Project Summary')}
                        leftIcon={<Copy className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Copy Summary
                      </Button>
                    </div>
                  </Card>
                )}

                {activeTab === 'linkedin' && (
                  <Card className="p-6 relative" variant="glass">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <LinkedInIcon className="w-4 h-4 text-fuchsia-500" />
                        <h4 className="font-display font-bold text-sm tracking-wider uppercase text-fuchsia-600 dark:text-fuchsia-400">
                          LinkedIn Launch Post
                        </h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(outputs.linkedin, 'LinkedIn Post')}
                        className="p-2 rounded-xl text-gray-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 hover:bg-fuchsia-500/5 dark:hover:bg-fuchsia-500/10 transition-all cursor-pointer"
                        title="Copy LinkedIn Post"
                        aria-label="Copy LinkedIn Post"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-wrap break-words bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-gray-200/60 dark:border-white/5">
                      {outputs.linkedin}
                    </pre>
                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/5 flex justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(outputs.linkedin, 'LinkedIn Post')}
                        leftIcon={<Copy className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Copy Post
                      </Button>
                    </div>
                  </Card>
                )}

                {activeTab === 'keywords' && (
                  <Card className="p-6 relative" variant="glass">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-emerald-500" />
                        <h4 className="font-display font-bold text-sm tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                          ATS Optimization Keywords
                        </h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(outputs.keywords.join(', '), 'Keywords')}
                        className="p-2 rounded-xl text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition-all cursor-pointer"
                        title="Copy Keywords"
                        aria-label="Copy Keywords"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-gray-200/60 dark:border-white/5">
                      {outputs.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 dark:border-emerald-500/10 flex items-center gap-1 animate-slide-in"
                        >
                          <Check className="w-3 h-3 text-emerald-500" />
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/5 flex justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(outputs.keywords.join(', '), 'Keywords')}
                        leftIcon={<Copy className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Copy Keywords
                      </Button>
                    </div>
                  </Card>
                )}
              </div>

            </div>
          )}
        </section>
      </main>

      {/* Sticky Bottom Footer: Always Visible Branding Info */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/60 dark:border-white/5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Mandatory Aryan Mishra branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Aryan Mishra
              </p>
              <a
                href="mailto:aryanmishracodes@gmail.com"
                className="text-[10px] text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors flex items-center gap-1 font-mono"
              >
                <Mail className="w-3 h-3" />
                aryanmishracodes@gmail.com
              </a>
            </div>
          </div>

          {/* Links and center text */}
          <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>using React & Tailwind v4</span>
          </div>

          {/* Mandatory "Built for Digital Heroes" button */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/aryanmishracodes"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all hover:scale-102"
            >
              Built for Digital Heroes
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Toast Confirmation Box */}
      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
