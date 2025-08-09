/**
 * SharingPanel - Modular sharing integration
 * Safe wrapper that can be added anywhere without affecting other components
 */

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Share2, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import ShareThemeComponent from './ShareThemeComponent'
import SharingErrorBoundary from './SharingErrorBoundary'

interface SharingPanelProps {
  className?: string
  buttonClassName?: string
  panelClassName?: string
  showButton?: boolean
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export const SharingPanel: React.FC<SharingPanelProps> = ({
  className = '',
  buttonClassName = '',
  panelClassName = '',
  showButton = true,
  isOpen: controlledIsOpen,
  onToggle
}) => {
  const { themeConfig } = useTheme()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onToggle || setInternalIsOpen

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      {showButton && (
        <button
          onClick={handleToggle}
          className={`
            inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
            text-white rounded-lg transition-colors duration-200 font-medium
            shadow-sm hover:shadow-md focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
            ${buttonClassName}
          `}
          title="Share this theme"
          aria-label="Share theme"
        >
          <Share2 className="w-4 h-4" />
          {/* Only show text if buttonClassName doesn't contain 'p-2' (icon-only style) */}
          {!buttonClassName.includes('p-2') && 'Share Theme'}
        </button>
      )}

      {/* Sharing Panel */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-[9998]" 
            onClick={handleClose}
            aria-hidden="true"
          />
          
          {/* Panel Container */}
          <div className="flex min-h-full items-center justify-center p-4 relative z-[9999]">
            <div 
              className={`
                relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden
                bg-white dark:bg-gray-800 rounded-xl shadow-2xl
                transform transition-all duration-200
                [&::-webkit-scrollbar]:hidden
                ${panelClassName}
              `}
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE and Edge */
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-[10000] p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close sharing panel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Sharing Component with Error Boundary */}
              <SharingErrorBoundary>
                <ShareThemeComponent
                  themeConfig={themeConfig}
                  themeName="My Theme"
                  className="border-0 shadow-none"
                />
              </SharingErrorBoundary>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// Compact version for toolbars
export const CompactSharingButton: React.FC<{
  className?: string
  iconOnly?: boolean
}> = ({ className = '', iconOnly = false }) => {
  return (
    <SharingPanel
      className={className}
      buttonClassName={`
        ${iconOnly ? 'p-2' : 'px-3 py-2'} 
        bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 
        text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700
        hover:border-blue-300 dark:hover:border-blue-600
      `}
      showButton={true}
    />
  )
}

// Inline version for cards
export const InlineSharingPanel: React.FC<{
  className?: string
  isOpen: boolean
  onToggle: (isOpen: boolean) => void
}> = ({ className = '', isOpen, onToggle }) => {
  return (
    <SharingPanel
      className={className}
      showButton={false}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  )
}

export default SharingPanel
