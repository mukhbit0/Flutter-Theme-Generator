import { useState, useCallback, useRef, useEffect } from 'react'
import { ColorPaletteProps } from './PreviewScreenTypes'
import { Tooltip } from './Tooltip'
import { A11Y_CONSTANTS } from './constants'
import { DESIGN_CONSTANTS } from './constants'
import { ThemeValidator } from '../../utils/ThemeValidator'

interface ColorHistory {
  colorName: string
  oldValue: string
  newValue: string
  timestamp: number
}

export default function ColorPalette({ currentColors, darkMode, onColorChange, isEditable = false }: ColorPaletteProps) {
  const [editingColor, setEditingColor] = useState<string | null>(null)
  const [tempColor, setTempColor] = useState<string>('')
  const [colorHistory, setColorHistory] = useState<ColorHistory[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [originalColor, setOriginalColor] = useState<string>('')
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const colorInputRef = useRef<HTMLInputElement>(null)

  // Remove initial load state after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 100)
    return () => clearTimeout(timer)
  }, [])

  // Validate color format
  const isValidColor = useCallback((color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    return hexRegex.test(color)
  }, [])

  // Calculate color contrast ratio (simplified)
  const getContrastRatio = useCallback((color1: string, color2: string): number => {
    // Simplified contrast calculation - in production you'd use a proper library
    const getLuminance = (hex: string) => {
      const rgb = parseInt(hex.slice(1), 16)
      const r = (rgb >> 16) & 255
      const g = (rgb >> 8) & 255
      const b = rgb & 255
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255
    }

    const l1 = getLuminance(color1)
    const l2 = getLuminance(color2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  }, [])

  const addToHistory = useCallback((colorName: string, oldValue: string, newValue: string) => {
    const newHistoryItem: ColorHistory = {
      colorName,
      oldValue,
      newValue,
      timestamp: Date.now()
    }

    setColorHistory(prev => {
      // Remove any history after current index (when user made changes after undo)
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(newHistoryItem)
      return newHistory.slice(-20) // Keep only last 20 changes
    })
    setHistoryIndex(prev => {
      const newIndex = Math.min(prev + 1, 19)
      return newIndex
    })
  }, [historyIndex])

  const undo = useCallback(() => {
    if (historyIndex >= 0 && colorHistory[historyIndex] && onColorChange) {
      const item = colorHistory[historyIndex]
      onColorChange(item.colorName, item.oldValue)
      setHistoryIndex(prev => prev - 1)
    }
  }, [historyIndex, colorHistory, onColorChange])

  const redo = useCallback(() => {
    if (historyIndex < colorHistory.length - 1 && onColorChange) {
      const item = colorHistory[historyIndex + 1]
      onColorChange(item.colorName, item.newValue)
      setHistoryIndex(prev => prev + 1)
    }
  }, [historyIndex, colorHistory, onColorChange])

  // Keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
      event.preventDefault()
      undo()
    } else if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
      event.preventDefault()
      redo()
    }
  }, [undo, redo])

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleColorClick = (colorName: string) => {
    if (isEditable) {
      if (editingColor === colorName) {
        setEditingColor(null)
        setTempColor('')
        setOriginalColor('')
      } else {
        const currentColor = currentColors[colorName] as string
        setEditingColor(colorName)
        setTempColor(currentColor)
        setOriginalColor(currentColor) // Store original for cancel
        // Focus input after state update
        setTimeout(() => colorInputRef.current?.focus(), 100)
      }
    }
  }

  const handleColorInputChange = (newColor: string) => {
    setTempColor(newColor)
    // Real-time preview update without adding to history
    if (onColorChange && editingColor && isValidColor(newColor)) {
      onColorChange(editingColor, newColor)
    }
  }

  const handleSaveColor = () => {
    if (onColorChange && editingColor && tempColor && isValidColor(tempColor)) {
      const oldValue = originalColor || (currentColors[editingColor] as string)
      if (oldValue !== tempColor) {
        // Only add to history when actually saving (not during live updates)
        addToHistory(editingColor, oldValue, tempColor)
        // Final update to ensure consistency
        onColorChange(editingColor, tempColor)
      }
    }
    setEditingColor(null)
    setTempColor('')
    setOriginalColor('')
  }

  const handleCancelEdit = () => {
    // Restore original color when canceling
    if (onColorChange && editingColor && originalColor) {
      onColorChange(editingColor, originalColor)
    }
    setEditingColor(null)
    setTempColor('')
    setOriginalColor('')
  }

  const handleFixColor = (name: string, color: string, bg: string) => {
    if (onColorChange) {
      const fixedColor = ThemeValidator.fixColor(color, bg, 3.0);
      if (fixedColor !== color) {
        addToHistory(name, color, fixedColor);
        onColorChange(name, fixedColor);
      }
    }
  }

  const canUndo = historyIndex >= 0
  const canRedo = historyIndex < colorHistory.length - 1

  return (
    <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'
      } backdrop-blur-lg rounded-xl p-3 lg:p-4 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
      } sticky top-32 max-h-[calc(100vh-10rem)] flex flex-col relative ${isInitialLoad ? 'transition-all duration-300' : ''
      }`}
      style={{ zIndex: DESIGN_CONSTANTS.Z_INDEX.STICKY }}>

      {/* Header with Controls */}
      <div className="flex items-start justify-between mb-3 flex-shrink-0 relative">
        <div className="min-w-0 flex-1">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
            Color Palette
          </h2>
          {isEditable && (
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Click colors to edit • Ctrl+Z to undo • History: {colorHistory.length}
            </p>
          )}
        </div>

        {isEditable && (
          <div className="flex items-center space-x-1 flex-shrink-0 ml-2 relative">
            {/* Undo/Redo buttons with no transition animations */}
            <div className="relative">
              <Tooltip content="Undo (Ctrl+Z)" darkMode={darkMode} position="top">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`p-1.5 rounded-lg ${canUndo
                      ? darkMode
                        ? 'hover:bg-gray-600 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                      : 'opacity-50 cursor-not-allowed text-gray-400'
                    }`}
                  aria-label="Undo color change"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </button>
              </Tooltip>
            </div>

            <div className="relative">
              <Tooltip content="Redo (Ctrl+Y)" darkMode={darkMode} position="top">
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className={`p-1.5 rounded-lg ${canRedo
                      ? darkMode
                        ? 'hover:bg-gray-600 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                      : 'opacity-50 cursor-not-allowed text-gray-400'
                    }`}
                  aria-label="Redo color change"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>
        )}

        {/* Edit indicator with minimal animation */}
        {isEditable && (
          <div className="flex-shrink-0 ml-2">
            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
              } whitespace-nowrap`}>
              {editingColor ? 'Editing' : 'Edit'}
            </span>
          </div>
        )}
      </div>

      {/* Main content - scrollable color list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 scrollbar-hide">
        {Object.entries(currentColors).map(([name, color]) => {
          // Check contrast against the APP BACKGROUND to ensure visibility
          // In Dark Mode, background is dark (gray-900), so we check against that.
          // In Light Mode, background is light (white), so we check against that.
          const bgForContrast = darkMode ? '#111827' : '#ffffff'
          const contrastRatio = getContrastRatio(color as string, bgForContrast)
          const hasGoodContrast = contrastRatio >= 3.0 // 3.0 is good for UI components/graphics (WCAG 2.1)

          return (
            <div
              key={name}
              className="space-y-2 px-1"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Tooltip
                    content={isEditable ? 'Click to edit color' : `Color: ${color}`}
                    darkMode={darkMode}
                    position="right"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg shadow-sm border border-black/10 flex-shrink-0 ${isEditable ? 'cursor-pointer' : ''
                        } ${editingColor === name ? 'ring-2 ring-purple-500' : ''}`}
                      style={{ backgroundColor: color as string }}
                      onClick={() => handleColorClick(name)}
                      onKeyDown={(e) => {
                        if (e.key === A11Y_CONSTANTS.KEYBOARD_SHORTCUTS.ENTER || e.key === A11Y_CONSTANTS.KEYBOARD_SHORTCUTS.SPACE) {
                          e.preventDefault()
                          handleColorClick(name)
                        }
                      }}
                      tabIndex={isEditable ? 0 : -1}
                      role={isEditable ? "button" : undefined}
                      aria-label={isEditable ? `Edit ${name} color` : undefined}
                    />
                  </Tooltip>
                </div>

                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {name.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase())}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`text-xs font-mono truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {color as string}
                    </div>
                    {/* Contrast indicator with no animation */}
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Tooltip
                          content={`Contrast with background: ${contrastRatio.toFixed(1)} ${hasGoodContrast ? '(Good)' : '(Poor)'}`}
                          darkMode={darkMode}
                          position="right"
                        >
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${hasGoodContrast ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                        </Tooltip>
                      </div>

                      {/* Fix Button for Poor Contrast */}
                      {!hasGoodContrast && isEditable && (
                        <div className="relative">
                          <Tooltip
                            content="Auto-fix contrast"
                            darkMode={darkMode}
                            position="right"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFixColor(name, color as string, bgForContrast);
                              }}
                              className={`p-1 rounded-full transition-colors ${darkMode
                                  ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50'
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                }`}
                              aria-label={`Fix contrast for ${name}`}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {editingColor === name && (
                <div className="pt-2 space-y-3 bg-black/5 dark:bg-white/5 rounded-lg p-2 ml-1">
                  <div className="flex space-x-2">
                    <input
                      ref={colorInputRef}
                      type="color"
                      value={tempColor}
                      onChange={(e) => handleColorInputChange(e.target.value)}
                      className="w-12 h-8 rounded border-none cursor-pointer flex-shrink-0"
                      aria-label={`Color picker for ${name}`}
                    />
                    <input
                      type="text"
                      value={tempColor}
                      onChange={(e) => handleColorInputChange(e.target.value)}
                      placeholder="#000000"
                      className={`flex-1 px-2 py-2 text-sm border rounded-lg ${isValidColor(tempColor)
                          ? darkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        } focus:ring-2 focus:border-transparent`}
                      aria-label={`Hex value for ${name}`}
                    />
                  </div>

                  {!isValidColor(tempColor) && (
                    <p className="text-xs text-red-500">Please enter a valid hex color (e.g., #FF0000)</p>
                  )}

                  <div className="flex justify-start items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveColor}
                        disabled={!isValidColor(tempColor)}
                        className={`px-3 py-1.5 text-sm rounded-lg font-medium ${isValidColor(tempColor)
                            ? darkMode
                              ? 'bg-purple-600 hover:bg-purple-500 text-white'
                              : 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className={`px-3 py-1.5 text-sm rounded-lg font-medium ${darkMode
                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}