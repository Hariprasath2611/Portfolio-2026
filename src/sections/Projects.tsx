import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Star, GitFork, Calendar, Filter } from 'lucide-react';
import { fetchGitHubRepos } from '../utils/github';
import type { GitHubRepo } from '../utils/github';
import { GithubIcon } from '../components/BrandIcons';
import ScrollFloat from '../components/ScrollFloat';

// List of repository names we want to prioritize as "featured"
const FEATURED_REPOS = ['quantum-vault', 'portfolio-2026', 'orbit-mesh-mobile'];

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // featured, updated, stars, forks

  useEffect(() => {
    async function loadRepos() {
      try {
        const repoData = await fetchGitHubRepos('Hariprasath2611');
        setRepos(repoData);
      } catch (err) {
        console.error('Failed to load repositories', err);
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, []);

  // Determine category based on topics and languages
  const getRepoCategory = (repo: GitHubRepo): string => {
    const topics = repo.topics || [];
    const lang = repo.language?.toLowerCase() || '';

    if (
      topics.includes('react-native') ||
      topics.includes('mobile') ||
      lang.includes('swift') ||
      lang.includes('kotlin')
    ) {
      return 'mobile';
    }

    if (
      topics.includes('nodejs') ||
      topics.includes('express') ||
      topics.includes('backend') ||
      topics.includes('postgresql') ||
      topics.includes('database') ||
      lang.includes('go') ||
      lang.includes('python') ||
      lang.includes('rust')
    ) {
      return 'backend';
    }

    if (
      topics.includes('react') ||
      topics.includes('website') ||
      topics.includes('frontend') ||
      lang.includes('typescript') ||
      lang.includes('javascript') ||
      lang.includes('html') ||
      lang.includes('css')
    ) {
      return 'web';
    }

    return 'tools';
  };

  // Filter and sort repositories
  const getProcessedRepos = () => {
    // 1. Search Query
    let result = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Category Filter
    if (activeCategory !== 'all') {
      result = result.filter((repo) => getRepoCategory(repo) === activeCategory);
    }

    // 3. Sorting
    result.sort((a, b) => {
      const isAFeatured = FEATURED_REPOS.includes(a.name);
      const isBFeatured = FEATURED_REPOS.includes(b.name);

      if (sortBy === 'featured') {
        if (isAFeatured && !isBFeatured) return -1;
        if (!isAFeatured && isBFeatured) return 1;
        return b.stargazers_count - a.stargazers_count; // Secondary sort by stars
      }

      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }

      if (sortBy === 'forks') {
        return b.forks_count - a.forks_count;
      }

      if (sortBy === 'updated') {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }

      return a.name.localeCompare(b.name);
    });

    return result;
  };

  const processedRepos = getProcessedRepos();

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: 'bg-blue-500',
      JavaScript: 'bg-yellow-400',
      CSS: 'bg-purple-600',
      HTML: 'bg-orange-500',
      Python: 'bg-green-600',
    };
    return colors[lang] || 'bg-cyan-500';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="projects" className="py-20 bg-cyber-grid relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <ScrollFloat
            containerClassName="mb-4"
            textClassName="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white"
          >
            &gt; MY_PROJECTS
          </ScrollFloat>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
        </div>

        {/* Filter Controls Panel */}
        <div className="glass-panel p-6 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between text-left">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-cyan-500/10 bg-slate-50 dark:bg-slate-900/60 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-sm"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Category Select */}
            <div className="flex items-center gap-2 border border-slate-200 dark:border-cyan-500/10 rounded-lg bg-slate-50 dark:bg-slate-900/60 px-3 py-2 text-xs font-mono text-slate-600 dark:text-gray-400">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-transparent focus:outline-none text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="all" className="dark:bg-slate-950">Category: All</option>
                <option value="web" className="dark:bg-slate-950">Web Apps</option>
                <option value="mobile" className="dark:bg-slate-950">Mobile Apps</option>
                <option value="backend" className="dark:bg-slate-950">Backend</option>
                <option value="tools" className="dark:bg-slate-950">Tools</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 border border-slate-200 dark:border-cyan-500/10 rounded-lg bg-slate-50 dark:bg-slate-900/60 px-3 py-2 text-xs font-mono text-slate-600 dark:text-gray-400">
              <Star className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="featured" className="dark:bg-slate-950">Sort: Featured</option>
                <option value="updated" className="dark:bg-slate-950">Sort: Recent</option>
                <option value="stars" className="dark:bg-slate-950">Sort: Stars</option>
                <option value="forks" className="dark:bg-slate-950">Sort: Forks</option>
              </select>
            </div>

          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 font-mono text-cyan-400 animate-pulse">
            <span>SYNCHRONIZING REPOSITORY CLUSTERS...</span>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {processedRepos.map((repo) => {
                  const isFeatured = FEATURED_REPOS.includes(repo.name);
                  return (
                    <motion.article
                      key={repo.id}
                      className={`glass-card p-6 rounded-xl flex flex-col justify-between text-left relative overflow-hidden border ${
                        isFeatured
                          ? 'border-cyan-400/35 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                          : 'border-slate-200/50 dark:border-cyan-500/5'
                      }`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -6 }}
                    >
                      {/* Top banner tag for featured repos */}
                      {isFeatured && (
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-400 to-indigo-500 text-white font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider shadow-sm">
                          FEATURED
                        </div>
                      )}

                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="font-orbitron font-bold text-slate-800 dark:text-white text-lg tracking-wide hover:text-cyan-400 transition-colors">
                          {repo.name}
                        </h3>
                        {/* Custom visual category tag */}
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-slate-100 dark:bg-gray-800 border border-slate-200/50 dark:border-cyan-500/10 text-[9px] font-mono uppercase tracking-wider text-slate-500 dark:text-cyan-400">
                          {getRepoCategory(repo)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6">
                        {repo.description}
                      </p>

                      {/* Info and CTA Actions */}
                      <div>
                        {/* Tags / Topics */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {repo.topics?.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200/50 dark:bg-slate-900/50 text-slate-600 dark:text-gray-500"
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>

                        {/* Language & Update details */}
                        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-gray-500 font-mono mb-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                            <span>{repo.language}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(repo.updated_at)}</span>
                          </div>
                        </div>

                        {/* Footer Info and links */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/40 dark:border-cyan-500/5">
                          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500/80" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="w-4 h-4 text-cyan-400/80" />
                              <span>{repo.forks_count}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-cyan-500/10 bg-slate-100/50 dark:bg-slate-900/40 text-slate-600 dark:text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                              title="Code Repository"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                            {repo.homepage && (
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-cyan-500/10 bg-slate-100/50 dark:bg-slate-900/40 text-slate-600 dark:text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                                title="Live Demo"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {processedRepos.length === 0 && (
              <div className="py-20 text-center font-mono text-slate-400">
                <span>NO MODULES FOUND MATCHING FILTER CRITERIA</span>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
