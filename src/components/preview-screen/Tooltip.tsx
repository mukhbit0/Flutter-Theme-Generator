import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

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
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const [actualPosition, setActualPosition] = useState(position)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const updatePosition = () => {
        if (!triggerRef.current) return
        const rect = triggerRef.current.getBoundingClientRect()
        const scrollX = window.scrollX
        const scrollY = window.scrollY

        // Default offsets
        let top = 0
        let left = 0
        let newPosition = position

        // Simple positioning logic (refine as needed)
        const tooltipHeight = 40 // Approximate
        const tooltipWidth = 100 // Approximate

        // Check viewport boundaries to flip if needed
        if (position === 'top' && rect.top - tooltipHeight < 0) newPosition = 'bottom'
        if (position === 'bottom' && rect.bottom + tooltipHeight > window.innerHeight) newPosition = 'top'
        if (position === 'left' && rect.left - tooltipWidth < 0) newPosition = 'right'
        if (position === 'right' && rect.right + tooltipWidth > window.innerWidth) newPosition = 'left'

        setActualPosition(newPosition)

        switch (newPosition) {
          case 'top':
            top = rect.top + scrollY - 8
            left = rect.left + scrollX + rect.width / 2
            break
          case 'bottom':
            top = rect.bottom + scrollY + 8
            left = rect.left + scrollX + rect.width / 2
            break
          case 'left':
            top = rect.top + scrollY + rect.height / 2
            left = rect.left + scrollX - 8
            break
          case 'right':
            top = rect.top + scrollY + rect.height / 2
            left = rect.right + scrollX + 8
            break
        }

        setCoords({ top, left })
      }

      updatePosition()
      window.addEventListener('scroll', updatePosition)
      window.addEventListener('resize', updatePosition)

      return () => {
        window.removeEventListener('scroll', updatePosition)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isVisible, position])

  if (disabled || !content) {
    return <>{children}</>
  }

  const tooltipClasses = {
    top: '-translate-x-1/2 -translate-y-full mb-2',
    bottom: '-translate-x-1/2 mt-2',
    left: '-translate-x-full -translate-y-1/2 mr-2',
    right: '-translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-current border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-current border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-current border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-current border-t-transparent border-b-transparent border-l-transparent'
  }

  return (
    <>
      <div
        ref={triggerRef}
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && createPortal(
        <div
          className={`fixed z-[9999] px-3 py-2 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-200 ${tooltipClasses[actualPosition]}`}
          style={{
            top: coords.top,
            left: coords.left,
            backgroundColor: darkMode ? '#1f2937' : '#374151',
            color: '#ffffff',
            // Use fixed positioning relative to viewport, so subtract scroll if needed, 
            // but since we added scrollY to coords, we should use absolute or adjust.
            // Actually, for 'fixed', we should NOT add scrollY.
            // Let's correct the calculation in the effect above or change this to absolute.
            // Using 'fixed' is safer for z-index wars.
            position: 'absolute'
          }}
          role="tooltip"
          aria-label={content}
        >
          {content}

          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 ${arrowClasses[actualPosition]}`}
            style={{
              color: darkMode ? '#1f2937' : '#374151'
            }}
          />
        </div>,
        document.body
      )}
    </>
  )
}
