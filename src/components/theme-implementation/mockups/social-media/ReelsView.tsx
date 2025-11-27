import { useState, useRef, useEffect } from 'react';
import { ThemeColors } from '../../../../types/theme';
import { Reel } from '../../../../data/socialMediaData';
import { VerifiedBadge } from '../../../common';
import { HeartIcon, CommentIcon, ShareIcon, MoreIcon, MusicIcon } from '../../../common/icons';

interface ReelsViewProps {
    colors: ThemeColors;
    reels: Reel[];
    likedPosts: Set<number>;
    followedUsers: Set<string>;
    activeReelIndex: number;
    onToggleLike: (id: number) => void;
    onToggleFollow: (user: string) => void;
    onNextReel: () => void;
    onPrevReel: () => void;
}

export default function ReelsView({
    colors,
    reels,
    likedPosts,
    followedUsers,
    activeReelIndex,
    onToggleLike,
    onToggleFollow,
    onNextReel,
    onPrevReel,
}: ReelsViewProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeReel = reels[activeReelIndex];

    // Simulate video progress
    useEffect(() => {
        if (!isPlaying) return;
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    onNextReel();
                    return 0;
                }
                return prev + 0.5;
            });
        }, 50);
        
        return () => clearInterval(interval);
    }, [isPlaying, onNextReel]);

    // Reset progress when reel changes
    useEffect(() => {
        setProgress(0);
    }, [activeReelIndex]);

    const handleTap = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        
        if (x < width / 3) {
            onPrevReel();
        } else if (x > (width * 2) / 3) {
            onNextReel();
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div 
            ref={containerRef}
            className="h-full relative overflow-hidden cursor-pointer"
            onClick={handleTap}
            style={{ backgroundColor: '#000' }}
        >
            {/* Progress Bars */}
            <div className="absolute top-0 left-0 right-0 z-20 flex space-x-1 px-2 pt-2">
                {reels.map((_, index) => (
                    <div 
                        key={index}
                        className="flex-1 h-0.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                    >
                        <div 
                            className="h-full rounded-full transition-all duration-100"
                            style={{ 
                                backgroundColor: '#fff',
                                width: index < activeReelIndex ? '100%' : 
                                       index === activeReelIndex ? `${progress}%` : '0%' 
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Reel Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeReel.thumbnail})` }}
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Play/Pause Indicator */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Right Actions */}
            <div className="absolute right-3 bottom-24 space-y-6 z-10">
                <button 
                    className="flex flex-col items-center transition-transform hover:scale-110"
                    onClick={(e) => { e.stopPropagation(); onToggleLike(activeReel.id); }}
                    aria-label={likedPosts.has(activeReel.id) ? 'Unlike' : 'Like'}
                >
                    <HeartIcon 
                        className={`w-8 h-8 ${likedPosts.has(activeReel.id) ? 'animate-bounce' : ''}`}
                        style={{ color: likedPosts.has(activeReel.id) ? colors.error : '#fff' }}
                        filled={likedPosts.has(activeReel.id)}
                    />
                    <span className="text-white text-xs font-medium mt-1">
                        {(activeReel.likes / 1000).toFixed(1)}K
                    </span>
                </button>
                
                <button 
                    className="flex flex-col items-center transition-transform hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Comments"
                >
                    <CommentIcon className="w-8 h-8 text-white" />
                    <span className="text-white text-xs font-medium mt-1">
                        {activeReel.comments}
                    </span>
                </button>
                
                <button 
                    className="flex flex-col items-center transition-transform hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Share"
                >
                    <ShareIcon className="w-8 h-8 text-white" />
                    <span className="text-white text-xs font-medium mt-1">Share</span>
                </button>
                
                <button 
                    className="flex flex-col items-center transition-transform hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="More options"
                >
                    <MoreIcon className="w-8 h-8 text-white" />
                </button>

                {/* Music Disc */}
                <div className="relative">
                    <div 
                        className={`w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden ${isPlaying ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '3s' }}
                    >
                        <img 
                            src={activeReel.avatar} 
                            alt="Music" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute left-4 right-20 bottom-6 z-10">
                <div className="flex items-center space-x-3 mb-3">
                    <img 
                        src={activeReel.avatar} 
                        alt={activeReel.user} 
                        className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                    />
                    <span className="text-white font-bold text-sm flex items-center">
                        {activeReel.user}
                        {activeReel.verified && <VerifiedBadge className="ml-1" />}
                    </span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleFollow(activeReel.user); }}
                        className={`px-3 py-1 rounded-md text-xs font-bold border transition-colors ${
                            followedUsers.has(activeReel.user) 
                                ? 'bg-transparent border-white/50 text-white' 
                                : 'bg-white text-black border-white'
                        }`}
                    >
                        {followedUsers.has(activeReel.user) ? 'Following' : 'Follow'}
                    </button>
                </div>
                
                <p className="text-white text-sm mb-2 line-clamp-2">
                    {activeReel.description}
                </p>
                
                <div className="flex items-center space-x-2 text-white/80 text-xs">
                    <MusicIcon className="w-4 h-4 text-white/80" />
                    <span className="truncate">{activeReel.music}</span>
                </div>
            </div>

            {/* Camera Button */}
            <button 
                className="absolute top-4 right-4 z-20 p-2"
                onClick={(e) => e.stopPropagation()}
                aria-label="Camera"
            >
                <svg className="w-7 h-7 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
    );
}
