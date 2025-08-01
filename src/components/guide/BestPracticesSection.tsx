interface BestPracticesSectionProps {
  darkMode: boolean
}

export default function BestPracticesSection({ darkMode }: BestPracticesSectionProps) {
  const practices = [
    {
      title: "🎨 Enhanced Color Usage",
      tips: [
        "Use semantic Material 3 colors (primary, secondary, tertiary) with all variants",
        "Leverage APCA accessibility standards for superior contrast compliance",
        "Test all 6 theme variants (light/dark + contrast modes) thoroughly",
        "Maintain Oklab color space consistency for perceptual accuracy"
      ]
    },
    {
      title: "📏 ScreenUtil Integration",
      tips: [
        "Use ScreenUtil constants (.sp, .w, .h) for perfect responsive design",
        "Replace all hardcoded dimensions with responsive equivalents",
        "Follow Material Design 3 spacing guidelines with device adaptation",
        "Implement consistent padding/margins that scale across devices"
      ]
    },
    {
      title: "✍️ Responsive Typography",
      tips: [
        "Use ScreenUtil-enhanced text styles for device-appropriate sizing",
        "Ensure text readability across all theme variants and screen sizes",
        "Follow WCAG AAA guidelines with enhanced accessibility features",
        "Maintain proper text hierarchy with responsive scaling"
      ]
    },
    {
      title: "🚀 Material 3 Performance",
      tips: [
        "Cache Material 3 theme instances with all variants efficiently",
        "Use const constructors for enhanced theme data optimization",
        "Implement smart theme switching without unnecessary rebuilds",
        "Optimize for different screen densities with ScreenUtil integration"
      ]
    },
    {
      title: "♿ Accessibility Excellence",
      tips: [
        "Utilize APCA contrast algorithms for next-generation accessibility",
        "Test with high contrast theme variants for visual impairments",
        "Ensure focus indicators work across all Material 3 variants",
        "Validate color accessibility with our built-in compliance tools"
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Enhanced Best Practices
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Professional guidelines for Material 3 themes, ScreenUtil integration, accessibility compliance, and optimal performance practices.
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
