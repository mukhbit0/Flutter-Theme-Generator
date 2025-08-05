import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import HomePage from './components/HomePage'
import ThemeGeneratorComponent from './components/ThemeGeneratorComponent'
import GuideScreen from './components/GuideScreen'
import RoadmapScreen from './components/RoadmapScreen'
import PreviewScreen from './components/PreviewScreen'
import { ThemeConfig, ThemeGeneratorSettings } from './types/theme'
import { ThemeProvider } from './contexts/ThemeContext'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'

function AppContent() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null)
  const [themeSettings, setThemeSettings] = useState<ThemeGeneratorSettings | null>(null)
  const { darkMode, toggleDarkMode } = useDarkMode()
  const navigate = useNavigate()

  const handleNavigateToGenerator = () => {
    navigate('/generator')
  }

  const handleNavigateToGuide = () => {
    navigate('/guide')
  }

  const handleNavigateToRoadmap = () => {
    navigate('/roadmap')
  }

  const handleNavigateToPreview = (config: ThemeConfig, settings?: ThemeGeneratorSettings) => {
    setThemeConfig(config)
    setThemeSettings(settings || null)
    navigate('/preview')
  }

  const handleBackToHome = () => {
    navigate('/')
    setThemeConfig(null)
    setThemeSettings(null)
  }

  const handleBackToGenerator = () => {
    navigate('/generator')
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onNavigateToGenerator={handleNavigateToGenerator}
              onNavigateToGuide={handleNavigateToGuide}
              onNavigateToRoadmap={handleNavigateToRoadmap}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          } 
        />
        
        <Route 
          path="/generator" 
          element={
            <ThemeGeneratorComponent 
              onBack={handleBackToHome}
              onPreview={handleNavigateToPreview}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          } 
        />

        <Route 
          path="/guide" 
          element={
            <GuideScreen 
              onBack={handleBackToHome}
              darkMode={darkMode}
            />
          } 
        />

        <Route 
          path="/roadmap" 
          element={
            <RoadmapScreen 
              onBack={handleBackToHome}
              darkMode={darkMode}
              onNavigateToGenerator={handleNavigateToGenerator}
              onNavigateToGuide={handleNavigateToGuide}
            />
          } 
        />

        <Route 
          path="/preview" 
          element={
            themeConfig ? (
              <PreviewScreen 
                themeConfig={themeConfig}
                settings={themeSettings}
                onBack={handleBackToGenerator}
                darkMode={darkMode}
              />
            ) : (
              <HomePage 
                onNavigateToGenerator={handleNavigateToGenerator}
                onNavigateToGuide={handleNavigateToGuide}
                onNavigateToRoadmap={handleNavigateToRoadmap}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            )
          } 
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<HomePage 
          onNavigateToGenerator={handleNavigateToGenerator}
          onNavigateToGuide={handleNavigateToGuide}
          onNavigateToRoadmap={handleNavigateToRoadmap}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />} />
      </Routes>
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
        {showSplash ? (
          <SplashScreen />
        ) : (
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        )}
      </ThemeProvider>
    </DarkModeProvider>
  );
}

export default App
