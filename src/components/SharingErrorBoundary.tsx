/**
 * SharingErrorBoundary - Completely isolates sharing functionality
 * Prevents any sharing errors from affecting the rest of the application
 */

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: any
}

export class SharingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('[SharingErrorBoundary] Sharing component error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // Log to external service in production
    // TODO: Send to error tracking service in production
    console.error('Sharing Error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or use provided fallback
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Sharing Temporarily Unavailable
            </h3>
            <p className="text-orange-700 dark:text-orange-300 mb-4 max-w-md">
              The theme sharing feature encountered an error and has been temporarily disabled 
              to prevent any issues with the rest of the application.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              
              <div className="text-sm text-orange-600 dark:text-orange-400">
                <p>You can still:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Generate and download themes normally</li>
                  <li>Use all other app features</li>
                  <li>Save themes locally</li>
                </ul>
              </div>
            </div>
            
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm font-medium text-orange-700 dark:text-orange-300">
                  Developer Info (Click to expand)
                </summary>
                <div className="mt-2 p-3 bg-orange-100 dark:bg-orange-900/40 rounded border text-xs font-mono text-orange-800 dark:text-orange-200 overflow-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div className="mb-2">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </div>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default SharingErrorBoundary
