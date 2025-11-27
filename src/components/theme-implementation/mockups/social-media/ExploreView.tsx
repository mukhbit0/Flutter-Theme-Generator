import { ThemeColors } from '../../../../types/theme';
import { ExploreItem } from '../../../../data/socialMediaData';
import { PlayIcon, GridIcon, TagIcon, ChevronDownIcon } from '../../../common/icons';

interface ExploreViewProps {
    colors: ThemeColors;
    exploreGrid: ExploreItem[];
    exploreCategories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function ExploreView({
    colors,
    exploreGrid,
    exploreCategories,
    activeCategory,
    onCategoryChange,
}: ExploreViewProps) {
    return (
        <div className="pb-4">
            {/* Search Bar */}
            <div className="p-4">
                <div 
                    style={{ backgroundColor: colors.surfaceContainer }} 
                    className="rounded-xl px-4 py-3 flex items-center space-x-3"
                >
                    <svg className="w-5 h-5" style={{ color: colors.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span style={{ color: colors.onSurfaceVariant }} className="text-sm">Search</span>
                </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 px-4 space-x-2 no-scrollbar">
                {exploreCategories.map((cat) => (
                    <button 
                        key={cat} 
                        onClick={() => onCategoryChange(cat)}
                        style={{ 
                            backgroundColor: activeCategory === cat ? colors.primary : colors.surfaceContainer,
                            color: activeCategory === cat ? colors.onPrimary : colors.onSurface 
                        }} 
                        className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors"
                    >
                        <span>{cat}</span>
                        {cat === 'For You' && (
                            <ChevronDownIcon className="w-3 h-3" style={{ color: activeCategory === cat ? colors.onPrimary : colors.onSurface }} />
                        )}
                    </button>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-around px-4 py-3 border-b" style={{ borderColor: colors.outline }}>
                <button className="flex items-center space-x-2" style={{ color: colors.primary }}>
                    <GridIcon className="w-5 h-5" style={{ color: colors.primary }} />
                    <span className="text-sm font-medium">Grid</span>
                </button>
                <button className="flex items-center space-x-2" style={{ color: colors.onSurfaceVariant }}>
                    <TagIcon className="w-5 h-5" style={{ color: colors.onSurfaceVariant }} />
                    <span className="text-sm font-medium">Tags</span>
                </button>
            </div>

            {/* Explore Grid */}
            <div className="grid grid-cols-3 gap-0.5">
                {exploreGrid.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`relative aspect-square cursor-pointer group overflow-hidden ${
                            index % 5 === 0 ? 'col-span-2 row-span-2' : ''
                        }`}
                    >
                        <img 
                            src={item.image} 
                            alt="Explore" 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            loading="lazy"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex items-center space-x-4 text-white">
                                <div className="flex items-center space-x-1">
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span className="font-bold text-sm">{(item.likes / 1000).toFixed(1)}K</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                                    </svg>
                                    <span className="font-bold text-sm">{item.comments}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Type Indicators */}
                        {item.type === 'video' && (
                            <div className="absolute top-2 right-2">
                                <PlayIcon className="w-6 h-6 text-white drop-shadow-lg" />
                            </div>
                        )}
                        {item.type === 'carousel' && (
                            <div className="absolute top-2 right-2">
                                <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Load More */}
            <div className="p-6 flex justify-center">
                <button 
                    style={{ color: colors.primary }} 
                    className="text-sm font-semibold hover:opacity-80 transition-opacity flex items-center space-x-2"
                >
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Loading more...</span>
                </button>
            </div>
        </div>
    );
}
