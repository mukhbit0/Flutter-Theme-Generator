import { ThemeGeneratorSettings } from '../../types/theme'

interface GenerationOptionsSectionProps {
  settings: ThemeGeneratorSettings
  onSettingsChange: (updates: Partial<ThemeGeneratorSettings>) => void
  darkMode: boolean
}

export default function GenerationOptionsSection({ settings, onSettingsChange, darkMode }: GenerationOptionsSectionProps) {
  const options = [
    { 
      key: 'generateMaterialYou' as keyof ThemeGeneratorSettings, 
      label: 'Material You Support', 
      description: 'Include Material 3 dynamic color support' 
    },
    { 
      key: 'includeExtensions' as keyof ThemeGeneratorSettings, 
      label: 'Helper Extensions', 
      description: 'Generate convenient context extensions' 
    },
    { 
      key: 'includeAnimations' as keyof ThemeGeneratorSettings, 
      label: 'Animation Helpers', 
      description: 'Include pre-built animation utilities' 
    }
  ]

  const handleOptionChange = (key: keyof ThemeGeneratorSettings, value: boolean) => {
    onSettingsChange({ [key]: value })
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Generation Options
      </h2>
      
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.key} className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={settings[option.key] as boolean}
                onChange={(e) => handleOptionChange(option.key, e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
            </div>
            <div className="flex-1">
              <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {option.label}
              </label>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
