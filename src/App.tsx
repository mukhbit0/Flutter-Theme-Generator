import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import HomePage from './components/HomePage'
import { ThemeConfig, ThemeGeneratorSettings } from './types/theme'
import { ThemeProvider } from './contexts/ThemeContext'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
import { ThemeGeneratorProvider, useThemeGeneratorContext } from './contexts/ThemeGeneratorContext'
import { sharingService } from './services/SharingService'
import { AuthProvider } from './contexts/AuthContext';

// Lazy-loaded components for code splitting
const ThemeGeneratorComponent = lazy(() => import('./components/ThemeGeneratorComponent'))
const GuideScreen = lazy(() => import('./components/GuideScreen'))
const RoadmapScreen = lazy(() => import('./components/RoadmapScreen'))
const PreviewScreen = lazy(() => import('./components/PreviewScreen').then(m => ({ default: m.PreviewScreen })))
const SharedThemeViewer = lazy(() => import('./components/SharedThemeViewer'))
const ThemeImplementationScreen = lazy(() => import('./components/theme-implementation/ThemeImplementationScreen'))
const ThemeValidationScreen = lazy(() => import('./components/validation/ThemeValidationScreen'))
const LoginScreen = lazy(() => import('./components/auth/LoginScreen').then(m => ({ default: m.LoginScreen })))
const SignupScreen = lazy(() => import('./components/auth/SignupScreen').then(m => ({ default: m.SignupScreen })))
const UserProfile = lazy(() => import('./components/auth/UserProfile').then(m => ({ default: m.UserProfile })))
const ThemeGallery = lazy(() => import('./components/gallery/ThemeGallery'))

// Global Components
import { SuggestionBox } from './components/SuggestionBox';
import { WorldChat } from './components/WorldChat';
import { AdminSuggestions } from './components/AdminSuggestions';
import { FeedbackBoard } from './components/FeedbackBoard';


