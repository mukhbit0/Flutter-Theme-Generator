import { ThemeGeneratorSettings } from '../../types/theme'

interface BaseColorsSectionProps {
  settings: ThemeGeneratorSettings
  onSettingsChange: (updates: Partial<ThemeGeneratorSettings>) => void
  darkMode: boolean
}

export default function BaseColorsSection({ settings, onSettingsChange, darkMode }: BaseColorsSectionProps) {
  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    onSettingsChange({
      baseColors: {
        ...settings.baseColors!,
        [colorType]: value
      }
    })
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Base Colors
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['primary', 'secondary', 'accent'] as const).map((colorType) => (
          <div key={colorType}>
            <label className={`block text-sm font-medium mb-2 capitalize ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {colorType} Color
            </label>
            <div className="relative">
              <input
                type="color"
                value={settings.baseColors?.[colorType] || '#000000'}
                onChange={(e) => handleColorChange(colorType, e.target.value)}
                className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <span className={`absolute right-3 top-3 text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {settings.baseColors?.[colorType]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
