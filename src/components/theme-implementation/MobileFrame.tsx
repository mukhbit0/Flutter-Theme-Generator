import React from 'react';

interface MobileFrameProps {
    children: React.ReactNode;
    platform: 'ios' | 'android';
    darkMode: boolean;
}

export default function MobileFrame({ children, platform, darkMode }: MobileFrameProps) {
    return (
        <div className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl`}>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

            {/* Screen Content */}
            <div className={`rounded-[2rem] overflow-hidden w-full h-full ${darkMode ? 'bg-black' : 'bg-white'} relative`}>

                {/* Status Bar */}
                <div className={`absolute top-0 w-full h-8 z-20 flex justify-between items-center px-6 text-[10px] font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        <span>100%</span>
                    </div>
                </div>

                {/* Notch / Punch Hole */}
                {platform === 'ios' ? (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[24px] w-[120px] bg-gray-800 rounded-b-2xl z-30"></div>
                ) : (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-3 w-3 bg-gray-800 rounded-full z-30"></div>
                )}

                {/* App Content */}
                <div className="h-full w-full pt-8 pb-6 overflow-y-auto no-scrollbar">
                    {children}
                </div>

                {/* Home Indicator / Nav Bar */}
                <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[100px] h-[4px] rounded-full z-20 ${darkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
            </div>
        </div>
    );
}
