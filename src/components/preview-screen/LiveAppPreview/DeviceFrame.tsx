import { useState } from 'react'

// Device specifications
const DEVICE_SPECS = {
  'iphone-15-pro': {
    name: 'iPhone 15 Pro',
    brand: 'apple',
    frame: { width: 393, height: 852 },
    screen: { width: 383, height: 832 },
    borderRadius: '24px',
    screenRadius: '20px',
    notch: true
  },
  'iphone-14': {
    name: 'iPhone 14',
    brand: 'apple', 
    frame: { width: 390, height: 844 },
    screen: { width: 380, height: 824 },
    borderRadius: '22px',
    screenRadius: '18px',
    notch: true
  },
  'samsung-s24-ultra': {
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'samsung',
    frame: { width: 384, height: 862 },
    screen: { width: 374, height: 842 },
    borderRadius: '16px',
    screenRadius: '12px',
    notch: false
  },
  'samsung-s23': {
    name: 'Samsung Galaxy S23',
    brand: 'samsung',
    frame: { width: 360, height: 780 },
    screen: { width: 350, height: 760 },
    borderRadius: '14px',
    screenRadius: '10px',
    notch: false
  },
  'custom': {
    name: 'Custom Device',
    brand: 'custom',
    frame: { width: 375, height: 812 },
    screen: { width: 365, height: 792 },
    borderRadius: '16px',
    screenRadius: '12px',
    notch: false
  }
}

const DEVICE_BRANDS = {
  apple: [
    { id: 'iphone-15-pro', name: 'iPhone 15 Pro' },
    { id: 'iphone-14', name: 'iPhone 14' }
  ],
  samsung: [
    { id: 'samsung-s24-ultra', name: 'Galaxy S24 Ultra' },
    { id: 'samsung-s23', name: 'Galaxy S23' }
  ],
  other: [
    { id: 'custom', name: 'Custom Device' }
  ]
}

interface DeviceFrameProps {
  children: React.ReactNode
  theme: any
  darkMode: boolean
  className?: string
}

