import { WidgetPreviewsProps } from './PreviewScreenTypes'
import AppBarPreview from './widgets/AppBarPreview'
import ButtonsPreview from './widgets/ButtonsPreview'
import FormControlsPreview from './widgets/FormControlsPreview'
import CardsPreview from './widgets/CardsPreview'
import ProgressPreview from './widgets/ProgressPreview'
import TypographyPreview from './widgets/TypographyPreview'

export default function WidgetPreviews({ currentColors, previewMode }: WidgetPreviewsProps) {
  return (
    <div 
      className={`rounded-xl p-8 border transition-all duration-300 ${
        previewMode === 'light' 
          ? 'border-gray-200' 
          : 'border-gray-600'
      }`}
      style={{ 
        backgroundColor: currentColors.background,
        color: currentColors.onBackground 
      }}
    >
      <div className="space-y-8">
        <AppBarPreview currentColors={currentColors} previewMode={previewMode} />
        <ButtonsPreview currentColors={currentColors} previewMode={previewMode} />
        <FormControlsPreview currentColors={currentColors} previewMode={previewMode} />
        <CardsPreview currentColors={currentColors} previewMode={previewMode} />
        <ProgressPreview currentColors={currentColors} previewMode={previewMode} />
        <TypographyPreview currentColors={currentColors} previewMode={previewMode} />
      </div>
    </div>
  )
}
