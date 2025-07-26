import { ThemeConfig } from '../../types/theme'
import { generateAppThemeFile } from './AppThemeGenerator'
import { generateConstantsFile } from './ConstantsGenerator'
import { generateExtensionsFile } from './ExtensionsGenerator'

/**
 * Main entry point for generating all Dart theme files
 */
export function generateThemeFiles(config: ThemeConfig): Record<string, string> {
  return {
    'app_theme.dart': generateAppThemeFile(config),
    'app_constants.dart': generateConstantsFile(config),
    'theme_extensions.dart': generateExtensionsFile(config),
  }
}

export { generateAppThemeFile, generateConstantsFile, generateExtensionsFile }
