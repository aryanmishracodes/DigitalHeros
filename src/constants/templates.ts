export interface ProjectInput {
  name: string;
  techStack: string;
  features: string;
  impact: string;
}

export const TONES = {
  technical: 'Technical/Developer',
  leadership: 'Executive/Leadership',
  results: 'Results-Oriented'
};

export type GeneratorTone = 'technical' | 'leadership' | 'results';

export const ACTION_VERBS: Record<GeneratorTone, { creation: string[]; improvement: string[]; analysis: string[] }> = {
  technical: {
    creation: [
      'Architected', 'Engineered', 'Programmed', 'Configured', 'Compiled',
      'Synthesized', 'Orchestrated', 'Implemented', 'Built', 'Coded',
      'Authored', 'Refactored', 'Structured', 'Integrated'
    ],
    improvement: [
      'Refactored', 'Optimized', 'Debugged', 'Tuned', 'Accelerated',
      'Automated', 'Normalized', 'Consolidated', 'Standardized', 'Upgraded'
    ],
    analysis: [
      'Parsed', 'Modeled', 'Mapped', 'Traced', 'Diagnosed', 'Validated', 'Analyzed'
    ]
  },
  leadership: {
    creation: [
      'Spearheaded', 'Pioneered', 'Orchestrated', 'Guided', 'Formulated',
      'Designed', 'Launched', 'Delegated', 'Created', 'Founded', 'Executed'
    ],
    improvement: [
      'Revamped', 'Modernized', 'Redesigned', 'Transformed', 'Elevated',
      'Cultivated', 'Strengthened', 'Reorganized', 'Fostered'
    ],
    analysis: [
      'Evaluated', 'Strategized', 'Assessed', 'Identified', 'Facilitated'
    ]
  },
  results: {
    creation: [
      'Developed', 'Established', 'Delivered', 'Deployed', 'Constructed',
      'Executed', 'Integrated', 'Secured', 'Completed', 'Engineered'
    ],
    improvement: [
      'Optimized', 'Streamlined', 'Accelerated', 'Boosted', 'Maximized',
      'Reduced', 'Minimized', 'Expanded', 'Amplified', 'Enhanced'
    ],
    analysis: [
      'Quantified', 'Audited', 'Monitored', 'Measured', 'Proven', 'Extracted'
    ]
  }
};

