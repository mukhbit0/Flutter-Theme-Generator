import { useState } from 'react'
import { ColorPaletteProps } from './PreviewScreenTypes'

export default function ColorPalette({ currentColors, darkMode, onColorChange, isEditable = false }: ColorPaletteProps) {
  const [editingColor, setEditingColor] = useState<string | null>(null)
  const [tempColor, setTempColor] = useState<string>('')

  const handleColorClick = (colorName: string) => {
    if (isEditable) {
      if (editingColor === colorName) {
        setEditingColor(null)
        setTempColor('')
      } else {
        setEditingColor(colorName)
        setTempColor(currentColors[colorName] as string)
      }
    }
  }

  const handleColorInputChange = (newColor: string) => {
    setTempColor(newColor)
    if (onColorChange && editingColor) {
      onColorChange(editingColor, newColor)
    }
  }

  const handleSaveColor = () => {
    if (onColorChange && editingColor && tempColor) {
      onColorChange(editingColor, tempColor)
    }
    setEditingColor(null)
    setTempColor('')
  }

  const handleCancelEdit = () => {
    if (onColorChange && editingColor) {
      onColorChange(editingColor, currentColors[editingColor] as string)
    }
    setEditingColor(null)
    setTempColor('')
  }

  return (
    <div className={`${
      darkMode ? 'bg-gray-800/70' : 'bg-white/70'
    } backdrop-blur-lg rounded-xl p-6 border ${
      darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
    } sticky top-32`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Color Palette
        </h2>
        {isEditable && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
          }`}>
            Click to edit
          </span>
        )}
      </div>
      
      {/* Main content - single column */}
      <div className="space-y-4">
        {Object.entries(currentColors).map(([name, color]) => (
          <div 
            key={name} 
            className="space-y-2 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <div 
                className={`w-8 h-8 rounded-lg shadow-sm border border-black/10 flex-shrink-0 ${
                  isEditable ? 'cursor-pointer hover:scale-110 transition-transform' : ''
                }`}
                style={{ backgroundColor: color as string }}
                onClick={() => handleColorClick(name)}
                title={isEditable ? 'Click to edit color' : undefined}
              />
              {/* Added min-w-0 to ensure text truncates properly in flexbox */}
              <div className="min-w-0">
                <div className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div className={`text-xs font-mono truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {color as string}
                </div>
              </div>
            </div>
            
            {editingColor === name && (
              <div className="pt-2 space-y-2">
                <input
                  type="color"
                  value={tempColor}
                  onChange={(e) => handleColorInputChange(e.target.value)}
                  className="w-full h-8 rounded border-none cursor-pointer"
                />
                <input
                  type="text"
                  value={tempColor}
                  onChange={(e) => handleColorInputChange(e.target.value)}
                  placeholder="#000000"
                  className={`w-full px-2 py-1 text-xs border rounded ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveColor}
                    className={`px-2 py-1 text-xs rounded ${
                      darkMode 
                        ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    } transition-colors`}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className={`px-2 py-1 text-xs rounded ${
                      darkMode 
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}