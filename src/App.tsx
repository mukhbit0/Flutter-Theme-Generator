import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import HomePage from './components/HomePage'
import { ThemeConfig, ThemeGeneratorSettings } from './types/theme'
import { ThemeProvider } from './contexts/ThemeContext'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
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

// Loading fallback component
function LoadingFallback({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
      </div>
    </div>
  )
}

function AppContent() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null)
  const [themeSettings, setThemeSettings] = useState<ThemeGeneratorSettings | null>(null)
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const [returnRoute, setReturnRoute] = useState<string>('')
  const [generatorSettings, setGeneratorSettings] = useState<ThemeGeneratorSettings>({
    themeName: 'AppTheme',
    packageName: 'com.example.myapp',
    customColors: [],
    generateMaterialYou: true,
    includeExtensions: true,
    includeAnimations: false,
    useScreenUtil: false,
    themeVariants: {
      lightMode: true,
      lightMedium: true,
      lightHigh: true,
      darkMode: true,
      darkMedium: true,
      darkHigh: true
    },
    baseColors: {
      primary: '#6366F1',
      secondary: '#EC4899',
      accent: '#10B981'
    }
  })
  const { darkMode, toggleDarkMode } = useDarkMode()
  const navigate = useNavigate()

  // PreviewRoute component to handle editShared parameters
  const PreviewRoute = () => {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const [localThemeConfig, setLocalThemeConfig] = useState<ThemeConfig | null>(themeConfig)
    const [localThemeSettings, setLocalThemeSettings] = useState<ThemeGeneratorSettings | null>(themeSettings)
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
          const loadSharedTheme = async () => {
            try {
              const sharedTheme = await sharingService.getSharedTheme(editSharedId)
              if (sharedTheme) {
                console.log('Loading shared theme for editing in preview:', sharedTheme.name)
                setLocalThemeConfig(sharedTheme.themeConfig)
                setReturnRoute(returnPath || `/shared/${editSharedId}`)

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
          loadSharedTheme()
        } else {
          // If theme already exists, show immediately with fade
          setTimeout(() => setShowContent(true), 100)
        }
      } else {
        // For normal preview flow, always sync with global themeConfig
        if (themeConfig) {
          setLocalThemeConfig(themeConfig)
          setLocalThemeSettings(themeSettings)
        }
        setShowContent(true)
      }
    }, [searchParams, themeConfig, themeSettings, location.state])

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
    setThemeConfig(null)
    setThemeSettings(null)
    // Note: We're keeping generatorSettings, uploadedLogo, and extractedColors to persist user work
  }

  const handleBackToGenerator = () => {
    // Check if we should return to a shared theme instead
    console.log('handleBackToGenerator called, returnRoute:', returnRoute)
    if (returnRoute && returnRoute !== '' && returnRoute !== '/generator') {
      console.log('Navigating to return route:', returnRoute)
      navigate(returnRoute)
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

          <Route
            path="/generator"
            element={
              <ThemeGeneratorComponent
              onBack={handleBackToHome}
              onPreview={handleNavigateToPreview}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
              settings={generatorSettings}
              onSettingsChange={setGeneratorSettings}
              uploadedLogo={uploadedLogo}
              setUploadedLogo={setUploadedLogo}
              extractedColors={extractedColors}
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
            themeConfig ? (
              <ThemeImplementationScreen
                themeConfig={themeConfig}
                settings={themeSettings}
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
            themeConfig ? (
              <ThemeValidationScreen
                theme={themeConfig}
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
          {showSplash ? (
            <SplashScreen />
          ) : (
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          )}
        </ThemeProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App
