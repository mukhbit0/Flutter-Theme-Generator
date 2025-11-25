import { useState, useEffect } from 'react';
import { ThemeConfig } from '../../types/theme';
import { ThemeValidator, ThemeValidationReport } from '../../utils/ThemeValidator';

interface ThemeValidationScreenProps {
    theme: ThemeConfig;
    darkMode: boolean;
    onBack: () => void;
    onUpdateTheme: (newTheme: ThemeConfig) => void;
}

export default function ThemeValidationScreen({ theme, darkMode, onBack, onUpdateTheme }: ThemeValidationScreenProps) {
    const [report, setReport] = useState<ThemeValidationReport | null>(null);
    const [isFixing, setIsFixing] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Run validation whenever theme or mode changes
        const validationReport = ThemeValidator.validateTheme(theme, darkMode);
        setReport(validationReport);

        if (validationReport.score === 100) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    }, [theme, darkMode]);

    const handleAutoFix = () => {
        setIsFixing(true);
        setTimeout(() => {
            const fixedTheme = ThemeValidator.getFixedTheme(theme, darkMode);
            onUpdateTheme(fixedTheme);
            setIsFixing(false);
        }, 1000); // Add a small delay for visual feedback
    };

    if (!report) return null;

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-emerald-400';
        if (score >= 70) return 'text-amber-400';
        return 'text-rose-400';
    };

    const getScoreGradient = (score: number) => {
        if (score >= 90) return 'from-emerald-400 to-teal-500';
        if (score >= 70) return 'from-amber-400 to-orange-500';
        return 'from-rose-400 to-red-500';
    };

    return (
        <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Background Gradients */}
            <div className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none`}>
                <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 animate-blob ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
                <div className={`absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-20 animate-blob animation-delay-2000 ${darkMode ? 'bg-blue-600' : 'bg-blue-300'}`} />
                <div className={`absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full blur-[120px] opacity-20 animate-blob animation-delay-4000 ${darkMode ? 'bg-emerald-600' : 'bg-emerald-300'}`} />
            </div>

            {/* Header */}
            <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${darkMode ? 'bg-gray-900/60 border-gray-800' : 'bg-white/60 border-gray-200'}`}>
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-black/5 text-gray-600 hover:text-gray-900'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold tracking-tight">Theme Validation</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md ${darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-black/5 border-black/5 text-gray-600'}`}>
                            {darkMode ? 'DARK MODE' : 'LIGHT MODE'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-10 relative z-0">
                {/* Score Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Main Score Card */}
                    <div className={`md:col-span-1 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/60 border-white/40 hover:bg-white/80'}`}>
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            {/* Circular Progress Background */}
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-lg">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className={darkMode ? 'text-gray-800' : 'text-gray-200'}
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    strokeDasharray={502}
                                    strokeDashoffset={502 - (502 * report.score) / 100}
                                    className={`${getScoreColor(report.score)} transition-all duration-1000 ease-out`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-6xl font-black tracking-tighter ${getScoreColor(report.score)} drop-shadow-sm`}>{report.score}</span>
                                <span className={`text-sm font-bold uppercase tracking-widest mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</span>
                            </div>
                        </div>
                        <h2 className="mt-8 text-xl font-bold text-center">Accessibility Health</h2>
                        <p className={`text-sm text-center mt-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Compliance with WCAG 2.1 contrast guidelines
                        </p>
                    </div>

                    {/* Stats & Actions */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Passed', count: report.passedCount, color: 'text-emerald-500', bg: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50' },
                                { label: 'Warnings', count: report.warningCount, color: 'text-amber-500', bg: darkMode ? 'bg-amber-500/10' : 'bg-amber-50' },
                                { label: 'Errors', count: report.errorCount, color: 'text-rose-500', bg: darkMode ? 'bg-rose-500/10' : 'bg-rose-50' },
                            ].map((stat, i) => (
                                <div key={i} className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/40'}`}>
                                    <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mb-1`}>
                                        {i === 0 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                                        {i === 1 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                                        {i === 2 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>}
                                    </div>
                                    <div className="text-3xl font-bold">{stat.count}</div>
                                    <div className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className={`flex-1 p-8 rounded-3xl border backdrop-blur-xl flex flex-col justify-center items-start relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-white/10' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-white/60'}`}>
                            <h3 className="text-xl font-bold mb-3">Theme Status</h3>
                            <p className={`mb-8 text-lg leading-relaxed max-w-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {report.score === 100
                                    ? "Excellent! Your theme is fully accessible and looks great."
                                    : report.score >= 80
                                        ? "Almost there! A few minor contrast adjustments will make it perfect."
                                        : "Action required. Several colors don't meet accessibility standards."}
                            </p>

                            {report.score < 100 && (
                                <button
                                    onClick={handleAutoFix}
                                    disabled={isFixing}
                                    className={`px-8 py-4 rounded-2xl font-bold text-white shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center gap-3 ${isFixing ? 'opacity-75 cursor-wait' : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30'
                                        } bg-gradient-to-r ${getScoreGradient(report.score)}`}
                                >
                                    {isFixing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Auto-fixing Colors...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>Auto-fix All Issues</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Detailed Report */}
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    Detailed Analysis
                    <span className={`text-sm font-normal px-3 py-1 rounded-full ${darkMode ? 'bg-white/10 text-gray-400' : 'bg-black/5 text-gray-500'}`}>
                        {report.results.length} Checks
                    </span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {report.results.map((result, index) => (
                        <div
                            key={index}
                            className={`group p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.01] ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white/60 border-white/40 hover:bg-white/80'
                                } ${result.level === 'FAIL' ? 'border-l-4 border-l-rose-500' : result.level === 'AA' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-emerald-500'}`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    {/* Color Preview */}
                                    <div className="relative">
                                        <div className="flex -space-x-3 relative z-10">
                                            <div className="w-12 h-12 rounded-full border-4 shadow-sm transition-transform group-hover:translate-x-1" style={{ backgroundColor: result.color1, borderColor: darkMode ? '#1f2937' : '#ffffff' }} />
                                            <div className="w-12 h-12 rounded-full border-4 shadow-sm flex items-center justify-center transition-transform group-hover:-translate-x-1" style={{ backgroundColor: result.color1, borderColor: darkMode ? '#1f2937' : '#ffffff' }}>
                                                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: result.color2 }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-lg">{result.pair}</h4>
                                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{result.message}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 pl-16 md:pl-0">
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Contrast Ratio</div>
                                        <div className={`text-2xl font-black tabular-nums ${result.ratio >= 7 ? 'text-emerald-500' : result.ratio >= 4.5 ? 'text-amber-500' : 'text-rose-500'
                                            }`}>
                                            {result.ratio.toFixed(2)}:1
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${result.level === 'AAA'
                                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                        : result.level === 'AA'
                                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                            : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                        }`}>
                                        {result.level}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
