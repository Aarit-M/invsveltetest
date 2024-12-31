import { writable } from 'svelte/store';

export const theme = writable<'light' | 'dark'>('light');

export function toggleTheme() {
  theme.update(current => {
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    return newTheme;
  });
}

// Initialize theme based on system preference
if (typeof window !== 'undefined') {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  theme.set(systemTheme);
  document.documentElement.classList.toggle('dark', systemTheme === 'dark');
}