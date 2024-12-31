import { writable } from 'svelte/store';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createThemeStore() {
  const { subscribe, set, update } = writable<'light' | 'dark'>(getInitialTheme());

  subscribe(value => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', value === 'dark');
      localStorage.setItem('theme', value);
    }
  });

  return {
    subscribe,
    set,
    update
  };
}

export const theme = createThemeStore();