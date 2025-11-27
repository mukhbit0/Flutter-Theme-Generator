import { CSSProperties } from 'react';

interface IconProps {
    className?: string;
    style?: CSSProperties;
    filled?: boolean;
    onClick?: () => void;
}

export const HeartIcon = ({ className = 'w-6 h-6', style, filled, onClick }: IconProps) => (
    <svg className={className} style={style} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

export const CommentIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

export const ShareIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export const BookmarkIcon = ({ className = 'w-6 h-6', style, filled, onClick }: IconProps) => (
    <svg className={className} style={style} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

export const HomeIcon = ({ className = 'w-6 h-6', style, filled, onClick }: IconProps) => (
    <svg className={className} style={style} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const SearchIcon = ({ className = 'w-6 h-6', style, filled, onClick }: IconProps) => (
    <svg className={className} style={style} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const PlusIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

export const CloseIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const MoreIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

export const PlayIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20" onClick={onClick}>
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
    </svg>
);

export const MusicIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20" onClick={onClick}>
        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
    </svg>
);

export const VideoIcon = ({ className = 'w-6 h-6', style, filled, onClick }: IconProps) => (
    <svg className={className} style={style} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const GridIcon = ({ className = 'w-6 h-6', style, filled, onClick }: IconProps) => (
    <svg className={className} style={style} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export const TagIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
);

export const MenuIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const ChevronDownIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export const UserAddIcon = ({ className = 'w-6 h-6', style, onClick }: IconProps) => (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
