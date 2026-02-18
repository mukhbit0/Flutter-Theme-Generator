import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

/**
 * Hook to initialize AdSense ads on component mount and route changes.
 * Safely pushes to adsbygoogle array for SPA ad initialization.
 */
export function useAds(adCount: number = 1) {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;

        const timer = setTimeout(() => {
            try {
                if (typeof window !== 'undefined' && window.adsbygoogle) {
                    for (let i = 0; i < adCount; i++) {
                        window.adsbygoogle.push({});
                    }
                }
            } catch (e) {
                // AdSense not loaded or blocked — fail silently
                console.debug('[useAds] AdSense initialization skipped:', e);
            }
            initialized.current = true;
        }, 100);

        return () => clearTimeout(timer);
    }, [adCount]);
}
