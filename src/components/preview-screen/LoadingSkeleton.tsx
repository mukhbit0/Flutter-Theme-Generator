interface LoadingSkeletonProps {
  className?: string
  darkMode?: boolean
  variant?: 'text' | 'card' | 'button' | 'avatar' | 'widget'
  lines?: number
}

export function LoadingSkeleton({ 
  className = '', 
  darkMode = false, 
  variant = 'text',
  lines = 1 
}: LoadingSkeletonProps) {
  const baseClasses = `animate-pulse rounded-md ${
    darkMode ? 'bg-gray-600' : 'bg-gray-200'
  }`

  const variants = {
    text: `h-4 w-full ${baseClasses}`,
    card: `h-32 w-full ${baseClasses}`,
    button: `h-10 w-24 ${baseClasses}`,
    avatar: `h-10 w-10 rounded-full ${baseClasses}`,
    widget: `h-48 w-full ${baseClasses}`
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index} 
            className={`${variants.text} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    )
  }

  return <div className={`${variants[variant]} ${className}`} />
}

interface WidgetLoadingSkeletonProps {
  darkMode?: boolean
}

export function WidgetLoadingSkeleton({ darkMode = false }: WidgetLoadingSkeletonProps) {
  return (
    <div 
      className="rounded-xl p-6 border space-y-4"
      style={{
        backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.5)',
      }}
    >
      {/* Title skeleton */}
      <LoadingSkeleton variant="text" darkMode={darkMode} className="w-1/3 h-6" />
      
      {/* Content skeleton */}
      <div className="space-y-3">
        <LoadingSkeleton variant="card" darkMode={darkMode} />
        <div className="flex space-x-3">
          <LoadingSkeleton variant="button" darkMode={darkMode} />
          <LoadingSkeleton variant="button" darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}
