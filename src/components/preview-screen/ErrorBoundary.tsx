import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  darkMode?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class PreviewErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Preview Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div 
          className={`rounded-xl p-8 border text-center ${
            this.props.darkMode 
              ? 'bg-red-900/20 border-red-700/50 text-red-300' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">
            Preview Error
          </h3>
          <p className="text-sm opacity-80 mb-4">
            Something went wrong while rendering the theme preview.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              this.props.darkMode
                ? 'bg-red-700 hover:bg-red-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Try Again
          </button>
          {this.state.error && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
              <pre className="mt-2 text-xs p-3 rounded bg-black/20 overflow-auto">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
