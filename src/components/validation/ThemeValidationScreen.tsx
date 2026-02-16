import { useState, useEffect, useMemo, useRef } from 'react';
import { ThemeConfig } from '../../types/theme';
import { ThemeValidator, ThemeValidationReport, ColorBlindnessResult } from '../../utils/ThemeValidator';

interface ThemeValidationScreenProps {
    theme: ThemeConfig;
    darkMode: boolean;
    onBack: () => void;
    onUpdateTheme: (newTheme: ThemeConfig) => void;
}

type TabType = 'contrast' | 'largeText' | 'colorBlindness';
type CategoryFilter = 'all' | 'core' | 'surface' | 'container' | 'inverse' | 'fixed';

// Animated counter component
const AnimatedCounter = ({ value, duration = 1200 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const start = 0;
        const end = value;
        const range = end - start;
        let startTime: number | null = null;
        
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + range * easeOut));
            if (progress < 1) requestAnimationFrame(step);
        };
        
        requestAnimationFrame(step);
    }, [value, duration]);
    
    return <>{count}</>;
};

// Floating orb component
const FloatingOrb = ({ color, size, position, delay }: { 
    color: string; 
    size: string; 
    position: string; 
    delay: string;
}) => (
    <div 
        className={`absolute ${size} ${position} rounded-full blur-3xl opacity-30 animate-float ${color}`}
        style={{ animationDelay: delay }}
    />
);

// Glassmorphism card component
const GlassCard = ({ 
    children, 
    className = '', 
    darkMode, 
    hover = true,
    glow = ''
}: { 
    children: React.ReactNode; 
    className?: string; 
    darkMode: boolean;
    hover?: boolean;
    glow?: string;
}) => (
    <div className={`
        rounded-3xl border backdrop-blur-xl transition-all duration-500
        ${darkMode 
            ? 'bg-white/[0.03] border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
            : 'bg-white/70 border-white/60 shadow-xl shadow-black/5'
        }
        ${hover ? darkMode 
            ? 'hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/20' 
            : 'hover:bg-white/90 hover:shadow-2xl hover:shadow-black/10'
            : ''
        }
        ${glow}
        ${className}
    `}>
        {children}
    </div>
);

