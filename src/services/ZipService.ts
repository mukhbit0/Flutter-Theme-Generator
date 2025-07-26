import JSZip from 'jszip'
import { saveAs } from 'file-saver'

/**
 * Service for creating and downloading ZIP files
 */
export class ZipService {
  private zip: JSZip

  constructor() {
    this.zip = new JSZip()
  }

  /**
   * Add a file to the ZIP archive
   * @param filename - Name of the file
   * @param content - File content as string
   */
  addFile(filename: string, content: string): void {
    this.zip.file(filename, content)
  }

  /**
   * Add multiple files to the ZIP archive
   * @param files - Object with filename as key and content as value
   */
  addFiles(files: Record<string, string>): void {
    Object.entries(files).forEach(([filename, content]) => {
      this.addFile(filename, content)
    })
  }

  /**
   * Generate and download the ZIP file
   * @param filename - Name of the ZIP file to download
   */
  async download(filename: string = 'flutter_theme.zip'): Promise<void> {
    try {
      const blob = await this.zip.generateAsync({ type: 'blob' })
      saveAs(blob, filename)
    } catch (error) {
      console.error('Error generating ZIP file:', error)
      throw new Error('Failed to generate ZIP file')
    }
  }

  /**
   * Clear all files from the ZIP archive
   */
  clear(): void {
    this.zip = new JSZip()
  }

  /**
   * Get the number of files in the ZIP archive
   */
  getFileCount(): number {
    return Object.keys(this.zip.files).length
  }

  /**
   * Check if the ZIP archive is empty
   */
  isEmpty(): boolean {
    return this.getFileCount() === 0
  }
}
