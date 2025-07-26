import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeConfig } from '../types/theme';

interface ThemeContextType {
  themeConfig: ThemeConfig;
  setThemeConfig: (config: ThemeConfig) => void;
  updateColors: (lightColors: any, darkColors: any) => void;
}

const defaultThemeConfig: ThemeConfig = {
  colors: {
    light: {
      primary: '#6200EA',
      primaryVariant: '#3700B3',
      secondary: '#03DAC6',
      secondaryVariant: '#018786',
      background: '#FFFFFF',
      surface: '#FFFFFF',
      error: '#B00020',
      onPrimary: '#FFFFFF',
      onSecondary: '#000000',
      onBackground: '#000000',
      onSurface: '#000000',
      onError: '#FFFFFF',
      outline: '#79747E',
      shadow: '#000000',
      inverseSurface: '#121212',
      inverseOnSurface: '#FFFFFF',
      inversePrimary: '#BB86FC',
      success: '#4CAF50',
      warning: '#FF9800',
      info: '#2196F3'
    },
    dark: {
      primary: '#BB86FC',
      primaryVariant: '#3700B3',
      secondary: '#03DAC6',
      secondaryVariant: '#03DAC6',
      background: '#121212',
      surface: '#121212',
      error: '#CF6679',
      onPrimary: '#000000',
      onSecondary: '#000000',
      onBackground: '#FFFFFF',
      onSurface: '#FFFFFF',
      onError: '#000000',
      outline: '#938F99',
      shadow: '#000000',
      inverseSurface: '#FFFFFF',
      inverseOnSurface: '#000000',
      inversePrimary: '#6200EA',
      success: '#4CAF50',
      warning: '#FF9800',
      info: '#2196F3'
    }
  },
  typography: {
    displayLarge: {
      fontSize: 57,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 64
    },
    displayMedium: {
      fontSize: 45,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 52
    },
    displaySmall: {
      fontSize: 36,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 44
    },
    headlineLarge: {
      fontSize: 32,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 40
    },
    headlineMedium: {
      fontSize: 28,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 36
    },
    headlineSmall: {
      fontSize: 24,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 32
    },
    titleLarge: {
      fontSize: 22,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 28
    },
    titleMedium: {
      fontSize: 16,
      fontWeight: '500',
      letterSpacing: 0.15,
      lineHeight: 24
    },
    titleSmall: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.1,
      lineHeight: 20
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 24
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.25,
      lineHeight: 20
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0.4,
      lineHeight: 16
    },
    labelLarge: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.1,
      lineHeight: 20
    },
    labelMedium: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 0.5,
      lineHeight: 16
    },
    labelSmall: {
      fontSize: 11,
      fontWeight: '500',
      letterSpacing: 0.5,
      lineHeight: 16
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  elevation: {
    level0: 0,
    level1: 1,
    level2: 3,
    level3: 6,
    level4: 8,
    level5: 12
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultThemeConfig);

  const updateColors = (lightColors: any, darkColors: any) => {
    setThemeConfig(prev => ({
      ...prev,
      colors: {
        light: { ...prev.colors.light, ...lightColors },
        dark: { ...prev.colors.dark, ...darkColors }
      }
    }));
  };

  return (
    <ThemeContext.Provider value={{ themeConfig, setThemeConfig, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
