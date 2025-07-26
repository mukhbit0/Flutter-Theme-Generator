import { useState } from 'react'
import { ThemeConfig, ThemeGeneratorSettings } from '../types/theme'
import { generateFlutterTheme } from '../utils/FlutterThemeGenerator'
import { extractColorsFromImage } from '../utils/ColorExtractor.ts'
import {
  BasicSettingsSection,
  LogoUploadSection,
  BaseColorsSection,
  CustomColorsSection,
  GenerationOptionsSection,
  PreviewPanel
} from './theme-generator'

interface ThemeGeneratorComponentProps {
  onBack: () => void
  onPreview: (config: ThemeConfig) => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function ThemeGeneratorComponent({ onBack, onPreview, darkMode, onToggleDarkMode }: ThemeGeneratorComponentProps) {
  const [settings, setSettings] = useState<ThemeGeneratorSettings>({
    themeName: 'AppTheme',
    packageName: 'com.example.myapp',
    customColors: [],
    generateMaterialYou: true,
    includeDarkMode: true,
    includeExtensions: true,
    includeAnimations: false,
    useScreenUtil: false,
    baseColors: {
      primary: '#6366F1',
      secondary: '#EC4899',
      accent: '#10B981'
    }
  })

  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null)

  const handleLogoUpload = async (file: File) => {
    setUploadedLogo(file)
    try {
      const colors = await extractColorsFromImage(file)
      setExtractedColors(colors)
      if (colors.length >= 3) {
        setSettings(prev => ({
          ...prev,
          baseColors: {
            primary: colors[0],
            secondary: colors[1],
            accent: colors[2]
          }
        }))
      }
    } catch (error) {
      console.error('Error extracting colors:', error)
    }
  }

  const handleLogoRemove = () => {
    setUploadedLogo(null)
    setExtractedColors([])
  }

  const handleSettingsChange = (updates: Partial<ThemeGeneratorSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      if (!settings.baseColors) {
        throw new Error('Base colors are required')
      }
      
      const colors = {
        primary: settings.baseColors.primary,
        secondary: settings.baseColors.secondary,
        tertiary: settings.baseColors.accent
      }
      
      const themeConfig = generateFlutterTheme(colors, { useScreenUtil: settings.useScreenUtil })
      onPreview(themeConfig)
    } catch (error) {
      console.error('Error generating theme:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-lg border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Theme Generator
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Configure your Flutter theme settings
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
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
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            <BasicSettingsSection
              settings={settings}
              onSettingsChange={handleSettingsChange}
              darkMode={darkMode}
            />

            <LogoUploadSection
              uploadedLogo={uploadedLogo}
              extractedColors={extractedColors}
              onLogoUpload={handleLogoUpload}
              onLogoRemove={handleLogoRemove}
              darkMode={darkMode}
            />

            <BaseColorsSection
              settings={settings}
              onSettingsChange={handleSettingsChange}
              darkMode={darkMode}
            />

            <CustomColorsSection
              settings={settings}
              onSettingsChange={handleSettingsChange}
              darkMode={darkMode}
            />

            <GenerationOptionsSection
              settings={settings}
              onSettingsChange={handleSettingsChange}
              darkMode={darkMode}
            />
          </div>

          {/* Action Panel */}
          <PreviewPanel
            settings={settings}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  )
}
