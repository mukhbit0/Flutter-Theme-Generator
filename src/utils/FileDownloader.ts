import { ThemeConfig } from '../types/theme'
import { generateThemeFiles } from '../generators/dart'
import { generateReadmeFile } from '../generators/docs/ReadmeGenerator'
import { ZipService } from '../services/ZipService'

/**
 * Downloads theme files as a ZIP archive
 * @param themeConfig - Theme configuration object
 */
export async function downloadThemeFiles(themeConfig: ThemeConfig): Promise<void> {
  try {
    const zipService = new ZipService()
    
    // Generate all theme files
    const themeFiles = generateThemeFiles(themeConfig)
    const readmeContent = generateReadmeFile()
    
    // Add all files to ZIP
    zipService.addFiles(themeFiles)
    zipService.addFile('README.md', readmeContent)
    
    // Download the ZIP file
    await zipService.download('flutter_theme.zip')
    
    console.log(`Successfully generated ${zipService.getFileCount()} theme files`)
  } catch (error) {
    console.error('Error downloading theme files:', error)
    throw new Error('Failed to download theme files')
  }
}
