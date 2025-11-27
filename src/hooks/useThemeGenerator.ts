import { useReducer, useCallback, useMemo } from 'react'
import {
  themeGeneratorReducer,
  initialThemeGeneratorState,
  ThemeGeneratorState,
  defaultGeneratorSettings
} from './themeGeneratorReducer'
import { ThemeConfig, ThemeGeneratorSettings, ThemeColors, PreviewMode } from '../types/theme'

export interface UseThemeGeneratorReturn {
  // State
  state: ThemeGeneratorState
  
  // Theme config actions
  setThemeConfig: (config: ThemeConfig | null) => void
  setThemeSettings: (settings: ThemeGeneratorSettings | null) => void
  setGeneratorSettings: (settings: ThemeGeneratorSettings) => void
  updateGeneratorSettings: (updates: Partial<ThemeGeneratorSettings>) => void
  
  // Color actions
  updateColor: (mode: keyof ThemeConfig['colors'], colorName: keyof ThemeColors, color: string) => void
  setBaseColors: (primary: string, secondary: string, accent: string) => void
  setExtractedColors: (colors: string[]) => void
  
  // Logo actions
  setUploadedLogo: (logo: File | null) => void
  clearLogo: () => void
  
  // Preview actions
  setPreviewMode: (mode: PreviewMode) => void
  setModifiedThemeConfig: (config: ThemeConfig | null) => void
  syncModifiedConfig: () => void
  
  // Navigation actions
  setReturnRoute: (route: string) => void
  
  // UI state actions
  setIsGenerating: (value: boolean) => void
  setIsDownloading: (value: boolean) => void
  
  // Batch/Reset actions
  resetTheme: () => void
  resetGenerator: () => void
  loadSharedTheme: (themeConfig: ThemeConfig, returnRoute?: string) => void
  
  // Computed values
  currentColors: ThemeColors | null
  hasValidTheme: boolean
  hasBaseColors: boolean
}

export function useThemeGenerator(initialState?: Partial<ThemeGeneratorState>): UseThemeGeneratorReturn {
  const [state, dispatch] = useReducer(
    themeGeneratorReducer,
    {
      ...initialThemeGeneratorState,
      ...initialState
    }
  )

  // Theme config actions
  const setThemeConfig = useCallback((config: ThemeConfig | null) => {
    dispatch({ type: 'SET_THEME_CONFIG', payload: config })
  }, [])

  const setThemeSettings = useCallback((settings: ThemeGeneratorSettings | null) => {
    dispatch({ type: 'SET_THEME_SETTINGS', payload: settings })
  }, [])

  const setGeneratorSettings = useCallback((settings: ThemeGeneratorSettings) => {
    dispatch({ type: 'SET_GENERATOR_SETTINGS', payload: settings })
  }, [])

  const updateGeneratorSettings = useCallback((updates: Partial<ThemeGeneratorSettings>) => {
    dispatch({ type: 'UPDATE_GENERATOR_SETTINGS', payload: updates })
  }, [])

  // Color actions
  const updateColor = useCallback((
    mode: keyof ThemeConfig['colors'],
    colorName: keyof ThemeColors,
    color: string
  ) => {
    dispatch({ type: 'UPDATE_COLOR', payload: { mode, colorName, color } })
  }, [])

  const setBaseColors = useCallback((primary: string, secondary: string, accent: string) => {
    dispatch({ type: 'SET_BASE_COLORS', payload: { primary, secondary, accent } })
  }, [])

  const setExtractedColors = useCallback((colors: string[]) => {
    dispatch({ type: 'SET_EXTRACTED_COLORS', payload: colors })
  }, [])

  // Logo actions
  const setUploadedLogo = useCallback((logo: File | null) => {
    dispatch({ type: 'SET_UPLOADED_LOGO', payload: logo })
  }, [])

  const clearLogo = useCallback(() => {
    dispatch({ type: 'CLEAR_LOGO' })
  }, [])

  // Preview actions
  const setPreviewMode = useCallback((mode: PreviewMode) => {
    dispatch({ type: 'SET_PREVIEW_MODE', payload: mode })
  }, [])

  const setModifiedThemeConfig = useCallback((config: ThemeConfig | null) => {
    dispatch({ type: 'SET_MODIFIED_THEME_CONFIG', payload: config })
  }, [])

  const syncModifiedConfig = useCallback(() => {
    dispatch({ type: 'SYNC_MODIFIED_CONFIG' })
  }, [])

  // Navigation actions
  const setReturnRoute = useCallback((route: string) => {
    dispatch({ type: 'SET_RETURN_ROUTE', payload: route })
  }, [])

  // UI state actions
  const setIsGenerating = useCallback((value: boolean) => {
    dispatch({ type: 'SET_IS_GENERATING', payload: value })
  }, [])

  const setIsDownloading = useCallback((value: boolean) => {
    dispatch({ type: 'SET_IS_DOWNLOADING', payload: value })
  }, [])

  // Batch/Reset actions
  const resetTheme = useCallback(() => {
    dispatch({ type: 'RESET_THEME' })
  }, [])

  const resetGenerator = useCallback(() => {
    dispatch({ type: 'RESET_GENERATOR' })
  }, [])

  const loadSharedTheme = useCallback((themeConfig: ThemeConfig, returnRoute?: string) => {
    dispatch({ type: 'LOAD_SHARED_THEME', payload: { themeConfig, returnRoute } })
  }, [])

  // Computed values - destructure to avoid the entire state dependency
  const { modifiedThemeConfig, previewMode, themeConfig: currentThemeConfig, generatorSettings } = state

  const currentColors = useMemo(() => {
    if (!modifiedThemeConfig) return null
    
    switch (previewMode) {
      case 'light':
        return modifiedThemeConfig.colors.light
      case 'lightMediumContrast':
        return modifiedThemeConfig.colors.lightMediumContrast || modifiedThemeConfig.colors.light
      case 'lightHighContrast':
        return modifiedThemeConfig.colors.lightHighContrast || modifiedThemeConfig.colors.light
      case 'dark':
        return modifiedThemeConfig.colors.dark
      case 'darkMediumContrast':
        return modifiedThemeConfig.colors.darkMediumContrast || modifiedThemeConfig.colors.dark
      case 'darkHighContrast':
        return modifiedThemeConfig.colors.darkHighContrast || modifiedThemeConfig.colors.dark
      default:
        return modifiedThemeConfig.colors.light
    }
  }, [modifiedThemeConfig, previewMode])

  const hasValidTheme = useMemo(() => {
    return currentThemeConfig !== null
  }, [currentThemeConfig])

  const hasBaseColors = useMemo(() => {
    return generatorSettings.baseColors !== undefined
  }, [generatorSettings.baseColors])

  return {
    state,
    // Theme config actions
    setThemeConfig,
    setThemeSettings,
    setGeneratorSettings,
    updateGeneratorSettings,
    // Color actions
    updateColor,
    setBaseColors,
    setExtractedColors,
    // Logo actions
    setUploadedLogo,
    clearLogo,
    // Preview actions
    setPreviewMode,
    setModifiedThemeConfig,
    syncModifiedConfig,
    // Navigation actions
    setReturnRoute,
    // UI state actions
    setIsGenerating,
    setIsDownloading,
    // Batch/Reset actions
    resetTheme,
    resetGenerator,
    loadSharedTheme,
    // Computed values
    currentColors,
    hasValidTheme,
    hasBaseColors
  }
}

// Re-export types and defaults
export { defaultGeneratorSettings }
export type { ThemeGeneratorState }
