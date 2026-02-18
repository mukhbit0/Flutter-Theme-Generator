import { useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ThemeCounter } from './ThemeCounter'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BannerAd } from './ads'

interface HomePageProps {
  onNavigateToGenerator: () => void
  onNavigateToGuide: () => void
  onNavigateToRoadmap: () => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function HomePage({ onNavigateToGenerator, onNavigateToGuide, onNavigateToRoadmap, darkMode }: HomePageProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'What is the Flutter Theme Generator?',
      answer: 'Flutter Theme Generator is a free online tool that creates professional Material 3 themes for Flutter applications. It supports color extraction from logos, light and dark mode generation, WCAG accessibility validation, and exports production-ready Dart code that you can directly use in your Flutter projects.'
    },
    {
      question: 'How do I generate a Flutter theme from my brand logo?',
      answer: 'Simply upload your brand logo on the Generator page. Our advanced color extraction algorithm analyzes your logo and extracts the dominant colors. These colors are then used as primary, secondary, and accent colors to generate a harmonious Material 3 color scheme for both light and dark modes.'
    },
    {
      question: 'Does it support Material Design 3 and Flutter\'s latest theming?',
      answer: 'Yes! The tool generates themes fully compliant with Material Design 3 specifications. It produces complete ColorScheme objects with all 29+ color roles, supports 6 contrast variants (light, dark, light medium/high contrast, dark medium/high contrast), and follows Flutter\'s latest ThemeData best practices.'
    },
    {
      question: 'Is the generated Flutter theme code production-ready?',
      answer: 'Absolutely. The generated Dart code follows clean architecture principles with proper separation of concerns. It includes AppTheme, AppColorScheme, and AppTextTheme classes ready for production use. It also supports ScreenUtil for responsive typography and optional custom color extensions.'
    },
    {
      question: 'Can I preview how the theme looks on Flutter widgets?',
      answer: 'Yes! The Preview page shows your theme applied to real Flutter widget representations including buttons, cards, text fields, navigation bars, dialogs, switches, chips, and more. You can switch between light and dark modes and all contrast variants in real-time.'
    },
    {
      question: 'How do I share my Flutter theme with others?',
      answer: 'After generating a theme, you can share it via a unique URL that others can open to view, like, comment on, and even download your theme. Shared themes also appear in the public Theme Gallery where the community can discover and use them.'
    },
    {
      question: 'What accessibility features does the theme generator support?',
      answer: 'The tool includes WCAG 2.1 contrast validation that checks all color combinations for accessibility compliance. It shows AA and AAA pass/fail status for every color pair and suggests fixes for failing combinations, ensuring your Flutter app is accessible to all users.'
    },
    {
      question: 'Is the Flutter Theme Generator free to use?',
      answer: 'Yes, the Flutter Theme Generator is completely free to use. You can generate unlimited themes, preview widgets, validate accessibility, and export production-ready Dart code without any cost. Create an account to save and share your themes.'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${darkMode
                ? 'bg-purple-900/20 text-purple-300 border border-purple-700/30'
                : 'bg-purple-50 text-purple-700 border border-purple-200'
                }`}>
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Create Professional Flutter Themes
              </div>
            </div>

            <h1 className={`text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Build Beautiful
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Flutter Themes
              </span>
            </h1>

            <p className={`text-xl leading-relaxed max-w-3xl mx-auto mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Generate comprehensive Flutter themes with clean architecture. Support for both light and dark modes,
              color extraction from logos, custom color palettes, and Material 3 compliance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={onNavigateToGenerator}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Get Started</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/gallery')}
                className={`px-8 py-4 font-semibold rounded-xl border-2 transition-all duration-300 ${darkMode
                  ? 'border-blue-600 text-blue-400 hover:border-blue-500 hover:text-white hover:bg-blue-900/20'
                  : 'border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50'
                  }`}
              >
                Browse Gallery
              </button>

              <button
                onClick={onNavigateToGuide}
                className={`px-8 py-4 font-semibold rounded-xl border-2 transition-all duration-300 ${darkMode
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white hover:bg-gray-800/50'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                View Documentation
              </button>

              <button
                onClick={onNavigateToRoadmap}
                className={`px-8 py-4 font-semibold rounded-xl border-2 transition-all duration-300 flex items-center space-x-2 ${darkMode
                  ? 'border-indigo-600 text-indigo-400 hover:border-indigo-500 hover:text-indigo-300 hover:bg-indigo-900/20'
                  : 'border-indigo-300 text-indigo-600 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Project Roadmap</span>
              </button>
            </div>

            {!currentUser && (
              <div className={`mt-8 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Want to save your themes?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className={`font-medium hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                >
                  Login to your account
                </button>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                ),
                title: 'Light & Dark Themes',
                description: 'Automatically generate both light and dark theme variants with perfect color harmony.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Logo Color Extraction',
                description: 'Upload your logo and automatically extract brand colors for theme generation.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Material 3 Compliant',
                description: 'Generated themes follow Material Design 3 specifications and Flutter best practices.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Performance Optimized',
                description: 'Lightweight themes that don\'t impact your app\'s performance or loading times.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Clean Architecture',
                description: 'Well-structured code with proper separation of concerns and extensible design.',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: 'Live Preview',
                description: 'See how your theme looks across all Flutter widgets with real-time preview.',
                color: 'from-red-500 to-pink-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`relative ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-2xl p-8 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Banner Ad between features and CTA */}
          <div className="mt-10">
            <BannerAd darkMode={darkMode} />
          </div>

          {/* CTA Section with Counter */}
          <div className={`mt-10 text-center p-12 rounded-3xl ${darkMode ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-700/50' : 'bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-gray-200/50'} backdrop-blur-lg`}>
            <div className="flex flex-col items-center space-y-6">
              <ThemeCounter darkMode={darkMode} />

              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Ready to Create Your Theme?
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Start building professional Flutter themes with our comprehensive generator
              </p>
              <button
                onClick={onNavigateToGenerator}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 space-x-3"
              >
                <span>Start Building Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* FAQ Section for SEO */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Frequently Asked Questions
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Everything you need to know about the Flutter Theme Generator
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${darkMode
                      ? 'border-gray-700/50 bg-gray-800/50'
                      : 'border-gray-200/50 bg-white/70'
                    } backdrop-blur-lg ${openFaq === index
                      ? darkMode ? 'shadow-lg shadow-purple-500/5' : 'shadow-lg shadow-purple-500/10'
                      : ''
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/50'
                      }`}
                  >
                    <span className={`font-semibold pr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        } ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className={`px-6 pb-5 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  )
}
