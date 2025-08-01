import { useState, useEffect } from 'react'

interface RoadmapScreenProps {
  onBack: () => void
  darkMode: boolean
}

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'planned' | 'future'
  category: 'core' | 'ui' | 'performance' | 'developer-experience' | 'integration'
  version: string
  date?: string
  icon: React.ReactNode
  features?: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export default function RoadmapScreen({ onBack, darkMode }: RoadmapScreenProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'planned' | 'future'>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'core' | 'ui' | 'performance' | 'developer-experience' | 'integration'>('all')
  const [visibleItems, setVisibleItems] = useState<string[]>([])

  const roadmapData: RoadmapItem[] = [
    // Completed Features
    {
      id: 'basic-theme-generation',
      title: 'Basic Theme Generation',
      description: 'Core theme generation functionality with Material 3 compliance',
      status: 'completed',
      category: 'core',
      version: 'v1.0',
      date: 'July 15, 2025',
      priority: 'critical',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: [
        'Material 3 Theme Data generation',
        'Light and Dark theme variants',
        'Color scheme generation',
        'Typography and spacing'
      ]
    },
    {
      id: 'logo-color-extraction',
      title: 'Logo Color Extraction',
      description: 'Advanced color extraction from uploaded logos using sophisticated algorithms',
      status: 'completed',
      category: 'core',
      version: 'v1.1',
      date: 'July 20, 2025',
      priority: 'high',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        'Dominant color extraction',
        'Color palette generation',
        'Brand color optimization',
        'Multiple file format support'
      ]
    },
    {
      id: 'live-preview',
      title: 'Live Theme Preview',
      description: 'Real-time preview of generated themes with interactive widget demonstrations',
      status: 'completed',
      category: 'ui',
      version: 'v1.2',
      date: 'July 25, 2025',
      priority: 'high',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      features: [
        'Real-time theme updates',
        'Widget preview gallery',
        'Interactive components',
        'Responsive design preview'
      ]
    },
    {
      id: 'enhanced-ui',
      title: 'Enhanced User Interface',
      description: 'Modern, responsive UI with dark mode support and smooth animations',
      status: 'completed',
      category: 'ui',
      version: 'v1.3',
      date: 'July 28, 2025',
      priority: 'medium',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: [
        'Dark/Light mode toggle',
        'Smooth animations',
        'Responsive layouts',
        'Modern design patterns'
      ]
    },
    {
      id: 'documentation-guide',
      title: 'Comprehensive Documentation',
      description: 'Complete guide system with tutorials, examples, and best practices',
      status: 'completed',
      category: 'developer-experience',
      version: 'v1.4',
      date: 'July 30, 2025',
      priority: 'high',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        'Getting started guide',
        'Implementation tutorials',
        'Widget examples',
        'Best practices'
      ]
    },

    // In Progress Features
    {
      id: 'roadmap-visualization',
      title: 'Interactive Roadmap',
      description: 'Beautiful, animated roadmap showing project progress and future plans',
      status: 'in-progress',
      category: 'ui',
      version: 'v1.5',
      date: 'August 1, 2025',
      priority: 'medium',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        'Visual timeline',
        'Progress tracking',
        'Feature categorization',
        'Priority indicators'
      ]
    },

    // Planned Features
    {
      id: 'custom-widgets',
      title: 'Custom Widget Theming',
      description: 'Support for theming custom widgets and third-party packages',
      status: 'planned',
      category: 'core',
      version: 'v2.0',
      date: 'August 15, 2025',
      priority: 'high',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      features: [
        'Widget-specific theming',
        'Third-party package support',
        'Custom component themes',
        'Advanced styling options'
      ]
    },
    {
      id: 'theme-presets',
      title: 'Theme Presets Library',
      description: 'Curated collection of professional theme presets and templates',
      status: 'planned',
      category: 'ui',
      version: 'v2.1',
      date: 'September 1, 2025',
      priority: 'medium',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      features: [
        'Professional presets',
        'Industry-specific themes',
        'One-click application',
        'Community contributions'
      ]
    },
    {
      id: 'export-optimization',
      title: 'Advanced Export Options',
      description: 'Multiple export formats and optimization features for better performance',
      status: 'planned',
      category: 'performance',
      version: 'v2.2',
      date: 'September 15, 2025',
      priority: 'high',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        'Multiple export formats',
        'Code optimization',
        'Tree-shaking support',
        'Bundle size analysis'
      ]
    },

    // Future Features
    {
      id: 'ai-theme-generation',
      title: 'AI-Powered Theme Generation',
      description: 'Machine learning algorithms for intelligent theme generation and color harmony',
      status: 'future',
      category: 'core',
      version: 'v3.0',
      date: 'October 2025',
      priority: 'critical',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: [
        'ML-based color harmony',
        'Context-aware theming',
        'Accessibility optimization',
        'Brand guideline adherence'
      ]
    },
    {
      id: 'collaboration-tools',
      title: 'Team Collaboration',
      description: 'Real-time collaboration features for design teams and developers',
      status: 'future',
      category: 'developer-experience',
      version: 'v3.1',
      date: 'November 2025',
      priority: 'medium',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        'Real-time collaboration',
        'Team workspaces',
        'Version control',
        'Comment system'
      ]
    },
    {
      id: 'cloud-integration',
      title: 'Cloud Integration',
      description: 'Cloud-based theme storage, sharing, and synchronization across devices',
      status: 'future',
      category: 'integration',
      version: 'v3.2',
      date: 'December 2025',
      priority: 'medium',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      features: [
        'Cloud storage',
        'Cross-device sync',
        'Theme sharing',
        'Backup & restore'
      ]
    },
    {
      id: 'vscode-extension',
      title: 'VS Code Extension',
      description: 'Direct integration with VS Code for seamless development workflow',
      status: 'future',
      category: 'integration',
      version: 'v3.3',
      date: 'January 2026',
      priority: 'high',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: [
        'VS Code integration',
        'Live theme preview',
        'Code generation',
        'Project templates'
      ]
    },
    {
      id: 'mobile-app',
      title: 'Mobile Companion App',
      description: 'Native mobile app for on-the-go theme creation and management',
      status: 'future',
      category: 'ui',
      version: 'v4.0',
      date: 'Q2 2026',
      priority: 'low',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        'Native mobile app',
        'Touch-optimized UI',
        'Camera color extraction',
        'Offline capabilities'
      ]
    }
  ]

  const filteredItems = roadmapData.filter(item => {
    const statusMatch = filter === 'all' || item.status === filter
    const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter
    return statusMatch && categoryMatch
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(filteredItems.map(item => item.id))
    }, 100)
    return () => clearTimeout(timer)
  }, [filteredItems])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500'
      case 'in-progress':
        return 'from-blue-500 to-cyan-500'
      case 'planned':
        return 'from-yellow-500 to-orange-500'
      case 'future':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'in-progress':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'planned':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9m0 0V3" />
          </svg>
        )
      case 'future':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const statusCounts = {
    completed: roadmapData.filter(item => item.status === 'completed').length,
    'in-progress': roadmapData.filter(item => item.status === 'in-progress').length,
    planned: roadmapData.filter(item => item.status === 'planned').length,
    future: roadmapData.filter(item => item.status === 'future').length
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-lg border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Project Roadmap
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  Track our progress and upcoming features
                </p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="hidden md:flex items-center space-x-6">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {count}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
                    {status.replace('-', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status:
              </span>
              {['all', 'completed', 'in-progress', 'planned', 'future'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    filter === status
                      ? `bg-gradient-to-r ${getStatusColor(status)} text-white shadow-lg`
                      : darkMode
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      : 'bg-gray-200/50 text-gray-600 hover:bg-gray-300/50'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category:
              </span>
              {['all', 'core', 'ui', 'performance', 'developer-experience', 'integration'].map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    categoryFilter === category
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : darkMode
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      : 'bg-gray-200/50 text-gray-600 hover:bg-gray-300/50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />

          {/* Roadmap Items */}
          <div className="space-y-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`relative pl-20 transform transition-all duration-700 ${
                  visibleItems.includes(item.id)
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-6 -ml-2 w-4 h-4 rounded-full bg-gradient-to-r ${getStatusColor(item.status)} shadow-lg flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* Content Card */}
                <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-2xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} hover:shadow-2xl transition-all duration-300 group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStatusColor(item.status)} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-sm font-medium px-2 py-1 rounded-full bg-gradient-to-r ${getStatusColor(item.status)} text-white flex items-center space-x-1`}>
                            {getStatusIcon(item.status)}
                            <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}</span>
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {item.version}
                          </span>
                          {item.date && (
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {item.date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} title={`${item.priority} priority`} />
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                    {item.description}
                  </p>

                  {item.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div
              key={status}
              className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-2xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} text-center`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${getStatusColor(status)} flex items-center justify-center text-white shadow-lg`}>
                {getStatusIcon(status)}
              </div>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {count}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
                {status.replace('-', ' ')} Features
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