export const TECH_CATEGORIES: Record<string, string[]> = {
  frontend: ['react', 'vue', 'angular', 'next.js', 'svelte', 'tailwind', 'typescript', 'javascript', 'html', 'css', 'redux', 'graphql', 'bootstrap', 'material-ui', 'three.js'],
  backend: ['node', 'express', 'python', 'flask', 'django', 'fastapi', 'spring boot', 'go', 'golang', 'java', 'ruby', 'rails', 'c#', 'dotnet', 'php', 'laravel'],
  database: ['postgres', 'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'firebase', 'supabase', 'prisma', 'dynamodb', 'oracle', 'cassandra'],
  cloud: ['aws', 'docker', 'kubernetes', 'vercel', 'gcp', 'azure', 'nginx', 'cicd', 'github actions', 'jenkins', 'serverless', 'netlify', 'cloudflare'],
  ai_ml: ['pytorch', 'tensorflow', 'keras', 'scikit-learn', 'pandas', 'numpy', 'kmeans', 'opencv', 'huggingface', 'openai', 'langchain', 'llama', 'bert', 'nlp', 'llm', 'machine learning', 'deep learning']
};

export interface BulletTemplate {
  structure: string;
  requiresImpact: boolean;
}

export const BULLET_TEMPLATES: Record<string, string[]> = {
  feature_first: [
    'Developed {feature} using {tech}, enabling {impact}.',
    'Engineered {feature} using {tech} to achieve {impact}.',
    'Spearheaded the development of {feature} leveraging {tech}, which {impact}.',
    'Implemented {feature} utilizing {tech}, resulting in {impact}.'
  ],
  action_first: [
    '{verb} a {feature} utilizing {tech} to {impact}.',
    '{verb} high-performance {feature} with {tech}, leading to {impact}.',
    '{verb} scalable {feature} powered by {tech}, directly {impact}.',
    '{verb} secure {feature} modules using {tech}, improving {impact}.'
  ],
  system_level: [
    'Architected and deployed {feature} integration via {tech}, {impact}.',
    'Leveraged {tech} to construct a robust {feature} backend, which {impact}.',
    'Integrated {feature} with {tech} APIs, maximizing {impact}.',
    'Streamlined {feature} through custom {tech} pipelines, facilitating {impact}.'
  ]
};

export const SUMMARY_TEMPLATES = [
  '{name} is a modern, high-performance platform engineered with {tech_main} and {tech_sub} to deliver {feature_main} and {feature_sub}, successfully {impact_short}.',
  'Built with {tech_main}, {name} is a professional solution designed for {feature_main}. It integrates {tech_sub} to provide {feature_sub}, optimizing overall operations to {impact_short}.',
  '{name} is an enterprise-grade application powered by {tech_main} and {tech_sub}. The system features robust implementations of {feature_main} and {feature_sub}, resulting in {impact_short}.'
];

export const LINKEDIN_TEMPLATES = [
  `🚀 Excited to share my latest project: *{name}*!

I built this platform to solve challenges related to {feature_main}. Leveraging a modern tech stack consisting of *{tech}*, the application supports {feature_sub} and {impact_short}.

Key Highlights:
🔹 Designed and developed {feature_main} using {tech_main}
🔹 Implemented {feature_secondary} for seamless operation
🔹 Focused on performance, resulting in {impact_short}

Check out the code or let me know what you think! 💻👇

#WebDevelopment #SoftwareEngineering #PortfolioProject #{tag1} #{tag2} #{tag3}`,

  `💡 Project Spotlight: *{name}*

Proud to announce the completion of *{name}*—a developer tool designed to optimize {feature_main}. 

Key technologies used: {tech}

How it works:
🔥 Uses {tech_main} to power the core logic of {feature_main}
🔥 Integrated {tech_sub} to run {feature_secondary}
🔥 Engineered with a focus on usability, which {impact_short}

Full tech stack and documentation are available. Constructive feedback is welcome! 🚀

#{tag1} #{tag2} #{tag3} #Coding #TechInnovation #ReactJS`
];

export const ATS_KEYWORD_MAP: Record<string, string[]> = {
  react: ['Frontend Development', 'Component Design', 'React Hooks', 'Single Page Apps (SPA)'],
  nextjs: ['Server Side Rendering (SSR)', 'Incremental Static Regeneration (ISR)', 'Next.js App Router'],
  tailwindcss: ['Responsive Design', 'Utility-First CSS', 'Tailwind UI', 'Modern Styling'],
  typescript: ['Type Safety', 'Static Typing', 'Object Oriented Programming', 'Strict Null Checking'],
  javascript: ['ES6+ Syntax', 'Asynchronous JS', 'DOM Manipulation'],
  python: ['Python Scripting', 'Algorithm Design', 'Data Processing'],
  flask: ['REST API Development', 'Flask Routing', 'Microservices'],
  django: ['Django ORM', 'MVC Architecture', 'Django REST Framework (DRF)'],
  fastapi: ['High-Performance APIs', 'Pydantic Models', 'Asynchronous Request Handling'],
  nodejs: ['Event-Driven Architecture', 'npm Package Management', 'Backend Services'],
  express: ['Express Middleware', 'Route Management', 'Node API Services'],
  mongodb: ['NoSQL Databases', 'MongoDB Aggregations', 'Mongoose Schema Design'],
  postgres: ['Relational Database Design', 'SQL Query Optimization', 'PostgreSQL Admin'],
  postgresql: ['Relational Database Design', 'SQL Query Optimization', 'PostgreSQL Admin'],
  mysql: ['SQL Query Optimization', 'Relational Databases'],
  firebase: ['Realtime Database', 'Firebase Authentication', 'Cloud Functions'],
  supabase: ['PostgreSQL Database', 'Supabase Auth', 'Real-time Subscriptions'],
  aws: ['Cloud Infrastructure', 'AWS Lambda', 'Amazon S3', 'EC2 Deployment'],
  docker: ['Containerization', 'Docker Compose', 'Multi-stage Builds'],
  kubernetes: ['Container Orchestration', 'Microservices Scaling', 'K8s Cluster Management'],
  pytorch: ['Deep Learning', 'Neural Network Training', 'Tensor Operations'],
  tensorflow: ['TensorFlow Models', 'Neural Networks', 'Model Deployment'],
  'machine learning': ['Supervised Learning', 'Predictive Modeling', 'Feature Engineering', 'Model Evaluation'],
  ml: ['Supervised Learning', 'Predictive Modeling', 'Feature Engineering'],
  kmeans: ['Unsupervised Clustering', 'Pattern Recognition', 'Data Segmentation'],
  visualizations: ['Data Visualization', 'Interactive Dashboards', 'Chart.js / D3.js Integration']
};

export const EXAMPLE_PROJECTS: ProjectInput[] = [
  {
    name: 'Customer Segmentation System',
    techStack: 'Python, Flask, React, Machine Learning, KMeans, Chart.js',
    features: 'KMeans clustering algorithms, customer behavior grouping, interactive visualization charts, exportable PDF reports',
    impact: 'Improved business analysis of customer behavior and increased targeted marketing conversions by 25%'
  },
  {
    name: 'Real-Time Chat Application',
    techStack: 'React, Node.js, Express, Socket.io, Tailwind CSS, MongoDB',
    features: 'Instant messaging protocol, active user presence states, typing indicator animation, encrypted storage of conversation history',
    impact: 'Reduced message latency to under 50ms and sustained over 1,000 concurrent active chat connections'
  },
  {
    name: 'E-Commerce Checkout Pipeline',
    techStack: 'Next.js, Tailwind CSS, TypeScript, Stripe API, PostgreSQL, Prisma',
    features: 'Multi-step shopping cart flow, direct Stripe payment intent setup, real-time inventory count checks, order confirmation emails via Resend',
    impact: 'Reduced checkout checkout drop-offs by 18% and accelerated page loading speed by 40%'
  }
];
