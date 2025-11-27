import { ThemeColors } from '../../types/theme';
import { HTMLAttributes, forwardRef } from 'react';

export type CardVariant = 'elevated' | 'filled' | 'outlined';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    colors: ThemeColors;
    variant?: CardVariant;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    hoverable?: boolean;
    clickable?: boolean;
}

const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
};

const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    '2xl': 'rounded-[2rem]',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            colors,
            variant = 'elevated',
            padding = 'md',
            rounded = 'lg',
            hoverable = false,
            clickable = false,
            children,
            className = '',
            ...props
        },
        ref
    ) => {
        const baseClasses = [
            'transition-all duration-200',
            paddingClasses[padding],
            roundedClasses[rounded],
            hoverable ? 'hover:shadow-lg' : '',
            clickable ? 'cursor-pointer active:scale-[0.98]' : '',
        ].join(' ');

        const getVariantStyles = (): React.CSSProperties => {
            switch (variant) {
                case 'elevated':
                    return {
                        backgroundColor: colors.surfaceContainerLow,
                        boxShadow: `0 1px 3px ${colors.shadow}15, 0 1px 2px ${colors.shadow}10`,
                    };
                case 'filled':
                    return {
                        backgroundColor: colors.surfaceContainerHighest,
                    };
                case 'outlined':
                    return {
                        backgroundColor: colors.surface,
                        border: `1px solid ${colors.outlineVariant}`,
                    };
                default:
                    return {};
            }
        };

        return (
            <div
                ref={ref}
                className={`${baseClasses} ${className}`}
                style={getVariantStyles()}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export default Card;
