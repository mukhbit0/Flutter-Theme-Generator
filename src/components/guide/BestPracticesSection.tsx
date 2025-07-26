interface BestPracticesSectionProps {
  darkMode: boolean
}

export default function BestPracticesSection({ darkMode }: BestPracticesSectionProps) {
  const practices = [
    {
      title: "🎨 Color Usage",
      tips: [
        "Use semantic colors (primary, secondary) over hardcoded values",
        "Ensure proper contrast ratios for accessibility",
        "Test colors in both light and dark modes",
        "Maintain brand consistency across all screens"
      ]
    },
    {
      title: "📏 Spacing & Layout",
      tips: [
        "Use theme spacing constants instead of magic numbers",
        "Implement responsive design with MediaQuery",
        "Follow Material Design spacing guidelines",
        "Use consistent padding and margins"
      ]
    },
    {
      title: "✍️ Typography",
      tips: [
        "Use theme text styles for consistency",
        "Ensure text is readable on all backgrounds",
        "Follow accessibility guidelines for font sizes",
        "Maintain proper text hierarchy"
      ]
    },
    {
      title: "🚀 Performance",
      tips: [
        "Cache theme instances when possible",
        "Use const constructors for theme data",
        "Avoid rebuilding themes unnecessarily",
        "Optimize for different screen densities"
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Best Practices
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Guidelines for effective theme usage and maintenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practices.map((practice, index) => (
          <div key={index} className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {practice.title}
            </h3>
            <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {practice.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-emerald-900/20 border border-emerald-700/30' : 'bg-emerald-50 border border-emerald-200'}`}>
        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
          🌟 Pro Tips
        </h3>
        <p className={`${darkMode ? 'text-emerald-200' : 'text-emerald-800'}`}>
          Always test your theme across different devices, screen sizes, and accessibility settings. Consider implementing theme switching functionality for better user experience.
        </p>
      </div>
    </div>
  )
}
