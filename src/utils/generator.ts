import type { ProjectInput } from '../constants/templates';
import {
  ACTION_VERBS,
  TECH_CATEGORIES,
  BULLET_TEMPLATES,
  SUMMARY_TEMPLATES,
  LINKEDIN_TEMPLATES,
  ATS_KEYWORD_MAP
} from '../constants/templates';

// Helper to choose a random item from an array
const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Helper to shuffle an array
const shuffleArray = <T>(arr: T[]): T[] => {
  return [...arr].sort(() => Math.random() - 0.5);
};

// Clean and capitalize a string
const cleanString = (str: string): string => {
  return str.trim().replace(/^[\s•\-\*]+/, '').trim();
};

// Grammar helper: format feature clause (ensures feature starts with a lowercase letter if it is middle-sentence)
const formatMidSentence = (str: string): string => {
  if (!str) return '';
  const clean = cleanString(str);
  // If first word is capitalized but isn't an acronym, lowercase it
  const words = clean.split(' ');
  if (words.length > 0) {
    const firstWord = words[0];
    if (firstWord === firstWord.toUpperCase() && firstWord.length > 4) {
      // Acronym (like REST, AJAX, CORS, KMeans) - keep uppercase
      return clean;
    }
    // Check if it's already lower
    words[0] = firstWord.charAt(0).toLowerCase() + firstWord.slice(1);
  }
  return words.join(' ');
};

// Grammar helper: format impact clause (removes leading "improved", "improving" if templates already provide transition words)
const formatImpactClause = (str: string): string => {
  if (!str) return 'optimizing platform execution';
  let clean = cleanString(str);
  // Lowercase first letter
  clean = clean.charAt(0).toLowerCase() + clean.slice(1);
  // Strip common leading words if they conflict with the sentence transitions
  clean = clean.replace(/^(resulting in|which resulted in|to|by|improving|improved)\s+/i, '');
  return clean;
};

export interface GeneratedOutputs {
  bullets: string[];
  summary: string;
  linkedin: string;
  keywords: string[];
}

