import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';

export const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Gallery', path: '/gallery' },
    { label: 'Docs', path: '/guide' },
    { label: 'Roadmap', path: '/roadmap' },
  ];

  return (
    <header className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-lg border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')} role="banner">
            <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} flex items-center justify-center shadow-lg overflow-hidden transition-colors duration-300`}>
              <img
                src={darkMode ? "https://img.ionicerrrrscode.com/company-projects/logo-dark.webp" : "https://img.ionicerrrrscode.com/company-projects/logo-light.webp"}
                alt="Flutter Theme Generator Logo"
                className="w-14 h-14 object-contain"
                width="56"
                height="56"
              />
            </div>
            <div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Flutter Theme Generator
              </span>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                Professional Theme Builder
              </p>
            </div>
          </div>

          {/* Navigation & Actions */}
          <nav className="flex items-center space-x-2 md:space-x-4" aria-label="Main navigation">
            {currentUser ? (
              <button
                onClick={() => navigate('/profile')}
                className={`p-2 rounded-full transition-all duration-200 ${darkMode
                  ? 'bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50'
                  : 'bg-gray-100/50 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                title="My Profile"
                aria-label="Go to profile"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                    width="32"
                    height="32"
                  />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${darkMode
                  ? 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/20'
                  : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'
                  }`}
              >
                Login
              </button>
            )}

            {/* Desktop navigation links */}
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`hidden md:block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${darkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${darkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile navigation dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-3 pt-3 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
