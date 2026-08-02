export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics?: string[];
}

export interface GitHubActivity {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: any;
}

const CACHE_DURATION = import.meta.env.DEV ? 5000 : 60 * 60 * 1000; // 5 seconds in development, 1 hour in production

// Highly realistic fallback data for D Hari Prasath in case of rate-limiting or offline development
const MOCK_PROFILE: GitHubProfile = {
  login: 'Hariprasath2611',
  name: 'D Hari Prasath',
  avatar_url: 'https://avatars.githubusercontent.com/u/104332801?v=4', // Dynamic user avatar URL
  bio: 'Full Stack Developer | Crafting scalable web applications & interactive experiences',
  public_repos: 34,
  followers: 48,
  following: 52,
  html_url: 'https://github.com/Hariprasath2611',
};

const MOCK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'quantum-vault',
    description: 'A secure, end-to-end encrypted password manager and digital vault with a futuristic web interface. Built using modern cryptographic APIs.',
    html_url: 'https://github.com/Hariprasath2611/quantum-vault',
    homepage: 'https://quantum-vault.vercel.app',
    stargazers_count: 24,
    forks_count: 8,
    language: 'TypeScript',
    updated_at: new Date().toISOString(),
    topics: ['react', 'tailwindcss', 'cryptography', 'security', 'full-stack'],
  },
  {
    id: 2,
    name: 'dev-stream-api',
    description: 'Scalable Express.js gateway facilitating real-time WebSocket telemetries and video streaming services with Redis caching.',
    html_url: 'https://github.com/Hariprasath2611/dev-stream-api',
    homepage: null,
    stargazers_count: 18,
    forks_count: 5,
    language: 'JavaScript',
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    topics: ['nodejs', 'express', 'websockets', 'redis', 'backend'],
  },
  {
    id: 3,
    name: 'orbit-mesh-mobile',
    description: 'A React Native mobile client for tracking distributed network node statuses and server analytics directly on iOS and Android.',
    html_url: 'https://github.com/Hariprasath2611/orbit-mesh-mobile',
    homepage: 'https://play.google.com',
    stargazers_count: 15,
    forks_count: 3,
    language: 'TypeScript',
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    topics: ['react-native', 'mobile', 'typescript', 'charts', 'api-client'],
  },
  {
    id: 4,
    name: 'portfolio-2026',
    description: 'Premium futuristic developer portfolio designed with interactive layouts, glassmorphism, Framer Motion, and GitHub integrations.',
    html_url: 'https://github.com/Hariprasath2611/portfolio-2026',
    homepage: 'https://hariprasath.dev',
    stargazers_count: 35,
    forks_count: 12,
    language: 'TypeScript',
    updated_at: new Date().toISOString(),
    topics: ['react', 'tailwindcss', 'framer-motion', 'github-api', 'vite'],
  },
  {
    id: 5,
    name: 'neural-editor',
    description: 'An AI-assisted Markdown editor that runs locally and parses LLM responses into modular, visual nodes in real time.',
    html_url: 'https://github.com/Hariprasath2611/neural-editor',
    homepage: null,
    stargazers_count: 12,
    forks_count: 2,
    language: 'React',
    updated_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    topics: ['react', 'ai', 'markdown', 'canvas', 'frontend'],
  },
  {
    id: 6,
    name: 'sync-db-adapter',
    description: 'Ultra-lightweight database sync adapter linking client-side indexedDB states with remote PostgreSQL endpoints seamlessly.',
    html_url: 'https://github.com/Hariprasath2611/sync-db-adapter',
    homepage: 'https://www.npmjs.com',
    stargazers_count: 9,
    forks_count: 1,
    language: 'TypeScript',
    updated_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    topics: ['typescript', 'postgresql', 'indexeddb', 'database', 'npm-package'],
  }
];

