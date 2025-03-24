import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Layout = ({ children, title = 'Ethiopian History' }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for user preference in local storage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to local storage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/people', label: 'People & Leaders' },
    { href: '/languages', label: 'Languages & Culture' },
    { href: '/map', label: 'Interactive Map' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title} | Ethiopian History</title>
        <meta name="description" content="Interactive Ethiopian History Web App" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-white dark:bg-gray-900 shadow-md">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-ethiopia-green">
                EthoTarik
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    router.pathname === link.href
                      ? 'text-ethiopia-red'
                      : 'text-gray-700 dark:text-gray-300 hover:text-ethiopia-green dark:hover:text-ethiopia-yellow'
                  } transition-colors duration-200`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium ${
                      router.pathname === link.href
                        ? 'text-ethiopia-red'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 w-fit rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '🌞' : '🌙'}
                </button>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} EthoTarik - Ethiopian History Interactive Web App
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Built with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
