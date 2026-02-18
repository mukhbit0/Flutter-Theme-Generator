import React, { useEffect, useRef } from 'react';

interface SidebarAdProps {
    slotId?: string;
    darkMode?: boolean;
}

const PUB_ID = import.meta.env.VITE_ADSENSE_PUB_ID as string;
const DEFAULT_SLOT = import.meta.env.VITE_AD_SLOT_SIDEBAR as string;

export const SidebarAd: React.FC<SidebarAdProps> = ({
    slotId = DEFAULT_SLOT,
    darkMode = false
}) => {
    const adRef = useRef<HTMLModElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        if (adRef.current && !pushed.current) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                pushed.current = true;
            } catch (e) {
                console.warn('SidebarAd init error:', e);
            }
        }
    }, []);

    return (
        <div className={`ad-sidebar-container ${darkMode ? 'ad-dark' : 'ad-light'}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'inline-block', width: '300px', height: '250px' }}
                data-ad-client={PUB_ID}
                data-ad-slot={slotId}
            />
            <span className="ad-label-tag">Sponsored</span>
        </div>
    );
};

