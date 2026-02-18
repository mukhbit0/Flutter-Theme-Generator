import React, { useEffect, useRef } from 'react';

interface GridAdProps {
    slotId?: string;
    darkMode?: boolean;
}

const PUB_ID = import.meta.env.VITE_ADSENSE_PUB_ID as string;
const DEFAULT_SLOT = import.meta.env.VITE_AD_SLOT_GRID as string;

export const GridAd: React.FC<GridAdProps> = ({
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
                console.warn('GridAd init error:', e);
            }
        }
    }, []);

    return (
        <div className={`ad-grid-slot ${darkMode ? 'ad-dark' : 'ad-light'}`}>
            <div className="ad-grid-inner">
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={{ display: 'inline-block', width: '300px', height: '250px' }}
                    data-ad-client={PUB_ID}
                    data-ad-slot={slotId}
                />
                <span className="ad-label-tag">Ad</span>
            </div>
        </div>
    );
};

