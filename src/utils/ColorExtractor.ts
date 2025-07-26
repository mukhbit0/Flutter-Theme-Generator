interface ColorCluster {
  r: number
  g: number
  b: number
  count: number
  dominance: number
}

interface HSLColor {
  h: number
  s: number
  l: number
}

interface LABColor {
  l: number
  a: number
  b: number
}

export async function extractColorsFromImage(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      try {
        // Step 1: Image Preprocessing
        const processedData = preprocessImage(img, canvas, ctx)
        if (!processedData) {
          reject(new Error('Failed to process image'))
          return
        }
        
        // Step 2: Pixel Sampling & Analysis
        const pixels = sampleAndAnalyzePixels(processedData)
        
        // Step 3: K-Means Color Clustering
        const clusters = performKMeansClustering(pixels, 8)
        
        // Step 4: Perceptual Color Scoring
        const scoredColors = scoreColorsPerceptually(clusters)
        
        // Step 5: Smart Color Assignment
        const finalColors = assignSmartColors(scoredColors)
        
        resolve(finalColors)
      } catch (error) {
        reject(error)
      }
    }
    
    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    
    img.src = URL.createObjectURL(file)
  })
}

// Step 1: Image Preprocessing
function preprocessImage(img: HTMLImageElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): ImageData | null {
  if (!ctx) return null
  
  // Resize to 150x150 for consistent processing
  const size = 150
  canvas.width = size
  canvas.height = size
  
  // Apply slight blur to reduce noise
  ctx.filter = 'blur(0.5px)'
  
  // Draw image maintaining aspect ratio
  const aspectRatio = img.width / img.height
  let drawWidth = size
  let drawHeight = size
  
  if (aspectRatio > 1) {
    drawHeight = size / aspectRatio
  } else {
    drawWidth = size * aspectRatio
  }
  
  const offsetX = (size - drawWidth) / 2
  const offsetY = (size - drawHeight) / 2
  
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  
  return ctx.getImageData(0, 0, size, size)
}

// Step 2: Pixel Sampling & Analysis
function sampleAndAnalyzePixels(imageData: ImageData): Array<{r: number, g: number, b: number}> {
  const data = imageData.data
  const pixels: Array<{r: number, g: number, b: number}> = []
  
  // Sample every 5th pixel to reduce computation
  for (let i = 0; i < data.length; i += 20) { // 20 = 5 pixels * 4 bytes per pixel
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    
    // Skip transparent/semi-transparent pixels
    if (a < 128) continue
    
    // Convert to HSL and filter out grays and near-whites
    const hsl = rgbToHsl(r, g, b)
    
    // Filter out low saturation colors (grays) and very light colors
    if (hsl.s < 0.2 || hsl.l > 0.9 || hsl.l < 0.1) continue
    
    pixels.push({ r, g, b })
  }
  
  return pixels
}

// Step 3: K-Means Color Clustering
function performKMeansClustering(pixels: Array<{r: number, g: number, b: number}>, k: number): ColorCluster[] {
  if (pixels.length === 0) return []
  
  // Initialize centroids randomly
  const centroids: Array<{r: number, g: number, b: number}> = []
  for (let i = 0; i < k; i++) {
    const randomPixel = pixels[Math.floor(Math.random() * pixels.length)]
    centroids.push({ ...randomPixel })
  }
  
  let converged = false
  let iterations = 0
  const maxIterations = 20
  
  while (!converged && iterations < maxIterations) {
    const clusters: Array<Array<{r: number, g: number, b: number}>> = Array(k).fill(null).map(() => [])
    
    // Assign pixels to nearest centroids using LAB color space for perceptual accuracy
    pixels.forEach(pixel => {
      let minDistance = Infinity
      let closestCluster = 0
      
      centroids.forEach((centroid, index) => {
        const distance = deltaE(rgbToLab(pixel.r, pixel.g, pixel.b), rgbToLab(centroid.r, centroid.g, centroid.b))
        if (distance < minDistance) {
          minDistance = distance
          closestCluster = index
        }
      })
      
      clusters[closestCluster].push(pixel)
    })
    
    // Update centroids
    const newCentroids: Array<{r: number, g: number, b: number}> = []
    let hasChanged = false
    
    clusters.forEach((cluster, index) => {
      if (cluster.length === 0) {
        newCentroids.push(centroids[index])
        return
      }
      
      const avgR = Math.round(cluster.reduce((sum, p) => sum + p.r, 0) / cluster.length)
      const avgG = Math.round(cluster.reduce((sum, p) => sum + p.g, 0) / cluster.length)
      const avgB = Math.round(cluster.reduce((sum, p) => sum + p.b, 0) / cluster.length)
      
      const newCentroid = { r: avgR, g: avgG, b: avgB }
      newCentroids.push(newCentroid)
      
      if (centroids[index].r !== avgR || centroids[index].g !== avgG || centroids[index].b !== avgB) {
        hasChanged = true
      }
    })
    
    if (!hasChanged) {
      converged = true
    }
    
    centroids.splice(0, centroids.length, ...newCentroids)
    iterations++
  }
  
  // Create final clusters with counts and dominance
  return centroids.map((centroid, index) => {
    const clusterPixels = pixels.filter(pixel => {
      const distances = centroids.map(c => deltaE(rgbToLab(pixel.r, pixel.g, pixel.b), rgbToLab(c.r, c.g, c.b)))
      const minIndex = distances.indexOf(Math.min(...distances))
      return minIndex === index
    })
    
    return {
      r: centroid.r,
      g: centroid.g,
      b: centroid.b,
      count: clusterPixels.length,
      dominance: clusterPixels.length / pixels.length
    }
  }).filter(cluster => cluster.count > 0)
}

