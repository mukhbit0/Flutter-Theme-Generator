import { ThemeConfig } from '../../types/theme'

export interface PreviewScreenProps {
  themeConfig: ThemeConfig
  onBack: () => void
  darkMode: boolean
}

export interface PreviewWidgetProps {
  title: string
  children: React.ReactNode
  previewMode: 'light' | 'dark'
  themeColors: any
}

export interface ColorPaletteProps {
  currentColors: any
  darkMode: boolean
  onColorChange?: (colorName: string, newColor: string) => void
  isEditable?: boolean
}

export interface PreviewHeaderProps {
  darkMode: boolean
  previewMode: 'light' | 'dark'
  setPreviewMode: (mode: 'light' | 'dark') => void
  onBack: () => void
  onDownload: () => void
  isDownloading: boolean
}

export interface WidgetPreviewsProps {
  currentColors: any
  previewMode: 'light' | 'dark'
}
