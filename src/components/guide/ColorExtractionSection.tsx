interface ColorExtractionSectionProps {
  darkMode: boolean
}

export default function ColorExtractionSection({ darkMode }: ColorExtractionSectionProps) {
  const algorithmSteps = [
    {
      step: "1",
      title: "Image Preprocessing",
      description: "Convert image to canvas, resize for optimal processing, and normalize pixel data",
      details: [
        "Resize image to 150x150 pixels for consistent processing",
        "Convert to RGBA format for accurate color analysis",
        "Remove transparent/semi-transparent pixels",
        "Apply slight blur to reduce noise"
      ],
      color: "purple"
    },
    {
      step: "2", 
      title: "Pixel Sampling & Analysis",
      description: "Extract pixel colors and analyze frequency distribution",
      details: [
        "Sample every 5th pixel to reduce computation",
        "Convert RGB to HSL for better color perception",
        "Filter out grays and near-whites (low saturation)",
        "Calculate color frequency and dominance"
      ],
      color: "blue"
    },
    {
      step: "3",
      title: "K-Means Color Clustering", 
      description: "Group similar colors using advanced clustering algorithm",
      details: [
        "Use k=8 clusters for optimal color grouping",
        "Apply LAB color space for perceptual accuracy",
        "Weight clusters by pixel frequency",
        "Iterate until convergence (max 20 iterations)"
      ],
      color: "green"
    },
    {
      step: "4",
      title: "Perceptual Color Scoring",
      description: "Score colors based on visual impact and usability",
      details: [
        "Calculate contrast ratios for accessibility",
        "Analyze saturation and brightness levels",
        "Consider color psychology principles",
        "Apply Material Design color guidelines"
      ],
      color: "orange"
    },
    {
      step: "5",
      title: "Smart Color Assignment",
      description: "Intelligently assign colors to primary, secondary, and accent roles",
      details: [
        "Primary: Most dominant vibrant color",
        "Secondary: Complementary or analogous color",
        "Accent: High-contrast attention color",
        "Generate variations and neutral tones"
      ],
      color: "pink"
    }
  ]

  const getStepColor = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-500'
      case 'blue': return 'bg-blue-500'
      case 'green': return 'bg-green-500'
      case 'orange': return 'bg-orange-500'
      case 'pink': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Color Extraction Algorithm
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Our advanced algorithm analyzes your images to extract perfect brand colors with precision.
        </p>
      </div>

      {/* Algorithm Overview */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/30' : 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🧠 How Our Algorithm Works
        </h3>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          We use a sophisticated multi-step process combining K-means clustering, perceptual color analysis, and Material Design principles.
        </p>
      </div>

      {/* Step-by-step process */}
      <div className="space-y-6">
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Algorithm Steps
        </h3>
        
        {algorithmSteps.map((item, index) => (
          <div key={index} className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-bold ${getStepColor(item.color)}`}>
                {item.step}
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h4>
                <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.description}
                </p>
                <ul className={`space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Color Theory Section */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-indigo-900/20 border border-indigo-700/30' : 'bg-indigo-50 border border-indigo-200'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
          🎨 Color Theory Application
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Primary Colors</h4>
            <p className={`text-sm ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
              Most prominent, high-saturation colors that represent your brand identity
            </p>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Secondary Colors</h4>
            <p className={`text-sm ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
              Complementary colors that work harmoniously with primary colors
            </p>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Accent Colors</h4>
            <p className={`text-sm ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
              High-contrast colors for call-to-action elements and highlights
            </p>
          </div>
        </div>
      </div>

      {/* Performance & Accuracy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-700/30' : 'bg-green-50 border border-green-200'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
            ⚡ Performance Optimized
          </h3>
          <ul className={`space-y-2 text-sm ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
            <li>• Processes in &lt;2 seconds</li>
            <li>• Client-side processing (privacy-safe)</li>
            <li>• Memory-efficient algorithms</li>
            <li>• Works with any image format</li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-blue-50 border border-blue-200'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
            🎯 Accuracy Features
          </h3>
          <ul className={`space-y-2 text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            <li>• 95%+ brand color accuracy</li>
            <li>• WCAG accessibility compliance</li>
            <li>• Material Design adherence</li>
            <li>• Cross-platform consistency</li>
          </ul>
        </div>
      </div>

      {/* Pro Tips */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-yellow-900/20 border border-yellow-700/30' : 'bg-yellow-50 border border-yellow-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>
          💡 Pro Tips for Best Results
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Image Quality</h4>
            <ul className={`space-y-1 text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
              <li>• Use high-resolution images (500px+)</li>
              <li>• Prefer PNG over JPG for logos</li>
              <li>• Ensure good contrast between colors</li>
              <li>• Avoid heavily compressed images</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Color Selection</h4>
            <ul className={`space-y-1 text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
              <li>• Images with 2-5 distinct colors work best</li>
              <li>• Brand logos give most accurate results</li>
              <li>• Avoid images with gradients</li>
              <li>• Test with different logo variations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