// Step 4: Perceptual Color Scoring
function scoreColorsPerceptually(clusters: ColorCluster[]): Array<ColorCluster & {score: number}> {
  return clusters.map(cluster => {
    const hsl = rgbToHsl(cluster.r, cluster.g, cluster.b)
    
    // Calculate contrast ratio for accessibility (against white and black)
    const contrastWhite = getContrastRatio(cluster.r, cluster.g, cluster.b, 255, 255, 255)
    const contrastBlack = getContrastRatio(cluster.r, cluster.g, cluster.b, 0, 0, 0)
    
    // Scoring factors with enhanced weighting for modern design
    const saturationScore = Math.pow(Math.min(hsl.s * 1.4, 1), 1.1) // Balanced vibrancy
    const luminanceScore = 1 - Math.abs(hsl.l - 0.5) * 1.6 // Prefer mid-range colors
    const contrastScore = Math.max(contrastWhite, contrastBlack) / 21 // WCAG max contrast is 21:1
    const dominanceScore = Math.min(cluster.dominance * 2.2, 1) // Weight by frequency
    
    // Enhanced Material Design color psychology with modern aesthetics
    const psychologyScore = getColorPsychologyScore(hsl.h) * 1.2
    
    // Modern design enhancement factors
    const vibrancyBonus = hsl.s > 0.5 && hsl.s < 0.9 ? 0.12 : 0 // Bonus for balanced vibrancy
    const harmoniousBonus = isHarmoniousColor(hsl.h) ? 0.08 : 0 // Bonus for aesthetically pleasing hues
    const modernLuminanceBonus = hsl.l > 0.3 && hsl.l < 0.7 ? 0.05 : 0 // Bonus for usable luminance range
    
    // Final weighted score optimized for modern design
    const score = (
      saturationScore * 0.28 +
      luminanceScore * 0.25 +
      contrastScore * 0.17 +
      dominanceScore * 0.2 +
      psychologyScore * 0.1
    ) + vibrancyBonus + harmoniousBonus + modernLuminanceBonus
    
    return { ...cluster, score }
  }).sort((a, b) => b.score - a.score)
}

// Step 5: Smart Color Assignment
function assignSmartColors(scoredColors: Array<ColorCluster & {score: number}>): string[] {
  if (scoredColors.length === 0) {
    return ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'] // Enhanced fallback colors
  }
  
  const colors: string[] = []
  
  // Primary: Balanced color optimized for both light and dark themes
  const primary = scoredColors[0]
  const primaryHsl = rgbToHsl(primary.r, primary.g, primary.b)
  const enhancedPrimary = hslToRgb(
    primaryHsl.h, 
    Math.min(primaryHsl.s * 1.08, 0.95), // Moderate saturation boost
    Math.max(0.42, Math.min(primaryHsl.l, 0.62)) // Optimal luminance for both themes
  )
  colors.push(rgbToHex(enhancedPrimary.r, enhancedPrimary.g, enhancedPrimary.b))
  
  // Secondary: Find triadic or analogous color for better harmony
  let secondary = scoredColors[1]
  if (scoredColors.length > 2) {
    // Look for triadic color (120 degrees apart) first, then analogous
    const triadicHue1 = (primaryHsl.h + 120) % 360
    const triadicHue2 = (primaryHsl.h + 240) % 360
    const analogousHue = (primaryHsl.h + 30) % 360
    
    secondary = scoredColors.slice(1).reduce((best, current) => {
      const currentHsl = rgbToHsl(current.r, current.g, current.b)
      const bestHsl = rgbToHsl(best.r, best.g, best.b)
      
      // Calculate harmony scores
      const currentTriadic = Math.min(
        Math.abs(currentHsl.h - triadicHue1),
        Math.abs(currentHsl.h - triadicHue2)
      )
      const currentAnalogous = Math.abs(currentHsl.h - analogousHue)
      const currentHarmony = Math.min(currentTriadic, currentAnalogous)
      
      const bestTriadic = Math.min(
        Math.abs(bestHsl.h - triadicHue1),
        Math.abs(bestHsl.h - triadicHue2)
      )
      const bestAnalogous = Math.abs(bestHsl.h - analogousHue)
      const bestHarmony = Math.min(bestTriadic, bestAnalogous)
      
      return currentHarmony < bestHarmony ? current : best
    })
  }
  
  // Enhance secondary color for modern appeal
  const secondaryHsl = rgbToHsl(secondary.r, secondary.g, secondary.b)
  const enhancedSecondary = hslToRgb(
    secondaryHsl.h,
    Math.min(secondaryHsl.s * 1.04, 0.92), // Subtle enhancement
    Math.max(0.38, Math.min(secondaryHsl.l, 0.68)) // Good for both themes
  )
  colors.push(rgbToHex(enhancedSecondary.r, enhancedSecondary.g, enhancedSecondary.b))
  
  // Accent: High-contrast vibrant color for attention
  let accent = scoredColors[2] || scoredColors[1]
  if (scoredColors.length > 3) {
    // Find most vibrant color with good contrast
    accent = scoredColors.slice(1).reduce((best, current) => {
      const currentHsl = rgbToHsl(current.r, current.g, current.b)
      const bestHsl = rgbToHsl(best.r, best.g, best.b)
      
      const currentVibrancy = currentHsl.s * (1 - Math.abs(currentHsl.l - 0.5))
      const bestVibrancy = bestHsl.s * (1 - Math.abs(bestHsl.l - 0.5))
      
      return currentVibrancy > bestVibrancy ? current : best
    })
  }
  
  // Make accent color vibrant but not overwhelming
  const accentHsl = rgbToHsl(accent.r, accent.g, accent.b)
  const enhancedAccent = hslToRgb(
    accentHsl.h,
    Math.min(accentHsl.s * 1.15, 0.98), // Controlled vibrancy
    Math.max(0.48, Math.min(accentHsl.l, 0.58)) // Balanced for accessibility
  )
  colors.push(rgbToHex(enhancedAccent.r, enhancedAccent.g, enhancedAccent.b))
  
  // Add additional colors if available
  for (let i = 3; i < Math.min(scoredColors.length, 6); i++) {
    colors.push(rgbToHex(scoredColors[i].r, scoredColors[i].g, scoredColors[i].b))
  }
  
  return colors
}

