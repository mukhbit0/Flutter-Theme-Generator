import { useState, useRef, useEffect } from 'react'
import { DESIGN_CONSTANTS } from './constants'

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
  darkMode?: boolean
}

export function Tooltip({ 
  children, 
  content, 
  position = 'top', 
  disabled = false,
  darkMode = false 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [actualPosition, setActualPosition] = useState(position)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const tooltip = tooltipRef.current
      const trigger = triggerRef.current
      const rect = trigger.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      
      // Auto-adjust position if tooltip would be clipped
      let newPosition = position
      
      if (position === 'top' && rect.top - tooltipRect.height < 10) {
        newPosition = 'bottom'
      } else if (position === 'bottom' && rect.bottom + tooltipRect.height > window.innerHeight - 10) {
        newPosition = 'top'
      } else if (position === 'left' && rect.left - tooltipRect.width < 10) {
        newPosition = 'right'
      } else if (position === 'right' && rect.right + tooltipRect.width > window.innerWidth - 10) {
        newPosition = 'left'
      }
      
      setActualPosition(newPosition)
    }
  }, [isVisible, position])

  if (disabled || !content) {
    return <>{children}</>
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
  }

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 text-sm font-medium rounded-lg shadow-lg transition-opacity duration-200 whitespace-nowrap ${positionClasses[actualPosition]}`}
          style={{
            backgroundColor: darkMode ? '#1f2937' : '#374151',
            color: '#ffffff',
            zIndex: DESIGN_CONSTANTS.Z_INDEX.TOOLTIP
          }}
          role="tooltip"
          aria-label={content}
        >
          {content}
          
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 ${arrowClasses[actualPosition]}`}
            style={{
              borderColor: darkMode ? '#1f2937' : '#374151',
              borderTopColor: actualPosition === 'bottom' ? 'transparent' : (darkMode ? '#1f2937' : '#374151'),
              borderBottomColor: actualPosition === 'top' ? 'transparent' : (darkMode ? '#1f2937' : '#374151'),
              borderLeftColor: actualPosition === 'right' ? 'transparent' : (darkMode ? '#1f2937' : '#374151'),
              borderRightColor: actualPosition === 'left' ? 'transparent' : (darkMode ? '#1f2937' : '#374151'),
            }}
          />
        </div>
      )}
    </div>
  )
}
