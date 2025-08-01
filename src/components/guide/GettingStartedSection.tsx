interface GettingStartedSectionProps {
  darkMode: boolean
}

export default function GettingStartedSection({ darkMode }: GettingStartedSectionProps) {
  const steps = [
    {
      title: '1. Configure Settings',
      description: 'Set your theme name, package name, and enable ScreenUtil support for responsive design.',
      icon: '⚙️'
    },
    {
      title: '2. Upload Logo (Optional)',
      description: 'Upload your brand logo for AI-powered color extraction using K-Means clustering.',
      icon: '🎨'
    },
    {
      title: '3. Choose Colors & Modes',
      description: 'Select colors and preview all 6 theme variants (light/dark with contrast levels).',
      icon: '🌈'
    },
    {
      title: '4. Generate & Download',
      description: 'Export Material 3 compliant themes with complete ScreenUtil integration.',
      icon: '📦'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Getting Started
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Create professional Flutter themes with advanced algorithms, complete Material 3 support, and responsive design integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div key={index} className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
            <div className="text-2xl mb-3">{step.icon}</div>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {step.title}
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-blue-50 border border-blue-200'}`}>
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
          � Enhanced Features
        </h3>
        <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
          Our latest update includes Oklab color space processing for perceptually accurate colors, APCA accessibility standards, and complete ScreenUtil integration for responsive design across all device sizes.
        </p>
      </div>
    </div>
  )
}