const MOCK_STARRED_REPOS: GitHubRepo[] = [
  {
    id: 1134326804,
    name: 'E-comers-app',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/E-comers-app',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'Dart',
    updated_at: '2026-08-02T09:38:06Z',
    topics: []
  },
  {
    id: 1253000128,
    name: 'SDMA-attendence-softwere',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/SDMA-attendence-softwere',
    homepage: 'https://sdma-seven.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-08-02T09:37:18Z',
    topics: []
  },
  {
    id: 1276536218,
    name: 'ForgeClould',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/ForgeClould',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-08-02T09:37:07Z',
    topics: []
  },
  {
    id: 1272959095,
    name: 'BuildSpace-AI',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/BuildSpace-AI',
    homepage: 'https://build-space-ai.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-21T13:44:37Z',
    topics: []
  },
  {
    id: 1141002099,
    name: 'TrustLocal',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/TrustLocal',
    homepage: 'https://trust-local.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-06-17T08:43:33Z',
    topics: []
  },
  {
    id: 1271881858,
    name: 'STARTUPFORGE-AI',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/STARTUPFORGE-AI',
    homepage: 'https://startupforge-ai-phi.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-17T08:42:39Z',
    topics: []
  },
  {
    id: 1271961942,
    name: 'STARTUPFORGE-AI-MOBILE-APPLICATION',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/STARTUPFORGE-AI-MOBILE-APPLICATION',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-17T08:42:35Z',
    topics: []
  },
  {
    id: 1271997852,
    name: 'Synapse-AI-web-apllication',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/Synapse-AI-web-apllication',
    homepage: 'https://synapse-ai-web-apllication.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-06-17T08:42:34Z',
    topics: []
  },
  {
    id: 1272021994,
    name: 'Synapse-AI-mobile-apllication',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/Synapse-AI-mobile-apllication',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-17T08:42:33Z',
    topics: []
  },
  {
    id: 1270865357,
    name: 'AI-DIGITAL-TWIN-MOBILE-APP--ANDROID---IOS-',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/AI-DIGITAL-TWIN-MOBILE-APP--ANDROID---IOS-',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-06-16T06:01:20Z',
    topics: []
  },
  {
    id: 1270780522,
    name: 'LifeOS-AI-Web',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/LifeOS-AI-Web',
    homepage: 'https://life-os-ai-web-eta.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-16T05:32:25Z',
    topics: []
  },
  {
    id: 1270808232,
    name: 'LIFEOS-AI-MOBILE-APPLICATION--ANDROID---IOS-',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/LIFEOS-AI-MOBILE-APPLICATION--ANDROID---IOS-',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-16T05:32:24Z',
    topics: []
  },
  {
    id: 1270836674,
    name: 'AI-DIGITAL-TWIN-PLATFORM',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/AI-DIGITAL-TWIN-PLATFORM',
    homepage: 'https://ai-digital-twin-platform.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-16T05:44:09Z',
    topics: []
  },
  {
    id: 1269275482,
    name: 'Portfolio-2026',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/Portfolio-2026',
    homepage: 'https://hariprasathportfolio-zeta.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-08-02T09:40:34Z',
    topics: []
  },
  {
    id: 1270349585,
    name: 'AI-Powered-College-Management-Platform',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/AI-Powered-College-Management-Platform',
    homepage: 'https://ai-powered-college-management-platf.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-06-15T17:30:21Z',
    topics: []
  },
  {
    id: 1270374399,
    name: 'AI-Powered-College-Management-Mobile-App',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/AI-Powered-College-Management-Mobile-App',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-06-15T17:30:20Z',
    topics: []
  },
  {
    id: 1135471465,
    name: 'Hariprasath2611',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/Hariprasath2611',
    homepage: null,
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-07-28T09:56:54Z',
    topics: []
  },
  {
    id: 1270394232,
    name: 'Freelance-Marketplace-for-Students',
    description: 'No description provided.',
    html_url: 'https://github.com/Hariprasath2611/Freelance-Marketplace-for-Students',
    homepage: 'https://freelance-marketplace-for-students.vercel.app',
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-06-15T17:30:16Z',
    topics: []
  }
];


const MOCK_EVENTS: GitHubActivity[] = [
  { type: 'PushEvent', repo: { name: 'quantum-vault' }, created_at: new Date().toISOString() },
  { type: 'CreateEvent', repo: { name: 'portfolio-2026' }, created_at: new Date(Date.now() - 2 * 3600000).toISOString() },
  { type: 'IssuesEvent', repo: { name: 'dev-stream-api' }, created_at: new Date(Date.now() - 24 * 3600000).toISOString() },
  { type: 'PushEvent', repo: { name: 'orbit-mesh-mobile' }, created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { type: 'WatchEvent', repo: { name: 'framer-motion' }, created_at: new Date(Date.now() - 5 * 86400000).toISOString() },
];

function getCached<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (Date.now() - parsed.timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch (e) {
    return null;
  }
}

function setCached<T>(key: string, data: T): void {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (e) {
    // Ignore storage quota issues
  }
}

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile> {
  const cacheKey = `gh_profile_${username}`;
  const cached = getCached<GitHubProfile>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    const data = await res.json();
    const profile: GitHubProfile = {
      login: data.login,
      name: data.name || data.login,
      avatar_url: data.avatar_url,
      bio: data.bio || '',
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      html_url: data.html_url,
    };
    setCached(cacheKey, profile);
    return profile;
  } catch (error) {
    console.warn('GitHub Profile fetch failed, using fallback mock data:', error);
    return MOCK_PROFILE;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const cacheKey = `gh_repos_${username}`;
  const cached = getCached<GitHubRepo[]>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('Failed to fetch repos');
    const data = await res.json();
    const repos: GitHubRepo[] = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language || 'TypeScript',
      updated_at: repo.updated_at,
      topics: repo.topics || [],
    }));
    setCached(cacheKey, repos);
    return repos;
  } catch (error) {
    console.warn('GitHub Repos fetch failed, using fallback mock data:', error);
    return MOCK_REPOS;
  }
}

export async function fetchGitHubStarredRepos(username: string): Promise<GitHubRepo[]> {
  const cacheKey = `gh_starred_repos_${username}`;
  const cached = getCached<GitHubRepo[]>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/starred`);
    if (!res.ok) throw new Error('Failed to fetch starred repos');
    const data = await res.json();
    const repos: GitHubRepo[] = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language || 'TypeScript',
      updated_at: repo.updated_at,
      topics: repo.topics || [],
    }));
    setCached(cacheKey, repos);
    return repos;
  } catch (error) {
    console.warn('GitHub Starred Repos fetch failed, using fallback mock data:', error);
    return MOCK_STARRED_REPOS;
  }
}


export async function fetchGitHubActivity(username: string): Promise<GitHubActivity[]> {
  const cacheKey = `gh_activity_${username}`;
  const cached = getCached<GitHubActivity[]>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/events`);
    if (!res.ok) throw new Error('Failed to fetch activities');
    const data = await res.json();
    const activities = data.slice(0, 10).map((event: any) => ({
      type: event.type,
      repo: { name: event.repo.name.replace(`${username}/`, '') },
      created_at: event.created_at,
    }));
    setCached(cacheKey, activities);
    return activities;
  } catch (error) {
    console.warn('GitHub Activities fetch failed, using fallback mock data:', error);
    return MOCK_EVENTS;
  }
}
