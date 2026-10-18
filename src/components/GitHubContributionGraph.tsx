import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Flame, RefreshCw } from 'lucide-react';
import { fetchGitHubContributions } from '../utils/github';
import type { GitHubContributionsData, ContributionDay } from '../utils/github';

interface GitHubContributionGraphProps {
  username?: string;
  onTotalChange?: (total: number) => void;
}

export default function GitHubContributionGraph({
  username = 'Hariprasath2611',
  onTotalChange,
}: GitHubContributionGraphProps) {
  const [data, setData] = useState<GitHubContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [justSynced, setJustSynced] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastFetchTimeRef = useRef<number>(0);

  const loadContributions = useCallback(
    async (forceRefresh = false) => {
      try {
        if (forceRefresh) setIsRefreshing(true);
        const result = await fetchGitHubContributions(username, forceRefresh);
        setData(result);
        lastFetchTimeRef.current = Date.now();
        if (onTotalChange && result.total) {
          onTotalChange(result.total);
        }
        if (forceRefresh) {
          setJustSynced(true);
          setTimeout(() => setJustSynced(false), 2500);
        }
      } catch (err) {
        console.error('Failed to load GitHub contributions', err);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [username, onTotalChange]
  );

  useEffect(() => {
    let ignore = false;
    fetchGitHubContributions(username, false)
      .then((result) => {
        if (!ignore) {
          setData(result);
          lastFetchTimeRef.current = Date.now();
          if (onTotalChange && result.total) {
            onTotalChange(result.total);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load GitHub contributions', err);
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [username, onTotalChange]);

  // Auto-scroll to latest contributions (rightmost edge) on initial load
  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  // Window focus listener: silently re-validate if user returns after pushing git changes
  useEffect(() => {
    const handleFocus = () => {
      const now = Date.now();
      // If returning after at least 60 seconds, check for new commits
      if (now - lastFetchTimeRef.current > 60 * 1000) {
        loadContributions(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadContributions]);

  // Filtered month labels to avoid crowding
  const displayMonthLabels = useMemo(() => {
    if (!data?.monthLabels) return [];
    const filtered: { weekIdx: number; monthName: string }[] = [];
    let lastWeekIdx = -4;

    for (const m of data.monthLabels) {
      if (m.weekIdx - lastWeekIdx >= 3 && m.weekIdx < 51) {
        filtered.push(m);
        lastWeekIdx = m.weekIdx;
      }
    }
    return filtered;
  }, [data]);

  // Color mapping matching user design
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-[#0e4429] hover:bg-[#135d39]';
      case 2:
        return 'bg-[#006d32] hover:bg-[#008f42]';
      case 3:
        return 'bg-[#26a641] hover:bg-[#34c752] shadow-[0_0_6px_rgba(38,166,65,0.4)]';
      case 4:
        return 'bg-[#00f5a0] hover:bg-[#33ffb5] shadow-[0_0_10px_rgba(0,245,160,0.6)]';
      case 0:
      default:
        return 'bg-[#21262d] hover:bg-[#2b313a]';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00Z');
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const totalCommitsDisplay = data?.total ? `${data.total.toLocaleString()}+` : '2000+';

  return (
    <div
      ref={containerRef}
      className="rounded-3xl border-2 border-white/20 bg-white/5 p-6 md:p-8 backdrop-blur-sm shadow-[6px_6px_0px_#000000] relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#FF8A5B]" />
          <span>Contribution Activity</span>
        </h4>

        <div className="flex items-center gap-3">
          {justSynced && (
            <span className="font-mono text-[11px] text-[#FFD84D] animate-pulse">
              ✓ Synced with Git
            </span>
          )}

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>● {totalCommitsDisplay} Total Commits</span>
          </div>

          <button
            onClick={() => loadContributions(true)}
            disabled={isRefreshing}
            title="Sync with GitHub (Live)"
            aria-label="Sync with GitHub"
            className="min-w-[40px] min-h-[40px] p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#FFD84D]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Heatmap Grid Area */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-3 pt-1 scrollbar-none relative touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {loading && !data ? (
          /* Loading Skeleton */
          <div className="animate-pulse">
            <div className="h-4 w-64 bg-white/10 rounded mb-2" />
            <div className="grid grid-rows-7 grid-flow-col gap-[3px] w-max">
              {Array.from({ length: 7 * 36 }).map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-[2.5px] bg-white/10" />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-max select-none">
            {/* Month Labels Header */}
            <div className="flex h-5 relative mb-1.5 text-[10px] font-mono text-slate-400">
              {displayMonthLabels.map((m, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{ left: `${m.weekIdx * 15 + 32}px` }}
                >
                  {m.monthName}
                </span>
              ))}
            </div>

            {/* Grid with Day of Week Labels */}
            <div className="flex items-start gap-2">
              {/* Day Labels (Mon, Wed, Fri) aligned with 12px rows + 3px gap */}
              <div className="grid grid-rows-7 gap-[3px] text-[9px] font-mono text-slate-500 select-none w-6 text-right pr-2 leading-[12px]">
                <span className="h-[12px] leading-[12px]" />
                <span className="h-[12px] leading-[12px]">Mon</span>
                <span className="h-[12px] leading-[12px]" />
                <span className="h-[12px] leading-[12px]">Wed</span>
                <span className="h-[12px] leading-[12px]" />
                <span className="h-[12px] leading-[12px]">Fri</span>
                <span className="h-[12px] leading-[12px]" />
              </div>

              {/* Heatmap Columns (7 rows x N weeks) */}
              <div
                className="grid grid-rows-7 grid-flow-col gap-[3px]"
                style={{ gridTemplateRows: 'repeat(7, 12px)' }}
              >
                {data?.weeks.map((week, weekIdx) =>
                  week.days.map((day, dayIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${weekIdx}-${dayIdx}`}
                          className="w-3 h-3 rounded-[2.5px] opacity-0 pointer-events-none"
                        />
                      );
                    }

                    const colorClass = getCellColor(day.level);

                    return (
                      <div
                        key={day.date}
                        className={`w-3 h-3 rounded-[2.5px] cursor-pointer transition-all duration-150 hover:scale-135 hover:z-30 hover:ring-2 hover:ring-emerald-400 ${colorClass}`}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const containerRect = containerRef.current?.getBoundingClientRect();
                          if (containerRect) {
                            setHoveredCell({
                              day,
                              x: rect.left - containerRect.left + rect.width / 2,
                              y: rect.top - containerRect.top,
                            });
                          }
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const containerRect = containerRef.current?.getBoundingClientRect();
                          if (containerRect) {
                            setHoveredCell({
                              day,
                              x: rect.left - containerRect.left + rect.width / 2,
                              y: rect.top - containerRect.top,
                            });
                          }
                        }}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Interactive Tooltip */}
      {hoveredCell && (
        <div
          className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 rounded-lg bg-[#12110F] border border-white/20 text-white font-mono text-xs shadow-2xl backdrop-blur-md"
          style={{
            left: `${hoveredCell.x}px`,
            top: `${hoveredCell.y - 8}px`,
          }}
        >
          <div className="font-bold text-emerald-400">
            {hoveredCell.day.count === 0
              ? 'No contributions'
              : `${hoveredCell.day.count} contribution${hoveredCell.day.count > 1 ? 's' : ''}`}
          </div>
          <div className="text-[11px] text-slate-400">
            {formatDate(hoveredCell.day.date)}
          </div>
        </div>
      )}

      {/* Footer Legend */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-4 pt-4 border-t border-white/10">
        <span>Less</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#21262d]" title="No contributions" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" title="1-3 contributions" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" title="4-9 contributions" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" title="10-19 contributions" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00f5a0]" title="20+ contributions" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