// Loading fallback component
function LoadingFallback({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-blue-50'
      }`}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
      </div>
    </div>
  )
}

function AppContent() {
  // Use the consolidated theme generator context
  const {
    state: themeState,
    setThemeConfig,
    setThemeSettings,
    setGeneratorSettings,
    setUploadedLogo,
    setExtractedColors,
    setReturnRoute,
    loadSharedTheme,
    resetTheme
  } = useThemeGeneratorContext()

  const { darkMode, toggleDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()

  // ── Agent: seo-specialist ── Per-page dynamic titles & descriptions
  useEffect(() => {
    const pageMeta: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'Flutter Theme Generator - Create Beautiful Material 3 Themes | Free Online Tool',
        description: 'Free online Flutter theme generator with Material 3 support. Extract colors from logos, customize light & dark modes, validate WCAG accessibility, preview widgets, and export production-ready Dart code.',
      },
      '/generator': {
        title: 'Generate Flutter Theme - Material 3 Color Scheme Builder | Free Tool',
        description: 'Build a complete Flutter Material 3 color scheme in minutes. Upload your logo for automatic color extraction, choose contrast variants, and export production-ready ThemeData Dart code.',
      },
      '/preview': {
        title: 'Preview Flutter Theme - Live Widget Preview | Flutter Theme Generator',
        description: 'Preview your Flutter theme applied to real widgets: buttons, cards, text fields, navigation bars, dialogs, and more. Switch between light/dark modes and all 6 contrast variants in real-time.',
      },
      '/gallery': {
        title: 'Flutter Theme Gallery - Browse & Download Community Themes | Free',
        description: 'Explore hundreds of community-created Flutter Material 3 themes. Browse by color, style, or popularity. Download and use any theme in your Flutter project instantly.',
      },
      '/guide': {
        title: 'Flutter Theme Guide - Documentation & Tutorials | Flutter Theme Generator',
        description: 'Complete guide to using the Flutter Theme Generator. Learn how to create Material 3 themes, extract colors from logos, validate WCAG accessibility, and integrate themes into your Flutter app.',
      },
      '/roadmap': {
        title: 'Flutter Theme Generator Roadmap - Upcoming Features & Updates',
        description: 'See what features are coming to Flutter Theme Generator. Vote on features, track progress, and stay up to date with the latest Material 3 theming tools for Flutter developers.',
      },
      '/feedback': {
        title: 'Community Feedback - Flutter Theme Generator | Share Your Ideas',
        description: 'Share feedback, request features, and vote on improvements for Flutter Theme Generator. Join the community of Flutter developers building better apps with Material 3 themes.',
      },
      '/shared': {
        title: 'Shared Flutter Theme - View & Download | Flutter Theme Generator',
        description: 'View this community-shared Flutter Material 3 theme. Download the Dart code, preview on widgets, and use it in your Flutter project for free.',
      },
      '/implementation': {
        title: 'Flutter Theme Implementation - Code & Mockups | Flutter Theme Generator',
        description: 'View generated Flutter theme implementation code with mockups. Copy production-ready ThemeData, ColorScheme, and TextTheme Dart code directly into your Flutter project.',
      },
      '/validation': {
        title: 'Flutter Theme Validation - WCAG Accessibility Checker | Flutter Theme Generator',
        description: 'Validate your Flutter theme for WCAG 2.1 accessibility compliance. Check AA and AAA contrast ratios for all color combinations and get actionable fix suggestions.',
      },
    }

    // Match exact path or prefix (e.g. /shared/:id)
    const path = location.pathname
    const meta = pageMeta[path] ?? Object.entries(pageMeta).find(([k]) => path.startsWith(k) && k !== '/')?.[1] ?? pageMeta['/']

    document.title = meta.title
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) descEl.setAttribute('content', meta.description)
    const ogTitleEl = document.querySelector('meta[property="og:title"]')
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title)
    const ogDescEl = document.querySelector('meta[property="og:description"]')
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description)
    const twTitleEl = document.querySelector('meta[name="twitter:title"]')
    if (twTitleEl) twTitleEl.setAttribute('content', meta.title)
    const twDescEl = document.querySelector('meta[name="twitter:description"]')
    if (twDescEl) twDescEl.setAttribute('content', meta.description)
  }, [location.pathname])

  // PreviewRoute component to handle editShared parameters
  const PreviewRoute = () => {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const [localThemeConfig, setLocalThemeConfig] = useState<ThemeConfig | null>(themeState.themeConfig)
    const [localThemeSettings, setLocalThemeSettings] = useState<ThemeGeneratorSettings | null>(themeState.themeSettings)
    const [isLoading, setIsLoading] = useState(false)
    const [hasEditShared, setHasEditShared] = useState(false)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
      const editSharedId = searchParams.get('editShared')
      const returnPath = searchParams.get('returnTo')

      // Check for state passed from UserProfile or other components
      if (location.state && (location.state as any).themeConfig) {
        const stateConfig = (location.state as any).themeConfig
        const stateSettings = (location.state as any).settings
        console.log('Loading theme from location state:', stateConfig)
        setLocalThemeConfig(stateConfig)
        if (stateSettings) {
          setLocalThemeSettings(stateSettings)
        }
        setShowContent(true)
        return
      }

      if (editSharedId) {
        setHasEditShared(true)
        if (!localThemeConfig) {
          setIsLoading(true)
          const loadSharedThemeAsync = async () => {
            try {
              const sharedTheme = await sharingService.getSharedTheme(editSharedId)
              if (sharedTheme) {
                console.log('Loading shared theme for editing in preview:', sharedTheme.name)
                setLocalThemeConfig(sharedTheme.themeConfig)
                // Update global state via context
                loadSharedTheme(sharedTheme.themeConfig, returnPath || `/shared/${editSharedId}`)

                // Add a small delay for smooth transition
                setTimeout(() => {
                  setShowContent(true)
                }, 300)
              }
            } catch (error) {
              console.error('Failed to load shared theme for editing:', error)
              setShowContent(true)
            } finally {
              setIsLoading(false)
            }
          }
          loadSharedThemeAsync()
        } else {
          // If theme already exists, show immediately with fade
          setTimeout(() => setShowContent(true), 100)
        }
      } else {
        // For normal preview flow, always sync with global themeConfig
        if (themeState.themeConfig) {
          setLocalThemeConfig(themeState.themeConfig)
          setLocalThemeSettings(themeState.themeSettings)
        }
        setShowContent(true)
      }
    }, [searchParams, themeState.themeConfig, themeState.themeSettings, location.state])

    // Enhanced loading screen with better animations
    if (hasEditShared && isLoading) {
      return (
        <div className={`min-h-screen flex items-center justify-center transition-all-smooth animate-fadeInFast ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
          }`}>
          <div className="text-center animate-fadeIn">
            {/* Animated logo/icon */}
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading text with animation */}
            <h2 className={`text-2xl font-bold mb-2 animate-pulse ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Loading Theme
            </h2>
            <p className={`text-sm animate-bounce ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Preparing your beautiful theme preview...
            </p>

            {/* Progress dots */}
            <div className="flex justify-center space-x-1 mt-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )
    }

    // Show preview with fade-in transition
    if (localThemeConfig) {
      return (
        <div className={`transition-opacity-smooth transition-all-smooth ${showContent ? 'opacity-100 translate-y-0 animate-fadeInSlide' : 'opacity-0 translate-y-4'
          }`}>
          <PreviewScreen
            themeConfig={localThemeConfig}
            settings={localThemeSettings || undefined}
            onBack={handleBackToGenerator}
            darkMode={darkMode}
            onThemeUpdate={(updatedConfig: ThemeConfig) => {
              // Sync preview color edits back to global state
              setLocalThemeConfig(updatedConfig)
              setThemeConfig(updatedConfig)
            }}
          />
        </div>
      )
    }

    // Only show homepage if we're not editing a shared theme
    if (!hasEditShared) {
      return (
        <div className={`transition-all duration-500 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          <HomePage
            onNavigateToGenerator={handleNavigateToGenerator}
            onNavigateToGuide={handleNavigateToGuide}
            onNavigateToRoadmap={handleNavigateToRoadmap}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        </div>
      )
    }

    // Fallback loading for edit mode
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ease-out ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}>
        <div className="text-center animate-fadeIn">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Loading Theme...
          </h2>
        </div>
      </div>
    )
  }

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
    console.log('[App] Navigating to preview with config primary:', config.colors.light.primary);
    setThemeConfig(config)
    setThemeSettings(settings || null)
    navigate('/preview')
  }

  const handleBackToHome = () => {
    navigate('/')
    resetTheme()
    // Note: We're keeping generatorSettings, uploadedLogo, and extractedColors to persist user work
  }

  const handleBackToGenerator = () => {
    // Check if we should return to a shared theme instead
    console.log('handleBackToGenerator called, returnRoute:', themeState.returnRoute)
    if (themeState.returnRoute && themeState.returnRoute !== '' && themeState.returnRoute !== '/generator') {
      console.log('Navigating to return route:', themeState.returnRoute)
      navigate(themeState.returnRoute)
      setReturnRoute('') // Reset after using
    } else {
      console.log('Navigating to generator (no return route)')
      navigate('/generator')
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <Suspense fallback={<LoadingFallback darkMode={darkMode} />}>
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
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/feedback" element={<FeedbackBoard />} />
          <Route path="/admin/suggestions" element={<AdminSuggestions />} />

          <Route
            path="/generator"
            element={
              <ThemeGeneratorComponent
                onBack={handleBackToHome}
                onPreview={handleNavigateToPreview}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
                settings={themeState.generatorSettings}
                onSettingsChange={setGeneratorSettings}
                uploadedLogo={themeState.uploadedLogo}
                setUploadedLogo={setUploadedLogo}
                extractedColors={themeState.extractedColors}
                setExtractedColors={setExtractedColors}
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
            path="/gallery"
            element={<ThemeGallery />}
          />

          <Route
            path="/preview"
            element={<PreviewRoute />}
          />

          {/* Shared Theme Viewer */}
          <Route
            path="/shared/:shareId"
            element={<SharedThemeViewer />}
          />

          {/* Theme Implementation / Mockups Route */}
          <Route
            path="/implementation"
            element={
              themeState.themeConfig ? (
                <ThemeImplementationScreen
                  themeConfig={themeState.themeConfig}
                  settings={themeState.themeSettings}
                  onBack={() => navigate('/preview')}
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

          {/* Theme Validation Route */}
          <Route
            path="/validation"
            element={
              themeState.themeConfig ? (
                <ThemeValidationScreen
                  theme={themeState.themeConfig}
                  darkMode={darkMode}
                  onBack={() => navigate('/preview')}
                  onUpdateTheme={(newTheme: ThemeConfig) => setThemeConfig(newTheme)}
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
      </Suspense>

      {/* Global Floating Components */}
      <SuggestionBox />
      <WorldChat />
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
      <AuthProvider>
        <ThemeProvider>
          <ThemeGeneratorProvider>
            {showSplash ? (
              <SplashScreen />
            ) : (
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            )}
          </ThemeGeneratorProvider>
        </ThemeProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App
