import React, { useEffect, useRef } from 'react';

interface BannerAdProps {
  slotId?: string;
  darkMode?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const PUB_ID = import.meta.env.VITE_ADSENSE_PUB_ID as string;
const DEFAULT_SLOT = import.meta.env.VITE_AD_SLOT_BANNER as string;

export const BannerAd: React.FC<BannerAdProps> = ({
  slotId = DEFAULT_SLOT,
  darkMode = false,
  className = ''
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        console.warn('BannerAd init error:', e);
      }
    }
  }, []);

  return (
    <div className={`ad-banner-container ${darkMode ? 'ad-dark' : 'ad-light'} ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px' }}
        data-ad-client={PUB_ID}
        data-ad-slot={slotId}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
      <span className="ad-label-tag">Sponsored</span>
    </div>
  );
};

