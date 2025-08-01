import { useState, useEffect } from 'react';
import { ThemeCounterService } from '../services/ThemeCounterService';

interface ThemeCounterProps {
  darkMode: boolean;
}

export function ThemeCounter({ darkMode }: ThemeCounterProps) {
  const [globalCount, setGlobalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGlobalCount = async () => {
      try {
        setLoading(true);
        const count = await ThemeCounterService.getGlobalCount();
        setGlobalCount(count);
        setError(false);
      } catch (err) {
        console.error('Error fetching global count:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalCount();
  }, []);

  if (error) {
    return null; // Hide counter if there's an error
  }

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
      darkMode 
        ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/30' 
        : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50'
    } backdrop-blur-lg shadow-lg`}>
      <div className="flex items-center space-x-2">
        <div className={`p-1.5 rounded-md ${
          darkMode 
            ? 'bg-purple-500/20 text-purple-300' 
            : 'bg-purple-100 text-purple-600'
        }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
        </div>
        
        <div className="text-center">
          <div className={`text-lg font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          } ${loading ? 'animate-pulse' : ''}`}>
            {loading ? '...' : ThemeCounterService.formatCount(globalCount)}
          </div>
          <div className={`text-xs font-medium ${
            darkMode ? 'text-purple-300' : 'text-purple-600'
          }`}>
            Themes Generated
          </div>
        </div>
        
        <div className={`w-2 h-2 rounded-full ${
          loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'
        }`}></div>
      </div>
    </div>
  );
}
