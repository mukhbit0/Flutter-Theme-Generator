import { ThemeGeneratorSettings } from '../../types/theme'

interface BasicSettingsSectionProps {
  settings: ThemeGeneratorSettings
  onSettingsChange: (updates: Partial<ThemeGeneratorSettings>) => void
  darkMode: boolean
}

export default function BasicSettingsSection({ settings, onSettingsChange, darkMode }: BasicSettingsSectionProps) {
  return (
    <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Basic Settings
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Theme Name
          </label>
          <input
            type="text"
            value={settings.themeName}
            onChange={(e) => onSettingsChange({ themeName: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
            placeholder="AppTheme"
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Package Name
          </label>
          <input
            type="text"
            value={settings.packageName}
            onChange={(e) => onSettingsChange({ packageName: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
            placeholder="com.example.myapp"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Additional Options
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Use ScreenUtil
              </label>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Enable flutter_screenutil for responsive design values
              </p>
            </div>
            <button
              onClick={() => onSettingsChange({ useScreenUtil: !settings.useScreenUtil })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                settings.useScreenUtil 
                  ? 'bg-purple-600' 
                  : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.useScreenUtil ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
