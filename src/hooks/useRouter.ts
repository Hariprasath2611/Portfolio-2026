import { useState, useEffect, useCallback } from 'react';

export function useRouter() {
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    // Support either clean path (/resume) or hash (#/resume or #resume)
    if (window.location.hash.startsWith('#/resume') || window.location.hash === '#resume') {
      return '/resume';
    }
    return window.location.pathname === '/resume' ? '/resume' : '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    if (to === '/resume' || to === '#/resume') {
      window.history.pushState(null, '', '/resume');
      setCurrentPath('/resume');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (to === '/' || to === '') {
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Hash navigation (e.g., #about, #projects)
    if (to.startsWith('#')) {
      const sectionId = to.substring(1);
      if (currentPath !== '/') {
        window.history.pushState(null, '', `/${to}`);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  }, [currentPath]);

  return { currentPath, navigate };
}
