import { ThemeConfig, ThemeGeneratorSettings, ThemeColors, PreviewMode } from '../types/theme'

// Default generator settings
export const defaultGeneratorSettings: ThemeGeneratorSettings = {
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
}

// State interface
export interface ThemeGeneratorState {
  // Core theme state
  themeConfig: ThemeConfig | null
  themeSettings: ThemeGeneratorSettings | null
  generatorSettings: ThemeGeneratorSettings
  
  // Logo & color extraction
  uploadedLogo: File | null
  extractedColors: string[]
  
  // Preview state
  previewMode: PreviewMode
  modifiedThemeConfig: ThemeConfig | null
  
  // Navigation state
  returnRoute: string
  
  // UI state
  isGenerating: boolean
  isDownloading: boolean
}

// Initial state
export const initialThemeGeneratorState: ThemeGeneratorState = {
  themeConfig: null,
  themeSettings: null,
  generatorSettings: defaultGeneratorSettings,
  uploadedLogo: null,
  extractedColors: [],
  previewMode: 'light',
  modifiedThemeConfig: null,
  returnRoute: '',
  isGenerating: false,
  isDownloading: false
}

// Action types
export type ThemeGeneratorAction =
  // Theme config actions
  | { type: 'SET_THEME_CONFIG'; payload: ThemeConfig | null }
  | { type: 'SET_THEME_SETTINGS'; payload: ThemeGeneratorSettings | null }
  | { type: 'SET_GENERATOR_SETTINGS'; payload: ThemeGeneratorSettings }
  | { type: 'UPDATE_GENERATOR_SETTINGS'; payload: Partial<ThemeGeneratorSettings> }
  
  // Color actions
  | { type: 'UPDATE_COLOR'; payload: { mode: keyof ThemeConfig['colors']; colorName: keyof ThemeColors; color: string } }
  | { type: 'SET_BASE_COLORS'; payload: { primary: string; secondary: string; accent: string } }
  | { type: 'SET_EXTRACTED_COLORS'; payload: string[] }
  
  // Logo actions
  | { type: 'SET_UPLOADED_LOGO'; payload: File | null }
  | { type: 'CLEAR_LOGO' }
  
  // Preview actions
  | { type: 'SET_PREVIEW_MODE'; payload: PreviewMode }
  | { type: 'SET_MODIFIED_THEME_CONFIG'; payload: ThemeConfig | null }
  | { type: 'SYNC_MODIFIED_CONFIG' }
  
  // Navigation actions
  | { type: 'SET_RETURN_ROUTE'; payload: string }
  
  // UI state actions
  | { type: 'SET_IS_GENERATING'; payload: boolean }
  | { type: 'SET_IS_DOWNLOADING'; payload: boolean }
  
  // Batch/Reset actions
  | { type: 'RESET_THEME' }
  | { type: 'RESET_GENERATOR' }
  | { type: 'LOAD_SHARED_THEME'; payload: { themeConfig: ThemeConfig; returnRoute?: string } }

// Reducer function
export function themeGeneratorReducer(
  state: ThemeGeneratorState,
  action: ThemeGeneratorAction
): ThemeGeneratorState {
  switch (action.type) {
    // Theme config actions
    case 'SET_THEME_CONFIG':
      return {
        ...state,
        themeConfig: action.payload,
        modifiedThemeConfig: action.payload
      }

    case 'SET_THEME_SETTINGS':
      return {
        ...state,
        themeSettings: action.payload
      }

    case 'SET_GENERATOR_SETTINGS':
      return {
        ...state,
        generatorSettings: action.payload
      }

    case 'UPDATE_GENERATOR_SETTINGS':
      return {
        ...state,
        generatorSettings: {
          ...state.generatorSettings,
          ...action.payload
        }
      }

    // Color actions
    case 'UPDATE_COLOR': {
      if (!state.modifiedThemeConfig) return state
      
      const { mode, colorName, color } = action.payload
      const currentModeColors = state.modifiedThemeConfig.colors[mode]
      
      if (!currentModeColors) return state
      
      return {
        ...state,
        modifiedThemeConfig: {
          ...state.modifiedThemeConfig,
          colors: {
            ...state.modifiedThemeConfig.colors,
            [mode]: {
              ...currentModeColors,
              [colorName]: color
            }
          }
        }
      }
    }

    case 'SET_BASE_COLORS':
      return {
        ...state,
        generatorSettings: {
          ...state.generatorSettings,
          baseColors: action.payload
        }
      }

    case 'SET_EXTRACTED_COLORS':
      return {
        ...state,
        extractedColors: action.payload
      }

    // Logo actions
    case 'SET_UPLOADED_LOGO':
      return {
        ...state,
        uploadedLogo: action.payload
      }

    case 'CLEAR_LOGO':
      return {
        ...state,
        uploadedLogo: null,
        extractedColors: []
      }

    // Preview actions
    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        previewMode: action.payload
      }

    case 'SET_MODIFIED_THEME_CONFIG':
      return {
        ...state,
        modifiedThemeConfig: action.payload
      }

    case 'SYNC_MODIFIED_CONFIG':
      return {
        ...state,
        modifiedThemeConfig: state.themeConfig
      }

    // Navigation actions
    case 'SET_RETURN_ROUTE':
      return {
        ...state,
        returnRoute: action.payload
      }

    // UI state actions
    case 'SET_IS_GENERATING':
      return {
        ...state,
        isGenerating: action.payload
      }

    case 'SET_IS_DOWNLOADING':
      return {
        ...state,
        isDownloading: action.payload
      }

    // Batch/Reset actions
    case 'RESET_THEME':
      return {
        ...state,
        themeConfig: null,
        themeSettings: null,
        modifiedThemeConfig: null,
        previewMode: 'light'
      }

    case 'RESET_GENERATOR':
      return {
        ...state,
        generatorSettings: defaultGeneratorSettings,
        uploadedLogo: null,
        extractedColors: []
      }

    case 'LOAD_SHARED_THEME':
      return {
        ...state,
        themeConfig: action.payload.themeConfig,
        modifiedThemeConfig: action.payload.themeConfig,
        returnRoute: action.payload.returnRoute || ''
      }

    default:
      return state
  }
}
