import { PreviewModeToggleProps, PreviewMode } from './types'

export default function PreviewModeToggle({ mode, onChange, theme }: PreviewModeToggleProps) {
  const toggleOptions = [
    {
      key: 'widgets' as PreviewMode,
      label: 'Widget Gallery',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Individual Flutter widgets'
    },
    {
      key: 'app' as PreviewMode,
      label: 'Live App Preview',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Complete app experience'
    }
  ]

  return (
    <div 
      className="flex items-center justify-center p-1 rounded-lg"
      style={{ backgroundColor: theme.surfaceContainer }}
    >
      {toggleOptions.map((option) => (
        <button
          key={option.key}
          onClick={() => onChange(option.key)}
          className="relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
          style={{
            backgroundColor: mode === option.key ? theme.primary : 'transparent',
            color: mode === option.key ? theme.onPrimary : theme.onSurfaceVariant
          }}
          title={option.description}
        >
          {option.icon}
          <span className="hidden sm:inline">{option.label}</span>
          
          {mode === option.key && (
            <div 
              className="absolute inset-0 rounded-md pointer-events-none opacity-20"
              style={{ backgroundColor: theme.primaryContainer }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
