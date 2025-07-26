import { CustomColor, ThemeGeneratorSettings } from '../../types/theme'

interface CustomColorsSectionProps {
  settings: ThemeGeneratorSettings
  onSettingsChange: (updates: Partial<ThemeGeneratorSettings>) => void
  darkMode: boolean
}

export default function CustomColorsSection({ settings, onSettingsChange, darkMode }: CustomColorsSectionProps) {
  const addCustomColor = () => {
    const newColor: CustomColor = {
      name: `Custom${settings.customColors.length + 1}`,
      value: '#000000'
    }
    onSettingsChange({
      customColors: [...settings.customColors, newColor]
    })
  }

  const updateCustomColor = (index: number, field: keyof CustomColor, value: string) => {
    const updatedColors = settings.customColors.map((color, i) => 
      i === index ? { ...color, [field]: value } : color
    )
    onSettingsChange({ customColors: updatedColors })
  }

  const removeCustomColor = (index: number) => {
    const updatedColors = settings.customColors.filter((_, i) => i !== index)
    onSettingsChange({ customColors: updatedColors })
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Custom Colors
        </h2>
        <button
          onClick={addCustomColor}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
        >
          Add Color
        </button>
      </div>
      
      {settings.customColors.length === 0 ? (
        <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No custom colors added yet. Click "Add Color" to create one.
        </p>
      ) : (
        <div className="space-y-4">
          {settings.customColors.map((color, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="text"
                value={color.name}
                onChange={(e) => updateCustomColor(index, 'name', e.target.value)}
                className={`flex-1 px-3 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Color name"
              />
              <input
                type="color"
                value={color.value}
                onChange={(e) => updateCustomColor(index, 'value', e.target.value)}
                className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <span className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {color.value}
              </span>
              <button
                onClick={() => removeCustomColor(index)}
                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
