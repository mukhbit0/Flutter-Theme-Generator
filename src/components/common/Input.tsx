import { ThemeColors } from '../../types/theme';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

export type InputVariant = 'outlined' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    colors: ThemeColors;
    variant?: InputVariant;
    size?: InputSize;
    label?: string;
    helperText?: string;
    error?: boolean;
    errorText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const sizeClasses: Record<InputSize, { input: string; label: string }> = {
    sm: { input: 'px-3 py-2 text-sm', label: 'text-xs' },
    md: { input: 'px-4 py-3 text-sm', label: 'text-sm' },
    lg: { input: 'px-4 py-4 text-base', label: 'text-base' },
};

const Input = forwardRef<HTMLInputElement, InputProps>(function InputComponent(
    {
        colors,
        variant = 'outlined',
        size = 'md',
        label,
        helperText,
        error = false,
        errorText,
        leftIcon,
        rightIcon,
        fullWidth = false,
        className = '',
        onFocus,
        onBlur,
        ...props
    },
    ref
) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const getInputStyles = (): React.CSSProperties => {
        const borderColor = error
            ? colors.error
            : isFocused
            ? colors.primary
            : colors.outline;

        switch (variant) {
            case 'outlined':
                return {
                    backgroundColor: 'transparent',
                    color: colors.onSurface,
                    borderWidth: isFocused ? '2px' : '1px',
                    borderStyle: 'solid',
                    borderColor,
                };
            case 'filled':
                return {
                    backgroundColor: colors.surfaceContainerHighest,
                    color: colors.onSurface,
                    borderBottom: `${isFocused ? '2px' : '1px'} solid ${borderColor}`,
                };
            default:
                return {};
        }
    };

    const containerClasses = ['relative', fullWidth ? 'w-full' : ''].join(' ');

    const inputClasses = [
        'w-full outline-none transition-all duration-200',
        variant === 'outlined' ? 'rounded-xl' : 'rounded-t-xl rounded-b-none',
        sizeClasses[size].input,
        leftIcon ? 'pl-10' : '',
        rightIcon ? 'pr-10' : '',
    ].join(' ');

    return (
        <div className={containerClasses}>
            {label && (
                <label
                    className={`block mb-1 font-medium ${sizeClasses[size].label}`}
                    style={{ color: error ? colors.error : colors.onSurfaceVariant }}
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <span
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: colors.onSurfaceVariant }}
                    >
                        {leftIcon}
                    </span>
                )}
                <input
                    ref={ref}
                    className={`${inputClasses} ${className}`}
                    style={getInputStyles()}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {rightIcon && (
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: colors.onSurfaceVariant }}
                    >
                        {rightIcon}
                    </span>
                )}
            </div>
            {(helperText || errorText) && (
                <p
                    className={`mt-1 ${sizeClasses[size].label}`}
                    style={{ color: error ? colors.error : colors.onSurfaceVariant }}
                >
                    {error ? errorText : helperText}
                </p>
            )}
        </div>
    );
});

export default Input;
