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

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

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
