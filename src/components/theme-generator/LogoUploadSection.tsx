import { useRef } from 'react'

interface LogoUploadSectionProps {
  uploadedLogo: File | null
  extractedColors: string[]
  onLogoUpload: (file: File) => void
  onLogoRemove: () => void
  darkMode: boolean
}

export default function LogoUploadSection({ 
  uploadedLogo, 
  extractedColors, 
  onLogoUpload, 
  onLogoRemove, 
  darkMode 
}: LogoUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Logo & Color Extraction
      </h2>
      
      <div className="space-y-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            darkMode 
              ? 'border-gray-600 hover:border-purple-500 bg-gray-700/30' 
              : 'border-gray-300 hover:border-purple-500 bg-gray-50/50'
          }`}
        >
          {uploadedLogo ? (
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={URL.createObjectURL(uploadedLogo)} 
                  alt="Uploaded logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {uploadedLogo.name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLogoRemove()
                }}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Upload Logo or Image
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  PNG, JPG, SVG up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onLogoUpload(file)
          }}
          className="hidden"
        />

        {extractedColors.length > 0 && (
          <div>
            <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Extracted Colors
            </h3>
            <div className="flex flex-wrap gap-3">
              {extractedColors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <span className={`text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
