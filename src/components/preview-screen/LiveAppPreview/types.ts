import { ThemeColors } from '../../../types/theme'

export type PreviewMode = 'widgets' | 'app'

export type DeviceType = 'phone' | 'tablet' | 'desktop'

export interface AppTemplate {
  id: string
  name: string
  icon: string
  description: string
  category: 'ecommerce' | 'social' | 'business' | 'healthcare' | 'finance'
  component: React.ComponentType<AppTemplateProps>
}

export interface AppTemplateProps {
  theme: ThemeColors
  darkMode: boolean
  onInteraction?: (action: string, data?: any) => void
}

export interface InteractionState {
  buttonPressed: boolean
  formFocused: string | null
  drawerOpen: boolean
  modalOpen: boolean
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
  }>
}

export interface DeviceFrameProps {
  device: string // Device model like 'samsung-s24', 'iphone-15-pro', etc.
  theme: ThemeColors
  darkMode: boolean
  children: React.ReactNode
  className?: string
}

export interface PreviewModeToggleProps {
  mode: PreviewMode
  onChange: (mode: PreviewMode) => void
  theme: ThemeColors
}

export interface LiveAppPreviewProps {
  theme: ThemeColors
  darkMode: boolean
  onInteraction?: (action: string, data?: any) => void
  className?: string
}
