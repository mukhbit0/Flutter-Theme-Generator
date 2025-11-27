import { useState, useEffect } from 'react';
import { Story } from '../../../../data/socialMediaData';
import { CloseIcon, HeartIcon, ShareIcon } from '../../../common/icons';

interface StoryViewerProps {
    stories: Story[];
    activeStoryId: number;
    onClose: () => void;
}

export default function StoryViewer({
    stories,
    activeStoryId,
    onClose,
}: StoryViewerProps) {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(
        stories.findIndex(s => s.id === activeStoryId)
    );
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentStory = stories[currentStoryIndex];

    // Progress timer
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    // Go to next story
                    if (currentStoryIndex < stories.length - 1) {
                        setCurrentStoryIndex(currentStoryIndex + 1);
                        return 0;
                    } else {
                        onClose();
                        return 100;
                    }
                }
                return prev + 0.5;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [isPaused, currentStoryIndex, stories.length, onClose]);

    // Reset progress on story change
    useEffect(() => {
        setProgress(0);
    }, [currentStoryIndex]);

    const handleTap = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;

        if (x < width / 3) {
            // Previous story
            if (currentStoryIndex > 0) {
                setCurrentStoryIndex(currentStoryIndex - 1);
            }
        } else if (x > (width * 2) / 3) {
            // Next story
            if (currentStoryIndex < stories.length - 1) {
                setCurrentStoryIndex(currentStoryIndex + 1);
            } else {
                onClose();
            }
        }
    };

    const handleMouseDown = () => setIsPaused(true);
    const handleMouseUp = () => setIsPaused(false);

    if (!currentStory) return null;

    return (
        <div 
            className="absolute inset-0 z-50 bg-black flex flex-col"
            onClick={handleTap}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            {/* Progress Bars */}
            <div className="absolute top-0 left-0 right-0 z-20 flex space-x-1 px-2 pt-2">
                {stories.filter(s => s.active).map((_, index) => (
                    <div 
                        key={index}
                        className="flex-1 h-0.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                    >
                        <div 
                            className="h-full rounded-full"
                            style={{ 
                                backgroundColor: '#fff',
                                width: index < currentStoryIndex ? '100%' : 
                                       index === currentStoryIndex ? `${progress}%` : '0%',
                                transition: index === currentStoryIndex ? 'width 30ms linear' : 'none'
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Story Header */}
            <div className="absolute top-6 left-0 right-0 z-20 px-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img 
                        src={currentStory.image} 
                        alt={currentStory.user} 
                        className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                    />
                    <div>
                        <span className="text-white font-semibold text-sm">{currentStory.user}</span>
                        <span className="text-white/70 text-xs ml-2">2h</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={(e) => { e.stopPropagation(); }} aria-label="More options">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close">
                        <CloseIcon className="w-7 h-7 text-white" />
                    </button>
                </div>
            </div>

            {/* Story Image */}
            <div 
                className="flex-1 bg-cover bg-center"
                style={{ 
                    backgroundImage: `url(${currentStory.image})`,
                }}
            />

            {/* Story Footer */}
            <div className="absolute bottom-4 left-0 right-0 z-20 px-4">
                <div className="flex items-center space-x-3">
                    <div 
                        className="flex-1 rounded-full px-4 py-3 text-white text-sm"
                        style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
                    >
                        Send message
                    </div>
                    <button 
                        className="p-2 hover:scale-110 transition-transform"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Like"
                    >
                        <HeartIcon className="w-7 h-7 text-white" />
                    </button>
                    <button 
                        className="p-2 hover:scale-110 transition-transform"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Share"
                    >
                        <ShareIcon className="w-7 h-7 text-white" />
                    </button>
                </div>
            </div>

            {/* Pause Indicator */}
            {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}