export function generateResumeContent(input: ProjectInput): GeneratedOutputs {
  const name = cleanString(input.name) || 'Project Sandbox';
  
  // 1. Process Tech Stack
  const rawTech = input.techStack.split(',').map(t => t.trim()).filter(Boolean);
  const techStack = rawTech.length > 0 ? rawTech : ['React', 'TypeScript', 'Node.js'];
  
  // 2. Process Features
  // Split features by commas, semicolons or newlines
  const rawFeatures = input.features
    .split(/[;,\n]+/)
    .map(f => cleanString(f))
    .filter(f => f.length > 3);
  
  const features = rawFeatures.length > 0 ? rawFeatures : [
    'responsive client interfaces',
    'highly scalable web APIs',
    'dynamic front-end states'
  ];

  // 3. Process Impact
  const impactRaw = cleanString(input.impact);
  const impact = impactRaw || 'increasing user engagement and streamlining system operations';
  const formattedImpact = formatImpactClause(impact);

  // 4. Generate Resume Bullets
  const generatedBullets: string[] = [];
  const bulletCount = Math.max(3, features.length);
  
  // Shuffle categories to get distinct formats for bullets
  const categories = shuffleArray(['feature_first', 'action_first', 'system_level']);
  
  // We want to generate distinct bullet points
  for (let i = 0; i < bulletCount; i++) {
    const featureIdx = i % features.length;
    const currentFeature = formatMidSentence(features[featureIdx]);
    
    // Choose template category, cycling if more than 3 bullets
    const cat = categories[i % categories.length];
    const templates = BULLET_TEMPLATES[cat];
    const template = getRandomItem(templates);
    
    // Select action verb
    const verbType = i === 2 ? 'improvement' : 'creation';
    const verb = getRandomItem(ACTION_VERBS[verbType]);
    
    // Select subset of tech stack to keep each bullet unique
    // Bullet 1: Core tech, Bullet 2: Frontend/Backend specific, Bullet 3: Database/Cloud specific
    let selectedTech = '';
    if (techStack.length === 1) {
      selectedTech = techStack[0];
    } else if (techStack.length === 2) {
      selectedTech = techStack.join(' and ');
    } else {
      // Pick 2 technologies for this bullet, ensuring variety
      const subset = [techStack[featureIdx % techStack.length]];
      const secondTech = techStack[(featureIdx + 1) % techStack.length];
      if (secondTech && secondTech !== subset[0]) {
        subset.push(secondTech);
      }
      selectedTech = subset.join(' and ');
    }

    // Build the sentence
    let bullet = template
      .replace('{feature}', currentFeature)
      .replace('{tech}', selectedTech)
      .replace('{verb}', verb)
      .replace('{impact}', formattedImpact);
    
    // Grammatical polish: Capitalize first letter and ensure it ends with period
    bullet = bullet.charAt(0).toUpperCase() + bullet.slice(1);
    if (!bullet.endsWith('.')) {
      bullet += '.';
    }
    
    // Avoid exact duplicate bullets
    if (!generatedBullets.includes(bullet)) {
      generatedBullets.push(bullet);
    }
  }

  // Ensure we return at least 3 bullets
  while (generatedBullets.length < 3) {
    const dummyFeature = features[0];
    const dummyBullet = `Architected core ${dummyFeature} functionalities powered by ${techStack[0]}, successfully ${formattedImpact}.`;
    generatedBullets.push(dummyBullet);
  }

  // Limit output to a clean layout-friendly size if needed, but return all if user provided many features
  const finalBullets = generatedBullets.slice(0, Math.max(3, features.length));

  // 5. Generate Project Summary
  const summaryTemplate = getRandomItem(SUMMARY_TEMPLATES);
  const techMain = techStack.slice(0, 2).join(' and ');
  const techSub = techStack.length > 2 ? techStack.slice(2, 4).join(', ') : 'modern tools';
  const featMain = formatMidSentence(features[0]);
  const featSub = features.length > 1 ? formatMidSentence(features[1]) : 'scalable workflows';
  
  let summary = summaryTemplate
    .replace('{name}', name)
    .replace('{tech_main}', techMain)
    .replace('{tech_sub}', techSub)
    .replace('{feature_main}', featMain)
    .replace('{feature_sub}', featSub)
    .replace('{impact_short}', formattedImpact);
  
  summary = summary.charAt(0).toUpperCase() + summary.slice(1);
  if (!summary.endsWith('.')) {
    summary += '.';
  }

  // 6. Generate LinkedIn Description
  const linkedinTemplate = getRandomItem(LINKEDIN_TEMPLATES);
  const featSecondary = features.length > 1 ? formatMidSentence(features[1]) : 'robust performance controls';
  
  // Extract clean hashtags
  const hashtags = techStack.map(t => {
    const clean = t.replace(/[^a-zA-Z0-9]/g, '');
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }).slice(0, 4);
  
  const tag1 = hashtags[0] || 'SoftwareEngineering';
  const tag2 = hashtags[1] || 'WebDevelopment';
  const tag3 = hashtags[2] || 'Coding';

  const linkedin = linkedinTemplate
    .replace(/{name}/g, name)
    .replace(/{tech}/g, techStack.join(', '))
    .replace(/{tech_main}/g, techStack[0])
    .replace(/{tech_sub}/g, techStack[1] || techStack[0])
    .replace(/{feature_main}/g, formatMidSentence(features[0]))
    .replace(/{feature_secondary}/g, featSecondary)
    .replace(/{feature_sub}/g, features.join(', '))
    .replace(/{impact_short}/g, formattedImpact)
    .replace(/{tag1}/g, tag1)
    .replace(/{tag2}/g, tag2)
    .replace(/{tag3}/g, tag3);

  // 7. Extract ATS Keywords
  const extractedKeywords = new Set<string>();
  
  // Always add the raw tech stack items
  techStack.forEach(t => {
    extractedKeywords.add(t);
    // Find matching categories or expanded terms
    const key = t.toLowerCase();
    
    // Look up in ATS keyword mapping
    Object.keys(ATS_KEYWORD_MAP).forEach(mapKey => {
      if (key.includes(mapKey) || mapKey.includes(key)) {
        ATS_KEYWORD_MAP[mapKey].forEach(kw => extractedKeywords.add(kw));
      }
    });

    // Look up in Tech Categories
    Object.keys(TECH_CATEGORIES).forEach(category => {
      if (TECH_CATEGORIES[category].includes(key)) {
        // Add category tag itself
        if (category === 'ai_ml') extractedKeywords.add('Machine Learning');
        if (category === 'frontend') extractedKeywords.add('Frontend Engineering');
        if (category === 'backend') extractedKeywords.add('Backend Engineering');
        if (category === 'database') extractedKeywords.add('Database Management');
        if (category === 'cloud') extractedKeywords.add('Cloud Computing');
      }
    });
  });

  // Add domain keywords based on keywords in features/impact
  const fullText = (input.features + ' ' + input.impact).toLowerCase();
  if (fullText.includes('api') || fullText.includes('rest')) {
    extractedKeywords.add('REST APIs');
    extractedKeywords.add('API Integration');
  }
  if (fullText.includes('scale') || fullText.includes('performance')) {
    extractedKeywords.add('System Scalability');
    extractedKeywords.add('Performance Optimization');
  }
  if (fullText.includes('dashboard') || fullText.includes('chart') || fullText.includes('vis')) {
    extractedKeywords.add('Data Visualization');
    extractedKeywords.add('Interactive Dashboards');
  }
  if (fullText.includes('auth') || fullText.includes('login') || fullText.includes('security')) {
    extractedKeywords.add('User Authentication');
    extractedKeywords.add('Application Security');
  }

  // Deduplicate and filter out short empty entries
  const keywords = Array.from(extractedKeywords).filter(k => k.trim().length > 1);

  return {
    bullets: finalBullets,
    summary,
    linkedin,
    keywords: keywords.slice(0, 12) // Keep a tight, professional size
  };
}