// Score ring SVG component
const ScoreRing = ({ 
    score, 
    size = 160, 
    strokeWidth = 12,
    darkMode 
}: { 
    score: number; 
    size?: number; 
    strokeWidth?: number;
    darkMode: boolean;
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;
    
    const getGradient = () => {
        if (score >= 90) return ['#10b981', '#14b8a6', '#06b6d4'];
        if (score >= 70) return ['#f59e0b', '#f97316', '#fb923c'];
        return ['#f43f5e', '#ec4899', '#f472b6'];
    };
    
    const colors = getGradient();
    
    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 drop-shadow-lg" width={size} height={size}>
                <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors[0]} />
                        <stop offset="50%" stopColor={colors[1]} />
                        <stop offset="100%" stopColor={colors[2]} />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Background track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                    strokeWidth={strokeWidth}
                />
                
                {/* Animated score arc */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    filter="url(#glow)"
                    className="transition-all duration-1500 ease-out"
                />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-black tracking-tight ${
                    score >= 90 ? 'text-emerald-500' : score >= 70 ? 'text-amber-500' : 'text-rose-500'
                }`}>
                    <AnimatedCounter value={score} />
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                    Score
                </span>
            </div>
        </div>
    );
};

// Badge component
const Badge = ({ 
    children, 
    variant = 'default',
    size = 'sm'
}: { 
    children: React.ReactNode; 
    variant?: 'success' | 'warning' | 'error' | 'default';
    size?: 'xs' | 'sm';
}) => {
    const variants = {
        success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20',
        warning: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
        error: 'bg-rose-500/15 text-rose-500 border-rose-500/20',
        default: 'bg-gray-500/15 text-gray-500 border-gray-500/20'
    };
    
    const sizes = {
        xs: 'text-[9px] px-1.5 py-0.5',
        sm: 'text-[10px] px-2 py-1'
    };
    
    return (
        <span className={`
            inline-flex items-center font-bold uppercase tracking-wider rounded-md border
            ${variants[variant]} ${sizes[size]}
        `}>
            {children}
        </span>
    );
};

export default function ThemeValidationScreen({ theme, darkMode, onBack, onUpdateTheme }: ThemeValidationScreenProps) {
    const [report, setReport] = useState<ThemeValidationReport | null>(null);
    const [isFixing, setIsFixing] = useState(false);
    const [fixingKey, setFixingKey] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('contrast');
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Use ref to always have latest theme (avoids stale closure in setTimeout)
    const themeRef = useRef(theme);
    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const validationReport = ThemeValidator.validateTheme(theme, darkMode);
        setReport(validationReport);

        if (validationReport.score === 100) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }
    }, [theme, darkMode]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleAutoFix = () => {
        setIsFixing(true);
        // Use ref to get latest theme, preventing stale closure issues
        const fixedTheme = ThemeValidator.getFixedTheme(themeRef.current, darkMode);
        // Small delay for animation, then apply fix immediately
        setTimeout(() => {
            onUpdateTheme(fixedTheme);
            setIsFixing(false);
            showToast("✨ All accessibility issues have been fixed!");
        }, 800);
    };

    const handleFixPair = (fgKey: string, bg: string, fg: string) => {
        setFixingKey(fgKey);
        // Compute fix immediately using latest theme ref (avoids stale closure)
        const fixedFg = ThemeValidator.fixColor(fg, bg, 7.0);
        const latestTheme = themeRef.current;
        const newTheme = JSON.parse(JSON.stringify(latestTheme)) as ThemeConfig;
        const targetColors = darkMode ? newTheme.colors.dark : newTheme.colors.light;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (targetColors as any)[fgKey] = fixedFg;
        // Small delay for animation, then apply fix immediately
        setTimeout(() => {
            onUpdateTheme(newTheme);
            setFixingKey(null);
            showToast(`✓ Fixed ${fgKey.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        }, 300);
    };

    const filteredResults = useMemo(() => {
        if (!report) return [];
        return categoryFilter === 'all' 
            ? report.results 
            : report.results.filter(r => r.category === categoryFilter);
    }, [report, categoryFilter]);

    const stats = useMemo(() => {
        if (!report) return null;
        return {
            aaa: report.passedCount,
            aa: report.warningCount,
            fail: report.errorCount,
            largeAaa: report.largeTextPassedCount,
            largeAa: report.largeTextWarningCount,
            largeFail: report.largeTextErrorCount
        };
    }, [report]);

    const getScoreGradient = (score: number) => {
        if (score >= 90) return 'from-emerald-500 via-teal-500 to-cyan-500';
        if (score >= 70) return 'from-amber-500 via-orange-500 to-yellow-500';
        return 'from-rose-500 via-pink-500 to-red-500';
    };

    const getCategoryIcon = (cat: CategoryFilter): string => {
        const icons: Record<CategoryFilter, string> = {
            all: '✦',
            core: '◈',
            surface: '▣',
            container: '◫',
            inverse: '◑',
            fixed: '◉'
        };
        return icons[cat];
    };

    const getCategoryLabel = (cat: CategoryFilter): string => {
        const labels: Record<CategoryFilter, string> = {
            all: 'All',
            core: 'Core',
            surface: 'Surface',
            container: 'Container',
            inverse: 'Inverse',
            fixed: 'Fixed'
        };
        return labels[cat];
    };

    const getSeverityIcon = (severity: 'ok' | 'warning' | 'critical') => {
        const icons = {
            ok: <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><span className="text-emerald-500 text-sm">✓</span></div>,
            warning: <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center"><span className="text-amber-500 text-sm">!</span></div>,
            critical: <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center"><span className="text-rose-500 text-sm">×</span></div>
        };
        return icons[severity];
    };

    if (!report) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${
                darkMode ? 'bg-[#0a0a0f]' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
            }`}>
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-spin-reverse" />
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen relative overflow-hidden ${
            darkMode 
                ? 'bg-[#0a0a0f] text-white' 
                : 'bg-gradient-to-br from-slate-50 via-gray-50 to-white text-gray-900'
        }`}>
            {/* Custom CSS animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes confetti-fall {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.5); }
                }
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes slideUp {
                    from { transform: translateX(-50%) translateY(20px); opacity: 0; }
                    to { transform: translateX(-50%) translateY(0); opacity: 1; }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-confetti { animation: confetti-fall 3s ease-in-out forwards; }
                .animate-shimmer { 
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-spin-reverse { animation: spin-reverse 1.5s linear infinite; }
            `}</style>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-[slideUp_0.3s_ease-out]">
                    <div className={`
                        px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-xl border
                        ${darkMode 
                            ? 'bg-gray-900/90 border-gray-700/50 text-white shadow-black/40' 
                            : 'bg-white/95 border-gray-200/80 text-gray-900 shadow-black/10'
                        }
                    `}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="font-semibold">{toastMessage}</span>
                    </div>
                </div>
            )}

            {/* Confetti Effect */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute animate-confetti ${
                                ['bg-emerald-400', 'bg-teal-400', 'bg-cyan-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400'][i % 6]
                            }`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: '-10px',
                                width: Math.random() > 0.5 ? '8px' : '12px',
                                height: Math.random() > 0.5 ? '8px' : '4px',
                                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2.5 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <FloatingOrb 
                    color={darkMode ? 'bg-indigo-600' : 'bg-indigo-300'} 
                    size="w-[500px] h-[500px]" 
                    position="top-[-200px] left-[-200px]" 
                    delay="0s" 
                />
                <FloatingOrb 
                    color={darkMode ? 'bg-purple-600' : 'bg-purple-300'} 
                    size="w-[400px] h-[400px]" 
                    position="top-[30%] right-[-150px]" 
                    delay="2s" 
                />
                <FloatingOrb 
                    color={darkMode ? 'bg-emerald-600' : 'bg-emerald-300'} 
                    size="w-[450px] h-[450px]" 
                    position="bottom-[-200px] left-[20%]" 
                    delay="4s" 
                />
                
                {/* Grid pattern overlay */}
                <div className={`absolute inset-0 ${darkMode ? 'opacity-[0.02]' : 'opacity-[0.03]'}`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Header */}
            <header className={`
                sticky top-0 z-20 backdrop-blur-2xl border-b
                ${darkMode 
                    ? 'bg-[#0a0a0f]/80 border-white/[0.05]' 
                    : 'bg-white/80 border-black/[0.05]'
                }
            `}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={onBack}
                                className={`
                                    group relative p-3 rounded-2xl transition-all duration-300
                                    ${darkMode 
                                        ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                                        : 'hover:bg-black/5 text-gray-500 hover:text-gray-900'
                                    }
                                `}
                            >
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight">Theme Validation</h1>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    WCAG 2.1 Accessibility Check
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <span className={`
                                px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] border
                                ${darkMode 
                                    ? 'bg-white/5 border-white/10 text-gray-400' 
                                    : 'bg-black/5 border-black/5 text-gray-500'
                                }
                            `}>
                                {darkMode ? '● Dark' : '○ Light'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
                {/* Hero Score Section */}
                <section className="mb-12">
                    <GlassCard darkMode={darkMode} className="p-8 lg:p-10" hover={false}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            {/* Main Score */}
                            <div className="lg:col-span-4 flex flex-col items-center justify-center">
                                <ScoreRing score={report.score} darkMode={darkMode} />
                                <div className="mt-6 text-center">
                                    <h2 className="text-xl font-bold">Accessibility Score</h2>
                                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {report.score >= 90 ? 'Excellent! Your theme is highly accessible.' :
                                         report.score >= 70 ? 'Good, but some improvements recommended.' :
                                         'Needs attention for better accessibility.'}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Secondary Scores */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { 
                                        label: 'Brand Consistency', 
                                        score: report.brandConsistencyScore, 
                                        subtitle: report.harmonyName || 'Custom Palette',
                                        icon: '🎨'
                                    },
                                    { 
                                        label: 'System Efficiency', 
                                        score: report.performanceScore, 
                                        subtitle: 'Palette Quality',
                                        icon: '⚡'
                                    },
                                    { 
                                        label: 'Color Blindness', 
                                        score: report.colorBlindnessScore, 
                                        subtitle: 'Distinguishability',
                                        icon: '👁️'
                                    },
                                ].map((item, i) => (
                                    <div 
                                        key={i}
                                        className={`
                                            p-6 rounded-2xl border transition-all duration-300
                                            ${darkMode 
                                                ? 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]' 
                                                : 'bg-gray-50/80 border-gray-200/50 hover:bg-white'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className={`text-2xl font-black ${
                                                item.score >= 90 ? 'text-emerald-500' : 
                                                item.score >= 70 ? 'text-amber-500' : 'text-rose-500'
                                            }`}>
                                                <AnimatedCounter value={item.score} />%
                                            </span>
                                        </div>
                                        <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {item.label}
                                        </div>
                                        <div className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {item.subtitle}
                                        </div>
                                        
                                        {/* Progress bar */}
                                        <div className={`mt-4 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                                            <div 
                                                className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(item.score)} transition-all duration-1000 ease-out`}
                                                style={{ width: `${item.score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Stats Grid */}
                {stats && (
                    <section className="mb-10">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {[
                                { label: 'AAA', count: stats.aaa, variant: 'success' as const },
                                { label: 'AA', count: stats.aa, variant: 'warning' as const },
                                { label: 'Fail', count: stats.fail, variant: 'error' as const },
                                { label: 'Large AAA', count: stats.largeAaa, variant: 'success' as const },
                                { label: 'Large AA', count: stats.largeAa, variant: 'warning' as const },
                                { label: 'Large Fail', count: stats.largeFail, variant: 'error' as const },
                            ].map((stat, i) => (
                                <GlassCard key={i} darkMode={darkMode} className="p-4 text-center">
                                    <div className={`text-3xl font-black ${
                                        stat.variant === 'success' ? 'text-emerald-500' :
                                        stat.variant === 'warning' ? 'text-amber-500' : 'text-rose-500'
                                    }`}>
                                        <AnimatedCounter value={stat.count} duration={800} />
                                    </div>
                                    <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                                        darkMode ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                        {stat.label}
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </section>
                )}

                {/* Auto-Fix Button */}
                {report.score < 100 && (
                    <section className="mb-10">
                        <button
                            onClick={handleAutoFix}
                            disabled={isFixing}
                            className={`
                                group relative w-full md:w-auto px-8 py-5 rounded-2xl font-bold text-white
                                overflow-hidden transition-all duration-300
                                ${isFixing 
                                    ? 'opacity-80 cursor-wait' 
                                    : 'hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]'
                                }
                                bg-gradient-to-r ${getScoreGradient(report.score)}
                            `}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 animate-shimmer" />
                            
                            <div className="relative flex items-center justify-center gap-3">
                                {isFixing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        <span>Optimizing Colors...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Auto-fix All Issues</span>
                                        <Badge variant="default" size="xs">{report.errorCount + report.warningCount}</Badge>
                                    </>
                                )}
                            </div>
                        </button>
                    </section>
                )}

                {/* Tabs Navigation */}
                <section className="mb-8">
                    <div className={`
                        inline-flex p-1.5 rounded-2xl border
                        ${darkMode 
                            ? 'bg-white/[0.02] border-white/[0.05]' 
                            : 'bg-gray-100/80 border-gray-200/50'
                        }
                    `}>
                        {[
                            { id: 'contrast' as TabType, label: 'Contrast', icon: '🎨' },
                            { id: 'largeText' as TabType, label: 'Large Text', icon: '📝' },
                            { id: 'colorBlindness' as TabType, label: 'Color Blind', icon: '👁️' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2
                                    ${activeTab === tab.id
                                        ? `bg-gradient-to-r ${getScoreGradient(report.score)} text-white shadow-lg`
                                        : darkMode 
                                            ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-white/80'
                                    }
                                `}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Category Filter (for contrast tab) */}
                {activeTab === 'contrast' && (
                    <section className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {(['all', 'core', 'surface', 'container', 'inverse', 'fixed'] as CategoryFilter[]).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`
                                        px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider
                                        transition-all duration-300 flex items-center gap-2
                                        ${categoryFilter === cat
                                            ? darkMode 
                                                ? 'bg-white/15 text-white border border-white/20' 
                                                : 'bg-gray-900 text-white'
                                            : darkMode 
                                                ? 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300' 
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                        }
                                    `}
                                >
                                    <span>{getCategoryIcon(cat)}</span>
                                    <span>{getCategoryLabel(cat)}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contrast Check Tab */}
                {activeTab === 'contrast' && (
                    <section className="space-y-4">
                        {filteredResults.map((result, index) => (
                            <GlassCard 
                                key={index} 
                                darkMode={darkMode}
                                className={`
                                    p-6 border-l-4 transition-all duration-300
                                    ${result.level === 'AAA' ? 'border-l-emerald-500' :
                                      result.level === 'AA' ? 'border-l-amber-500' : 'border-l-rose-500'}
                                    ${hoveredIndex === index ? 'scale-[1.01]' : ''}
                                `}
                                glow={hoveredIndex === index ? (
                                    result.level === 'AAA' ? 'shadow-emerald-500/10' :
                                    result.level === 'AA' ? 'shadow-amber-500/10' : 'shadow-rose-500/10'
                                ) : ''}
                                hover={false}
                            >
                                <div 
                                    className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className="flex items-center gap-5">
                                        {/* Color preview */}
                                        <div className="relative">
                                            <div 
                                                className="w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center"
                                                style={{ backgroundColor: result.color1 }}
                                            >
                                                <span 
                                                    className="text-lg font-bold"
                                                    style={{ color: result.color2 }}
                                                >
                                                    Aa
                                                </span>
                                            </div>
                                            <div 
                                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-2 shadow-sm"
                                                style={{ 
                                                    backgroundColor: result.color2,
                                                    borderColor: darkMode ? '#1f2937' : '#ffffff'
                                                }}
                                            />
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-bold text-lg">{result.pair}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="default" size="xs">
                                                    {result.category.toUpperCase()}
                                                </Badge>
                                                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {result.message}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 pl-[76px] lg:pl-0">
                                        {/* Ratio display */}
                                        <div className="text-right">
                                            <div className={`text-2xl font-black tabular-nums ${
                                                result.ratio >= 7 ? 'text-emerald-500' : 
                                                result.ratio >= 4.5 ? 'text-amber-500' : 'text-rose-500'
                                            }`}>
                                                {result.ratio.toFixed(2)}:1
                                            </div>
                                            <div className="flex gap-1.5 mt-1.5">
                                                <Badge 
                                                    variant={result.level === 'AAA' ? 'success' : result.level === 'AA' ? 'warning' : 'error'} 
                                                    size="xs"
                                                >
                                                    Normal: {result.level}
                                                </Badge>
                                                <Badge 
                                                    variant={result.largeTextLevel === 'AAA' ? 'success' : result.largeTextLevel === 'AA' ? 'warning' : 'error'} 
                                                    size="xs"
                                                >
                                                    Large: {result.largeTextLevel}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Fix button */}
                                        {result.level !== 'AAA' && (
                                            <button
                                                onClick={() => handleFixPair(result.fgKey, result.color1, result.color2)}
                                                disabled={fixingKey === result.fgKey}
                                                className={`
                                                    px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300
                                                    flex items-center gap-2
                                                    ${fixingKey === result.fgKey
                                                        ? 'bg-gray-100 text-gray-400 cursor-wait'
                                                        : darkMode
                                                            ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/30'
                                                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'
                                                    }
                                                `}
                                            >
                                                {fixingKey === result.fgKey ? (
                                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                )}
                                                Fix
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </section>
                )}

                {/* Large Text Tab */}
                {activeTab === 'largeText' && (
                    <section>
                        <GlassCard darkMode={darkMode} className="p-8" hover={false}>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-3">Large Text Requirements</h3>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    WCAG defines large text as <strong>18pt+ (24px)</strong> regular or <strong>14pt+ (18.5px)</strong> bold. 
                                    Large text has lower contrast requirements due to better readability.
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AAA ≥ 4.5:1</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AA ≥ 3:1</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {report.results.map((result, index) => (
                                    <div 
                                        key={index} 
                                        className={`
                                            p-5 rounded-2xl border transition-all duration-300
                                            ${darkMode 
                                                ? 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]' 
                                                : 'bg-gray-50 border-gray-200/50 hover:bg-white'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-semibold truncate pr-2">{result.pair}</span>
                                            <Badge 
                                                variant={
                                                    result.largeTextLevel === 'AAA' ? 'success' :
                                                    result.largeTextLevel === 'AA' ? 'warning' : 'error'
                                                }
                                            >
                                                {result.largeTextLevel}
                                            </Badge>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div 
                                                className="w-16 h-12 rounded-xl flex items-center justify-center shadow-inner"
                                                style={{ backgroundColor: result.color1 }}
                                            >
                                                <span 
                                                    className="text-xl font-bold"
                                                    style={{ color: result.color2 }}
                                                >
                                                    Aa
                                                </span>
                                            </div>
                                            <div>
                                                <div className={`text-lg font-bold tabular-nums ${
                                                    result.ratio >= 4.5 ? 'text-emerald-500' :
                                                    result.ratio >= 3 ? 'text-amber-500' : 'text-rose-500'
                                                }`}>
                                                    {result.ratio.toFixed(2)}:1
                                                </div>
                                                {result.largeTextLevel === 'FAIL' && (
                                                    <span className="text-xs text-rose-500">needs 3:1</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </section>
                )}

                {/* Color Blindness Tab */}
                {activeTab === 'colorBlindness' && (
                    <section className="space-y-6">
                        {report.colorBlindnessResults.map((cbResult: ColorBlindnessResult, index: number) => (
                            <GlassCard key={index} darkMode={darkMode} className="p-8" hover={false}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold">{cbResult.displayName}</h3>
                                            <Badge 
                                                variant={
                                                    cbResult.overallScore >= 80 ? 'success' :
                                                    cbResult.overallScore >= 50 ? 'warning' : 'error'
                                                }
                                            >
                                                {cbResult.overallScore}% Compatible
                                            </Badge>
                                        </div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                            {cbResult.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {cbResult.affectedPairs.map((pair, pIndex) => (
                                        <div 
                                            key={pIndex} 
                                            className={`
                                                p-5 rounded-2xl border transition-all duration-300
                                                ${darkMode 
                                                    ? 'bg-white/[0.02] border-white/[0.05]' 
                                                    : 'bg-gray-50 border-gray-200/50'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="font-semibold text-sm">{pair.pair}</span>
                                                {getSeverityIcon(pair.severity)}
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                                                        darkMode ? 'text-gray-500' : 'text-gray-400'
                                                    }`}>
                                                        Original
                                                    </div>
                                                    <div className="flex gap-1.5">
                                                        <div 
                                                            className="w-8 h-8 rounded-lg border shadow-sm"
                                                            style={{ 
                                                                backgroundColor: pair.originalColors[0],
                                                                borderColor: darkMode ? '#374151' : '#e5e7eb'
                                                            }}
                                                        />
                                                        <div 
                                                            className="w-8 h-8 rounded-lg border shadow-sm"
                                                            style={{ 
                                                                backgroundColor: pair.originalColors[1],
                                                                borderColor: darkMode ? '#374151' : '#e5e7eb'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                                                        darkMode ? 'text-gray-500' : 'text-gray-400'
                                                    }`}>
                                                        Simulated
                                                    </div>
                                                    <div className="flex gap-1.5">
                                                        <div 
                                                            className="w-8 h-8 rounded-lg border shadow-sm"
                                                            style={{ 
                                                                backgroundColor: pair.simulatedColors[0],
                                                                borderColor: darkMode ? '#374151' : '#e5e7eb'
                                                            }}
                                                        />
                                                        <div 
                                                            className="w-8 h-8 rounded-lg border shadow-sm"
                                                            style={{ 
                                                                backgroundColor: pair.simulatedColors[1],
                                                                borderColor: darkMode ? '#374151' : '#e5e7eb'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className={`mt-4 text-xs font-medium ${
                                                pair.severity === 'ok' ? 'text-emerald-500' :
                                                pair.severity === 'warning' ? 'text-amber-500' : 'text-rose-500'
                                            }`}>
                                                {pair.severity === 'ok' && '✓ Colors remain distinguishable'}
                                                {pair.severity === 'warning' && '⚠ Consider adding patterns'}
                                                {pair.severity === 'critical' && '✗ Add secondary indicators'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        ))}

                        {/* Recommendations Card */}
                        <GlassCard darkMode={darkMode} className="p-8" hover={false}>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-2xl">💡</span>
                                Best Practices for Color Blindness
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: '🎯', text: "Don't rely on color alone — use icons, patterns, or labels" },
                                    { icon: '🚫', text: 'For errors, combine red with an "X" icon or text' },
                                    { icon: '✅', text: 'For success, combine green with a checkmark' },
                                    { icon: '📊', text: 'Use shapes/patterns in charts and graphs' },
                                    { icon: '🔍', text: 'Test with color blindness simulation tools' },
                                    { icon: '🎨', text: 'Ensure sufficient contrast between all colors' },
                                ].map((item, i) => (
                                    <div 
                                        key={i}
                                        className={`
                                            flex items-start gap-3 p-4 rounded-xl
                                            ${darkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}
                                        `}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </section>
                )}
            </main>
        </div>
    );
}
