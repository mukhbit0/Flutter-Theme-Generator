import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Sparkles, Zap } from 'lucide-react';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { darkMode } = useDarkMode();

  const steps = [
    { icon: () => null, text: 'Initializing Flutter Theme Generator...', color: 'text-indigo-600' },
    { icon: Sparkles, text: 'Generating Color Schemes...', color: 'text-purple-600' },
    { icon: Zap, text: 'Building Theme Files...', color: 'text-pink-600' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const newProgress = prev + 2;
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div
      className={
        `fixed inset-0 flex items-center justify-center z-50 ` +
        (darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50')
      }
    >
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-white via-slate-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl transform animate-pulse border border-gray-200">
            <img src="/logo.png" alt="Flutter Theme Generator Logo" className="w-24 h-24 object-contain" />
          </div>
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        </div>
        {/* Brand Name */}
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Flutter Theme Generator
          </span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">Generate beautiful Flutter themes instantly</p>
        {/* Current Step */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`p-2 rounded-full bg-gray-100 ${steps[currentStep].color}`}>
            <CurrentIcon className="w-5 h-5 animate-spin" />
          </div>
          <span className="text-gray-700 font-medium">{steps[currentStep].text}</span>
        </div>
        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        {/* Version */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-xs text-gray-400">v2.0 • Flutter Theme Generator</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