function DeviceFrame({ 
  children, 
  theme, 
  darkMode, 
  className = '' 
}: DeviceFrameProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>('samsung-s24-ultra')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [customWidth, setCustomWidth] = useState(375)
  const [customHeight, setCustomHeight] = useState(812)

  const deviceSpec = DEVICE_SPECS[selectedDevice as keyof typeof DEVICE_SPECS]

  // Site dark mode colors (not theme colors)
  const siteColors = {
    bg: darkMode ? '#1f2937' : '#ffffff',
    card: darkMode ? '#374151' : '#f9fafb',
    text: darkMode ? '#e5e7eb' : '#374151',
    border: darkMode ? '#4b5563' : '#e5e7eb',
    selected: darkMode ? '#4f46e5' : '#6366f1'
  }

  // Get brand colors for the device frame
  const getBrandColors = (brand: string) => {
    switch (brand) {
      case 'apple':
        return { frame: '#1d1d1f', accent: '#007aff' }
      case 'samsung':
        return { frame: '#1a1a1a', accent: '#1976d2' }
      case 'custom':
        return { frame: '#2c3e50', accent: '#3498db' }
      default:
        return { frame: '#2c3e50', accent: '#3498db' }
    }
  }

  const brandColors = getBrandColors(deviceSpec.brand)

  // Use custom dimensions for custom device
  const frameWidth = selectedDevice === 'custom' ? customWidth : deviceSpec.frame.width
  const frameHeight = selectedDevice === 'custom' ? customHeight : deviceSpec.frame.height

  return (
    <div className={`w-full ${className}`}>
      {/* Device Selector */}
      <div className="mb-6">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-3 rounded-lg border text-left flex items-center justify-between"
            style={{
              backgroundColor: siteColors.card,
              borderColor: siteColors.border,
              color: siteColors.text
            }}
          >
            <span className="font-medium">{deviceSpec.name}</span>
            <svg 
              className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-lg z-50 max-h-96 overflow-y-auto"
              style={{
                backgroundColor: siteColors.card,
                borderColor: siteColors.border
              }}
            >
              {/* iPhone Section */}
              <div className="p-2">
                <div className="px-3 py-2 text-sm font-semibold" style={{ color: siteColors.text }}>
                  iPhone
                </div>
                {DEVICE_BRANDS.apple.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => {
                      setSelectedDevice(device.id)
                      setIsDropdownOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded text-sm hover:bg-opacity-10 hover:bg-gray-500"
                    style={{
                      backgroundColor: selectedDevice === device.id ? siteColors.selected : 'transparent',
                      color: selectedDevice === device.id ? '#ffffff' : siteColors.text
                    }}
                  >
                    {device.name}
                  </button>
                ))}
              </div>

              {/* Samsung Section */}
              <div className="p-2 border-t" style={{ borderColor: siteColors.border }}>
                <div className="px-3 py-2 text-sm font-semibold" style={{ color: siteColors.text }}>
                  Samsung Galaxy
                </div>
                {DEVICE_BRANDS.samsung.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => {
                      setSelectedDevice(device.id)
                      setIsDropdownOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded text-sm hover:bg-opacity-10 hover:bg-gray-500"
                    style={{
                      backgroundColor: selectedDevice === device.id ? siteColors.selected : 'transparent',
                      color: selectedDevice === device.id ? '#ffffff' : siteColors.text
                    }}
                  >
                    {device.name}
                  </button>
                ))}
              </div>

              {/* Other Devices Section */}
              <div className="p-2 border-t" style={{ borderColor: siteColors.border }}>
                <div className="px-3 py-2 text-sm font-semibold" style={{ color: siteColors.text }}>
                  Other Devices
                </div>
                {DEVICE_BRANDS.other.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => {
                      setSelectedDevice(device.id)
                      setIsDropdownOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded text-sm hover:bg-opacity-10 hover:bg-gray-500"
                    style={{
                      backgroundColor: selectedDevice === device.id ? siteColors.selected : 'transparent',
                      color: selectedDevice === device.id ? '#ffffff' : siteColors.text
                    }}
                  >
                    {device.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Size Controls */}
        {selectedDevice === 'custom' && (
          <div className="mt-4 p-4 rounded-lg border" style={{
            backgroundColor: siteColors.card,
            borderColor: siteColors.border
          }}>
            <div className="text-sm font-medium mb-3" style={{ color: siteColors.text }}>
              Custom Device Size
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1" style={{ color: siteColors.text }}>
                  Width (px)
                </label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  className="w-full p-2 rounded border text-sm"
                  style={{
                    backgroundColor: siteColors.bg,
                    borderColor: siteColors.border,
                    color: siteColors.text
                  }}
                  min="200"
                  max="500"
                />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: siteColors.text }}>
                  Height (px)
                </label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Number(e.target.value))}
                  className="w-full p-2 rounded border text-sm"
                  style={{
                    backgroundColor: siteColors.bg,
                    borderColor: siteColors.border,
                    color: siteColors.text
                  }}
                  min="400"
                  max="1000"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Device Preview */}
      <div className="flex items-center justify-center p-8">
        <div 
          className="relative shadow-2xl"
          style={{ 
            width: `${Math.min(frameWidth, 420)}px`,
            height: `${Math.min(frameHeight, 700)}px`,
            backgroundColor: darkMode ? brandColors.frame : '#2c3e50',
            borderRadius: deviceSpec.borderRadius,
            border: `2px solid ${brandColors.accent}20`
          }}
        >
          {/* Screen Bezel */}
          <div 
            className="absolute inset-3 bg-black overflow-hidden"
            style={{ borderRadius: deviceSpec.screenRadius }}
          >
            {/* Notch (for applicable devices) */}
            {deviceSpec.notch && (
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 rounded-b-xl z-10"
                style={{ backgroundColor: brandColors.frame }}
              />
            )}

            {/* Screen Content */}
            <div className="w-full h-full bg-white overflow-hidden relative">
              {children}
            </div>
          </div>
          
          {/* Device Info Badge */}
          <div 
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium shadow-lg border"
            style={{ 
              backgroundColor: siteColors.card,
              color: siteColors.text,
              borderColor: brandColors.accent + '40'
            }}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: brandColors.accent }}
              />
              <span>{deviceSpec.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceFrame
