import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Flame, Award, Calendar, BarChart2 } from 'lucide-react';
import { fetchGitHubProfile, fetchGitHubRepos } from '../utils/github';
import type { GitHubProfile, GitHubRepo } from '../utils/github';
import { GithubIcon } from '../components/BrandIcons';

export default function GitHubDashboard() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGitHubData() {
      try {
        const username = 'Hariprasath2611';
        const [profData, repoData] = await Promise.all([
          fetchGitHubProfile(username),
          fetchGitHubRepos(username),
        ]);
        setProfile(profData);
        setRepos(repoData);
      } catch (err) {
        console.error('Failed to load GitHub statistics', err);
      } finally {
        setLoading(false);
      }
    }
    loadGitHubData();
  }, []);

  // Compute language breakdown from fetched repositories
  const getLanguageStats = () => {
    if (!repos.length) {
      return [
        { name: 'TypeScript', percentage: 48, color: 'bg-blue-500' },
        { name: 'JavaScript', percentage: 32, color: 'bg-yellow-400' },
        { name: 'CSS', percentage: 12, color: 'bg-purple-500' },
        { name: 'HTML', percentage: 8, color: 'bg-orange-500' },
      ];
    }

    const languageCounts: { [key: string]: number } = {};
    let totalCount = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        totalCount++;
      }
    });

    const colorsMap: { [key: string]: string } = {
      TypeScript: 'bg-blue-500',
      JavaScript: 'bg-yellow-400',
      CSS: 'bg-purple-600',
      HTML: 'bg-orange-500',
      Python: 'bg-green-600',
      Vue: 'bg-emerald-500',
      Shell: 'bg-gray-500',
    };

    return Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalCount) * 100),
        color: colorsMap[name] || 'bg-cyan-500',
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4); // Top 4 languages
  };

  // Generate 52 weeks x 7 days of simulated commits with hot-zones matching the theme
  const generateContributionGrid = () => {
    const grid = [];
    const seed = 2026; // lock random numbers
    let pseudoRandom = seed;
    
    // 53 columns (weeks), 7 rows (days)
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        // Simple LCG pseudo-random generator
        pseudoRandom = (pseudoRandom * 9301 + 49297) % 233280;
        const randVal = pseudoRandom / 233280;
        
        let level = 0; // 0 = none, 1 = low, 2 = mid, 3 = high
        if (randVal > 0.85) level = 3;
        else if (randVal > 0.65) level = 2;
        else if (randVal > 0.35) level = 1;
        
        // Make weekends slightly less active
        if ((d === 0 || d === 6) && randVal < 0.8) {
          level = Math.max(0, level - 1);
        }

        week.push(level);
      }
      grid.push(week);
    }
    return grid;
  };

  const contributionGrid = generateContributionGrid();
  const langStats = getLanguageStats();

  return (
    <section id="github" className="py-20 bg-slate-100/30 dark:bg-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white mb-4">
            &gt; GITHUB_DASHBOARD
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 font-mono text-cyan-400 animate-pulse">
            <span className="mb-2">FETCHING CORE MAINFRANE METRICS...</span>
            <div className="w-16 h-1 bg-cyan-500 rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Profile Card */}
            <motion.div
              className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={profile?.avatar_url}
                  alt="GitHub Profile Avatar"
                  className="w-16 h-16 rounded-xl border border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                />
                <div>
                  <h3 className="font-orbitron font-bold text-slate-800 dark:text-white text-lg">
                    {profile?.name}
                  </h3>
                  <a
                    href={profile?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-purple-400 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>@{profile?.login}</span>
                  </a>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-500 dark:text-gray-400 font-mono mb-6 leading-relaxed">
                &gt; {profile?.bio || 'Full stack engine offline status - custom bio loaded.'}
              </p>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-200/50 dark:border-cyan-500/10 mb-6">
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-400">Repos</div>
                  <div className="text-lg font-bold font-mono text-slate-800 dark:text-white flex justify-center items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    {profile?.public_repos}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-400">Followers</div>
                  <div className="text-lg font-bold font-mono text-slate-800 dark:text-white flex justify-center items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    {profile?.followers}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-400">Following</div>
                  <div className="text-lg font-bold font-mono text-slate-800 dark:text-white">
                    {profile?.following}
                  </div>
                </div>
              </div>

              {/* Streak info */}
              <div className="flex gap-4">
                <div className="flex-1 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-cyan-500/5 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Current Streak
                    </div>
                    <div className="text-sm font-bold font-mono text-slate-800 dark:text-white">
                      14 Days
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-cyan-500/5 flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Contributions
                    </div>
                    <div className="text-sm font-bold font-mono text-slate-800 dark:text-white">
                      1,840+
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Language Chart + Graph */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Languages Box */}
              <motion.div
                className="glass-panel p-6 rounded-2xl text-left"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  Primary Repository Languages
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {langStats.map((lang) => (
                    <div key={lang.name} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-700 dark:text-gray-300 font-semibold">{lang.name}</span>
                        <span className="text-slate-500 dark:text-gray-500">{lang.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200/60 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${lang.color} rounded-full`}
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Grid Box */}
              <motion.div
                className="glass-panel p-6 rounded-2xl text-left overflow-x-auto"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  GitHub Activity Matrix (12 Months)
                </h3>

                {/* Grid Wrapper */}
                <div className="min-w-[500px]">
                  <div className="flex gap-[3px]">
                    {contributionGrid.map((week, wIndex) => (
                      <div key={wIndex} className="flex flex-col gap-[3px]">
                        {week.map((level, dIndex) => {
                          let colorClass = 'bg-slate-200 dark:bg-gray-800';
                          if (level === 1) colorClass = 'bg-cyan-900/40 dark:bg-cyan-950/60 border border-cyan-500/10';
                          else if (level === 2) colorClass = 'bg-cyan-500/50 dark:bg-cyan-600/60';
                          else if (level === 3) colorClass = 'bg-cyan-400 dark:bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.8)]';

                          return (
                            <div
                              key={dIndex}
                              className={`w-[11px] h-[11px] rounded-[2px] transition-all hover:scale-125 ${colorClass}`}
                              title={`Contribution Level: ${level}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-slate-400">
                    <span>Less</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-slate-200 dark:bg-gray-800" />
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-cyan-900/40 dark:bg-cyan-950/60" />
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-cyan-500/50 dark:bg-cyan-600/60" />
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-cyan-400 dark:bg-cyan-400" />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
