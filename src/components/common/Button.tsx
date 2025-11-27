import { ThemeColors } from '../../types/theme';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    colors: ThemeColors;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            colors,
            variant = 'filled',
            size = 'md',
            fullWidth = false,
            loading = false,
            leftIcon,
            rightIcon,
            children,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const baseClasses = [
            'inline-flex items-center justify-center gap-2 font-medium rounded-full',
            'transition-all duration-200 transform active:scale-95',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
            sizeClasses[size],
            fullWidth ? 'w-full' : '',
        ].join(' ');

        const getVariantStyles = () => {
            switch (variant) {
                case 'filled':
                    return {
                        backgroundColor: colors.primary,
                        color: colors.onPrimary,
                    };
                case 'outlined':
                    return {
                        backgroundColor: 'transparent',
                        color: colors.primary,
                        border: `1px solid ${colors.outline}`,
                    };
                case 'text':
                    return {
                        backgroundColor: 'transparent',
                        color: colors.primary,
                    };
                case 'elevated':
                    return {
                        backgroundColor: colors.surfaceContainerLow,
                        color: colors.primary,
                        boxShadow: `0 1px 2px ${colors.shadow}25`,
                    };
                case 'tonal':
                    return {
                        backgroundColor: colors.secondaryContainer,
                        color: colors.onSecondaryContainer,
                    };
                default:
                    return {};
            }
        };

        return (
            <button
                ref={ref}
                className={`${baseClasses} ${className}`}
                style={getVariantStyles()}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : (
                    leftIcon
                )}
                {children}
                {!loading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
