import { ThemeColors } from '../../types/theme';

export type BadgeVariant = 'filled' | 'outlined' | 'soft';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeColor = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning';

interface BadgeProps {
    colors: ThemeColors;
    variant?: BadgeVariant;
    size?: BadgeSize;
    color?: BadgeColor;
    children: React.ReactNode;
    className?: string;
    dot?: boolean;
}

const sizeClasses: Record<BadgeSize, string> = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
};

export default function Badge({
    colors,
    variant = 'filled',
    size = 'md',
    color = 'primary',
    children,
    className = '',
    dot = false,
}: BadgeProps) {
    const getColorStyles = (): React.CSSProperties => {
        const colorMap: Record<BadgeColor, { bg: string; text: string; border: string; softBg: string }> = {
            primary: {
                bg: colors.primary,
                text: colors.onPrimary,
                border: colors.primary,
                softBg: colors.primaryContainer,
            },
            secondary: {
                bg: colors.secondary,
                text: colors.onSecondary,
                border: colors.secondary,
                softBg: colors.secondaryContainer,
            },
            tertiary: {
                bg: colors.tertiary,
                text: colors.onTertiary,
                border: colors.tertiary,
                softBg: colors.tertiaryContainer,
            },
            error: {
                bg: colors.error,
                text: colors.onError,
                border: colors.error,
                softBg: colors.errorContainer,
            },
            success: {
                bg: colors.success || '#2E7D32',
                text: '#FFFFFF',
                border: colors.success || '#2E7D32',
                softBg: '#E8F5E9',
            },
            warning: {
                bg: colors.warning || '#F57C00',
                text: '#FFFFFF',
                border: colors.warning || '#F57C00',
                softBg: '#FFF3E0',
            },
        };

        const colorSet = colorMap[color];

        switch (variant) {
            case 'filled':
                return {
                    backgroundColor: colorSet.bg,
                    color: colorSet.text,
                };
            case 'outlined':
                return {
                    backgroundColor: 'transparent',
                    color: colorSet.bg,
                    border: `1px solid ${colorSet.border}`,
                };
            case 'soft':
                return {
                    backgroundColor: colorSet.softBg,
                    color: colorSet.bg,
                };
            default:
                return {};
        }
    };

    if (dot) {
        return (
            <span
                className={`inline-block w-2 h-2 rounded-full ${className}`}
                style={{ backgroundColor: getColorStyles().backgroundColor }}
            />
        );
    }

    return (
        <span
            className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]} ${className}`}
            style={getColorStyles()}
        >
            {children}
        </span>
    );
}
