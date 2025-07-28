import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import HomePage from './components/HomePage'
import ThemeGeneratorComponent from './components/ThemeGeneratorComponent'
import GuideScreen from './components/GuideScreen'
import PreviewScreen from './components/PreviewScreen'
import { ThemeConfig } from './types/theme'
import { ThemeProvider } from './contexts/ThemeContext'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'

type AppPhase = 'home' | 'theme-generator' | 'guide' | 'preview'

function AppContent() {
  const [currentPhase, setCurrentPhase] = useState<AppPhase>('home')
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null)
  const { darkMode, toggleDarkMode } = useDarkMode()

  const handleNavigateToGenerator = () => {
    setCurrentPhase('theme-generator')
  }

  const handleNavigateToGuide = () => {
    setCurrentPhase('guide')
  }

  const handleNavigateToPreview = (config: ThemeConfig) => {
    setThemeConfig(config)
    setCurrentPhase('preview')
  }

  const handleBackToHome = () => {
    setCurrentPhase('home')
    setThemeConfig(null)
  }

  const handleBackToGenerator = () => {
    setCurrentPhase('theme-generator')
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      {currentPhase === 'home' && (
        <HomePage 
          onNavigateToGenerator={handleNavigateToGenerator}
          onNavigateToGuide={handleNavigateToGuide}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
      
      {currentPhase === 'theme-generator' && (
        <ThemeGeneratorComponent 
          onBack={handleBackToHome}
          onPreview={handleNavigateToPreview}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}

      {currentPhase === 'guide' && (
        <GuideScreen 
          onBack={handleBackToHome}
          darkMode={darkMode}
        />
      )}

      {currentPhase === 'preview' && themeConfig && (
        <PreviewScreen 
          themeConfig={themeConfig}
          onBack={handleBackToGenerator}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}


function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Hide splash after 2.7s (matches progress duration in SplashScreen)
  useEffect(() => {
    if (!showSplash) return;
    const timeout = setTimeout(() => setShowSplash(false), 2700);
    return () => clearTimeout(timeout);
  }, [showSplash]);

  return (
    <DarkModeProvider>
      <ThemeProvider>
        {showSplash ? <SplashScreen /> : <AppContent />}
      </ThemeProvider>
    </DarkModeProvider>
  );
}

export default App
