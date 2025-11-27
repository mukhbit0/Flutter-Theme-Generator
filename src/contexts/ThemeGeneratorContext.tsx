import { createContext, useContext, ReactNode } from 'react'
import { useThemeGenerator, UseThemeGeneratorReturn, ThemeGeneratorState } from '../hooks/useThemeGenerator'

// Create context with undefined default
const ThemeGeneratorContext = createContext<UseThemeGeneratorReturn | undefined>(undefined)

// Provider props
interface ThemeGeneratorProviderProps {
  children: ReactNode
  initialState?: Partial<ThemeGeneratorState>
}

// Provider component
export function ThemeGeneratorProvider({ children, initialState }: ThemeGeneratorProviderProps) {
  const themeGenerator = useThemeGenerator(initialState)

  return (
    <ThemeGeneratorContext.Provider value={themeGenerator}>
      {children}
    </ThemeGeneratorContext.Provider>
  )
}

// Hook to consume context
export function useThemeGeneratorContext(): UseThemeGeneratorReturn {
  const context = useContext(ThemeGeneratorContext)
  
  if (context === undefined) {
    throw new Error('useThemeGeneratorContext must be used within a ThemeGeneratorProvider')
  }
  
  return context
}

// Re-export for convenience
export { ThemeGeneratorContext }
export type { UseThemeGeneratorReturn, ThemeGeneratorState }