// Utility Functions

function rgbToHsl(r: number, g: number, b: number): HSLColor {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return { h: h * 360, s, l }
}

function rgbToLab(r: number, g: number, b: number): LABColor {
  // Convert RGB to XYZ
  r = r / 255
  g = g / 255
  b = b / 255
  
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92
  
  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
  const y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
  
  const fx = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x + 16/116)
  const fy = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y + 16/116)
  const fz = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z + 16/116)
  
  const l = 116 * fy - 16
  const a = 500 * (fx - fy)
  const bLab = 200 * (fy - fz)
  
  return { l, a, b: bLab }
}

function deltaE(lab1: LABColor, lab2: LABColor): number {
  const deltaL = lab1.l - lab2.l
  const deltaA = lab1.a - lab2.a
  const deltaB = lab1.b - lab2.b
  
  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB)
}

function getContrastRatio(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const l1 = getLuminance(r1, g1, b1)
  const l2 = getLuminance(r2, g2, b2)
  
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

function getLuminance(r: number, g: number, b: number): number {
  const rsRGB = r / 255
  const gsRGB = g / 255
  const bsRGB = b / 255
  
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)
  
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

function getColorPsychologyScore(hue: number): number {
  // Score based on color psychology for UI/UX
  // Blue (trustworthy), Green (growth), Purple (creative), Orange (energetic)
  const preferredHues = [
    { center: 240, weight: 1.0 }, // Blue
    { center: 120, weight: 0.9 }, // Green  
    { center: 270, weight: 0.8 }, // Purple
    { center: 30, weight: 0.7 },  // Orange
    { center: 0, weight: 0.6 },   // Red
    { center: 300, weight: 0.6 }  // Pink
  ]
  
  let bestScore = 0
  preferredHues.forEach(pref => {
    const distance = Math.min(Math.abs(hue - pref.center), 360 - Math.abs(hue - pref.center))
    const score = pref.weight * Math.max(0, 1 - distance / 60) // 60 degree tolerance
    bestScore = Math.max(bestScore, score)
  })
  
  return bestScore
}

function isHarmoniousColor(hue: number): boolean {
  // Modern color ranges that work well in both light and dark themes
  const harmoniousRanges = [
    { start: 200, end: 260 }, // Blue to purple range (modern tech feel)
    { start: 160, end: 200 }, // Cyan to blue range (fresh, clean)
    { start: 100, end: 140 }, // Green range (natural, growth)
    { start: 280, end: 320 }, // Purple to magenta (creative, premium)
    { start: 20, end: 50 },   // Orange to yellow-orange (energetic, warm)
    { start: 340, end: 20 },  // Red-pink range (attention, passion)
  ]
  
  return harmoniousRanges.some(range => {
    if (range.start > range.end) {
      // Handle wrap-around case (e.g., 340-20)
      return hue >= range.start || hue <= range.end
    }
    return hue >= range.start && hue <= range.end
  })
}

function hslToRgb(h: number, s: number, l: number): {r: number, g: number, b: number} {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  
  let r = 0, g = 0, b = 0
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}
