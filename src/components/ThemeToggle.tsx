import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun Icon */}
        <span
          className={`absolute inset-0 transform transition-transform duration-500 ease-spring ${
            theme === 'dark' ? 'translate-y-8 rotate-90 scale-0' : 'translate-y-0 rotate-0 scale-100'
          }`}
        >
          <Sun className="w-5 h-5 text-amber-500 fill-amber-500/20" />
        </span>
        {/* Moon Icon */}
        <span
          className={`absolute inset-0 transform transition-transform duration-500 ease-spring ${
            theme === 'light' ? '-translate-y-8 -rotate-90 scale-0' : 'translate-y-0 rotate-0 scale-100'
          }`}
        >
          <Moon className="w-5 h-5 text-brand-400 fill-brand-400/20" />
        </span>
      </div>
    </button>
  );
}
