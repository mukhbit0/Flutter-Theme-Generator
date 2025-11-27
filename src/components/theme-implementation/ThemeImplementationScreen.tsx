import { useState } from 'react';
import { ThemeConfig, ThemeGeneratorSettings, ThemeColors } from '../../types/theme';
import MobileFrame from './MobileFrame';
import EcommerceMockup from './mockups/EcommerceMockup';
import SocialMediaMockup from './mockups/SocialMediaMockup';
import BankingMockup from './mockups/BankingMockup';
import FitnessMockup from './mockups/FitnessMockup';
import FoodDeliveryMockup from './mockups/FoodDeliveryMockup';

interface ThemeImplementationScreenProps {
    themeConfig: ThemeConfig | null;
    settings: ThemeGeneratorSettings | null;
    onBack: () => void;
    darkMode: boolean;
}

type MockupType = 'ecommerce' | 'social' | 'banking' | 'fitness' | 'food';
type PlatformType = 'ios' | 'android';
type ThemeMode = 'light' | 'lightMediumContrast' | 'lightHighContrast' | 'dark' | 'darkMediumContrast' | 'darkHighContrast';

export default function ThemeImplementationScreen({
    themeConfig,
    onBack,
    darkMode
}: ThemeImplementationScreenProps) {
    const [activeMockup, setActiveMockup] = useState<MockupType>('ecommerce');
    const [platform, setPlatform] = useState<PlatformType>('ios');
    const [activeThemeMode, setActiveThemeMode] = useState<ThemeMode>('light');

    if (!themeConfig) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        No Theme Selected
                    </h2>
                    <button onClick={onBack} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const getMockupColors = (): ThemeColors => {
        switch (activeThemeMode) {
            case 'light': return themeConfig.colors.light;
            case 'lightMediumContrast': return themeConfig.colors.lightMediumContrast || themeConfig.colors.light;
            case 'lightHighContrast': return themeConfig.colors.lightHighContrast || themeConfig.colors.light;
            case 'dark': return themeConfig.colors.dark;
            case 'darkMediumContrast': return themeConfig.colors.darkMediumContrast || themeConfig.colors.dark;
            case 'darkHighContrast': return themeConfig.colors.darkHighContrast || themeConfig.colors.dark;
            default: return themeConfig.colors.light;
        }
    };

    const mockupColors = getMockupColors();
    const isMockupDark = activeThemeMode.startsWith('dark');

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-lg border-b sticky top-0 z-10`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Theme Implementation
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Platform Toggle */}
                        <div className={`flex p-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <button
                                onClick={() => setPlatform('ios')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${platform === 'ios'
                                    ? darkMode ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm'
                                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                iOS
                            </button>
                            <button
                                onClick={() => setPlatform('android')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${platform === 'android'
                                    ? darkMode ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm'
                                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Android
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Sidebar Controls */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Theme Variant Selector */}
                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Theme Variant
                        </h3>
                        <div className="space-y-2">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Select Mode
                            </label>
                            <select
                                value={activeThemeMode}
                                onChange={(e) => setActiveThemeMode(e.target.value as ThemeMode)}
                                className={`w-full px-4 py-2 rounded-lg border ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors`}
                            >
                                <option value="light">Light</option>
                                <option value="lightMediumContrast">Light Medium Contrast</option>
                                <option value="lightHighContrast">Light High Contrast</option>
                                <option value="dark">Dark</option>
                                <option value="darkMediumContrast">Dark Medium Contrast</option>
                                <option value="darkHighContrast">Dark High Contrast</option>
                            </select>
                            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                This controls the theme of the mockup independently of the app's dark mode.
                            </p>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Select Mockup
                        </h3>
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                            <button
                                onClick={() => setActiveMockup('ecommerce')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeMockup === 'ecommerce'
                                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 border'
                                    : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                            >
                                <span className="text-xl">🛍️</span>
                                <span className="font-medium">E-commerce App</span>
                            </button>

                            <button
                                onClick={() => setActiveMockup('social')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeMockup === 'social'
                                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 border'
                                    : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                            >
                                <span className="text-xl">📱</span>
                                <span className="font-medium">Social Media App</span>
                            </button>

                            <button
                                onClick={() => setActiveMockup('banking')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeMockup === 'banking'
                                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 border'
                                    : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                            >
                                <span className="text-xl">🏦</span>
                                <span className="font-medium">Banking / Fintech App</span>
                            </button>

                            <button
                                onClick={() => setActiveMockup('fitness')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeMockup === 'fitness'
                                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 border'
                                    : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                            >
                                <span className="text-xl">💪</span>
                                <span className="font-medium">Fitness / Health App</span>
                            </button>

                            <button
                                onClick={() => setActiveMockup('food')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeMockup === 'food'
                                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 border'
                                    : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                            >
                                <span className="text-xl">🍔</span>
                                <span className="font-medium">Food Delivery App</span>
                            </button>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            About this View
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            This preview demonstrates how your generated theme colors are applied to real-world UI components.
                            Switch between iOS and Android to see platform-specific adaptations.
                        </p>
                    </div>
                </div>

                {/* Mockup Display */}
                <div className="lg:col-span-2 flex justify-center items-start pt-4">
                    <MobileFrame platform={platform} darkMode={isMockupDark}>
                        {activeMockup === 'ecommerce' && <EcommerceMockup colors={mockupColors} />}
                        {activeMockup === 'social' && <SocialMediaMockup colors={mockupColors} />}
                        {activeMockup === 'banking' && <BankingMockup colors={mockupColors} />}
                        {activeMockup === 'fitness' && <FitnessMockup colors={mockupColors} />}
                        {activeMockup === 'food' && <FoodDeliveryMockup colors={mockupColors} />}
                    </MobileFrame>
                </div>

            </div>
        </div>
    );
}
