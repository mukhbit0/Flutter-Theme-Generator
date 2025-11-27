interface AvatarProps {
    src: string;
    alt: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    online?: boolean;
    ring?: boolean;
    ringColor?: string;
    className?: string;
    onClick?: () => void;
}

const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
};

const onlineDotSizes = {
    xs: 'w-1.5 h-1.5 border',
    sm: 'w-2 h-2 border',
    md: 'w-3 h-3 border-2',
    lg: 'w-3.5 h-3.5 border-2',
    xl: 'w-4 h-4 border-2'
};

export default function Avatar({ 
    src, 
    alt, 
    size = 'md', 
    online, 
    ring, 
    ringColor,
    className = '',
    onClick 
}: AvatarProps) {
    return (
        <div className={`relative ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
            <img 
                src={src} 
                alt={alt} 
                className={`
                    ${sizeClasses[size]} 
                    rounded-full 
                    object-cover 
                    ${ring ? 'ring-2 ring-offset-2' : ''} 
                    ${className}
                `}
                style={ring && ringColor ? { '--tw-ring-color': ringColor } as React.CSSProperties : undefined}
                loading="lazy"
            />
            {online && (
                <div 
                    className={`
                        absolute bottom-0 right-0 
                        bg-green-500 rounded-full 
                        border-white
                        ${onlineDotSizes[size]}
                    `} 
                />
            )}
        </div>
    );
}
