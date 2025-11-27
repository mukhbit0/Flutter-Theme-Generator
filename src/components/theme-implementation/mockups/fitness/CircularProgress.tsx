interface CircularProgressProps {
    value: number;
    max: number;
    size?: number;
    strokeWidth?: number;
    color: string;
    bgColor: string;
}

export default function CircularProgress({ 
    value, 
    max, 
    size = 80, 
    strokeWidth = 8, 
    color,
    bgColor 
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = Math.min(value / max, 1);
    const offset = circumference - progress * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={bgColor}
                strokeWidth={strokeWidth}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500"
            />
        </svg>
    );
}
