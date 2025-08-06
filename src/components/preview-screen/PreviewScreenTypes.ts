import { ThemeConfig, ThemeGeneratorSettings } from '../../types/theme'

export type PreviewMode = 'light' | 'lightMediumContrast' | 'lightHighContrast' | 'dark' | 'darkMediumContrast' | 'darkHighContrast'

export interface PreviewScreenProps {
  themeConfig: ThemeConfig
  settings?: ThemeGeneratorSettings | null
  onBack: () => void
  darkMode: boolean
}

export interface PreviewWidgetProps {
  title: string
  children: React.ReactNode
  previewMode: PreviewMode
  themeColors: any
}

export interface WidgetPreviewProps {
  currentColors: any
  previewMode: PreviewMode
}

export interface WidgetPreviewsProps {
  currentColors: any
  previewMode: PreviewMode
  darkMode: boolean
}

export interface PreviewContainerProps extends WidgetPreviewsProps {
}

export interface ColorPaletteProps {
  currentColors: any
  darkMode: boolean
  onColorChange?: (colorName: string, newColor: string) => void
  isEditable?: boolean
}

export interface PreviewHeaderProps {
  darkMode: boolean
  previewMode: PreviewMode
  setPreviewMode: (mode: PreviewMode) => void
  onBack: () => void
  onDownload: () => void
  isDownloading: boolean
  settings?: ThemeGeneratorSettings | null
}
