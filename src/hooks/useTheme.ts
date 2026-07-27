import { useEffect } from 'react';

export type Theme = 'dark';

export function useTheme() {
  const theme: Theme = 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
    localStorage.setItem('portfolio-theme', 'dark');
  }, []);

  return { theme };
}
