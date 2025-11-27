import React, { useEffect } from 'react';

interface SnackbarProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
    type?: 'success' | 'error' | 'info';
}

export const Snackbar: React.FC<SnackbarProps> = ({
    message,
    isOpen,
    onClose,
    duration = 3000,
    type = 'success'
}) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    const bgColors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };

    return (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-50 transition-all duration-300 animate-fadeInUp ${bgColors[type]}`}>
            {message}
        </div>
    );
};
