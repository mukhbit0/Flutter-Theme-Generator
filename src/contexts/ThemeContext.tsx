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
      onPrimary: '#FFFFFF',
      primaryContainer: '#EADDFF',
      onPrimaryContainer: '#21005D',
      secondary: '#03DAC6',
      onSecondary: '#000000',
      secondaryContainer: '#CCFFF3',
      onSecondaryContainer: '#002114',
      tertiary: '#FF6F00',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#FFCC02',
      onTertiaryContainer: '#261A00',
      error: '#B00020',
      onError: '#FFFFFF',
      errorContainer: '#FFDAD6',
      onErrorContainer: '#410002',
      surface: '#FFFFFF',
      onSurface: '#000000',
      onSurfaceVariant: '#49454F',
      surfaceDim: '#DDD8E1',
      surfaceBright: '#FFFFFF',
      surfaceContainerLowest: '#FFFFFF',
      surfaceContainerLow: '#F7F2FA',
      surfaceContainer: '#F1ECF4',
      surfaceContainerHigh: '#ECE6F0',
      surfaceContainerHighest: '#E6E0E9',
      background: '#FFFFFF',
      onBackground: '#000000',
      outline: '#79747E',
      outlineVariant: '#CAC4D0',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#313033',
      inverseOnSurface: '#F4EFF4',
      inversePrimary: '#D0BCFF',
      primaryFixed: '#EADDFF',
      onPrimaryFixed: '#21005D',
      primaryFixedDim: '#D0BCFF',
      onPrimaryFixedVariant: '#4F378B',
      secondaryFixed: '#CCFFF3',
      onSecondaryFixed: '#002114',
      secondaryFixedDim: '#B0F3E6',
      onSecondaryFixedVariant: '#00513C',
      tertiaryFixed: '#FFCC02',
      onTertiaryFixed: '#261A00',
      tertiaryFixedDim: '#FFCC02',
      onTertiaryFixedVariant: '#BF4F00',
      surfaceTint: '#6200EA',
      success: '#4CAF50',
      warning: '#FF9800',
      info: '#2196F3'
    },
    dark: {
      primary: '#D0BCFF',
      onPrimary: '#381E72',
      primaryContainer: '#4F378B',
      onPrimaryContainer: '#EADDFF',
      secondary: '#B0F3E6',
      onSecondary: '#00513C',
      secondaryContainer: '#00513C',
      onSecondaryContainer: '#CCFFF3',
      tertiary: '#FFCC02',
      onTertiary: '#BF4F00',
      tertiaryContainer: '#BF4F00',
      onTertiaryContainer: '#FFCC02',
      error: '#FFB4AB',
      onError: '#690005',
      errorContainer: '#93000A',
      onErrorContainer: '#FFDAD6',
      surface: '#10131C',
      onSurface: '#E6E0E9',
      onSurfaceVariant: '#CAC4D0',
      surfaceDim: '#10131C',
      surfaceBright: '#362F42',
      surfaceContainerLowest: '#0B0E17',
      surfaceContainerLow: '#1D1B20',
      surfaceContainer: '#211F26',
      surfaceContainerHigh: '#2B2930',
      surfaceContainerHighest: '#36343B',
      background: '#10131C',
      onBackground: '#E6E0E9',
      outline: '#938F99',
      outlineVariant: '#49454F',
      shadow: '#000000',
      scrim: '#000000',
      inverseSurface: '#E6E0E9',
      inverseOnSurface: '#313033',
      inversePrimary: '#6750A4',
      primaryFixed: '#EADDFF',
      onPrimaryFixed: '#21005D',
      primaryFixedDim: '#D0BCFF',
      onPrimaryFixedVariant: '#4F378B',
      secondaryFixed: '#CCFFF3',
      onSecondaryFixed: '#002114',
      secondaryFixedDim: '#B0F3E6',
      onSecondaryFixedVariant: '#00513C',
      tertiaryFixed: '#FFCC02',
      onTertiaryFixed: '#261A00',
      tertiaryFixedDim: '#FFCC02',
      onTertiaryFixedVariant: '#BF4F00',
      surfaceTint: '#D0BCFF',
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
