interface GettingStartedSectionProps {
  darkMode: boolean
}

export default function GettingStartedSection({ darkMode }: GettingStartedSectionProps) {
  const steps = [
    {
      title: '1. Configure Settings',
      description: 'Set your theme name, package name, and basic configuration options.',
      icon: '⚙️'
    },
    {
      title: '2. Upload Logo (Optional)',
      description: 'Upload your brand logo to automatically extract color palettes.',
      icon: '🎨'
    },
    {
      title: '3. Choose Colors',
      description: 'Select primary, secondary, and accent colors for your theme.',
      icon: '🌈'
    },
    {
      title: '4. Generate & Download',
      description: 'Generate your theme files and download the complete package.',
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
          Learn how to create and implement Flutter themes with our generator.
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
          💡 Quick Tip
        </h3>
        <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
          For best results, upload a high-quality logo or image with distinct colors. Our algorithm will extract the most prominent colors to create a cohesive color palette.
        </p>
      </div>
    </div>
  )
}
