import { ThemeConfig, ThemeGeneratorSettings } from '../types/theme'
import { generateThemeFiles } from '../generators/dart'
import { generateReadmeFile } from '../generators/docs/ReadmeGenerator'
import { generateMainExample, generateSampleWidgetsExample } from '../generators/examples'
import { ZipService } from '../services/ZipService'
import { ThemeCounterService } from '../services/ThemeCounterService'

/**
 * Downloads theme files as a ZIP archive with complete examples
 * @param themeConfig - Theme configuration object
 * @param settings - Theme generator settings
 */
export async function downloadThemeFiles(themeConfig: ThemeConfig, settings?: ThemeGeneratorSettings): Promise<void> {
  try {
    const zipService = new ZipService()
    
    // Generate all theme files
    const themeFiles = generateThemeFiles(themeConfig)
    const readmeContent = generateReadmeFile()
    
    // Generate example files
    const mainExample = generateMainExample(themeConfig, settings)
    const sampleWidgetsExample = generateSampleWidgetsExample(themeConfig, settings)
    
    // Add all files to ZIP
    zipService.addFiles(themeFiles)
    zipService.addFile('README.md', readmeContent)
    
    // Add example files in example/ directory
    zipService.addFile('example/main.dart', mainExample)
    zipService.addFile('example/sample_widgets.dart', sampleWidgetsExample)
    
    // Download the ZIP file
    await zipService.download('flutter_theme.zip')
    
    // Record theme generation (increment counter)
    try {
      await ThemeCounterService.recordThemeGeneration()
      console.log('Theme generation recorded successfully')
    } catch (counterError) {
      console.warn('Failed to record theme generation:', counterError)
      // Don't fail the download if counter fails
    }
    
    console.log(`Successfully generated ${zipService.getFileCount()} theme files including examples`)
  } catch (error) {
    console.error('Error downloading theme files:', error)
    throw new Error('Failed to download theme files')
  }
}
