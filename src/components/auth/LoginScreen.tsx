import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { useDarkMode } from '../../contexts/DarkModeContext';

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, signInWithGoogle, error } = useAuth();
    const { darkMode } = useDarkMode();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err) {
            // Error is handled in context
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();
            navigate('/');
        } catch (err) {
            // Error is handled in context
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Header />

            <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
                {/* Background Assets */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/auth-bg.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-50 blur-sm"
                    />
                    <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/80' : 'bg-white/60'} mix-blend-overlay`}></div>
                </div>

                {/* Floating Shapes (Decorative) */}
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/3 right-10 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className="max-w-md w-full space-y-8 relative z-10">
                    <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 ${darkMode ? 'bg-gray-800/60 border border-gray-700/50' : 'bg-white/70 border border-white/50'}`}>
                        <div className="text-center">
                            <h2 className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Welcome Back
                            </h2>
                            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Sign in to access your themes
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            {/* Google Sign In */}
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className={`w-full flex items-center justify-center px-4 py-3 border rounded-xl shadow-sm text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${darkMode
                                        ? 'bg-white text-gray-900 hover:bg-gray-100 border-transparent'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    }`}
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                {loading ? 'Connecting...' : 'Sign in with Google'}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className={`px-2 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white/50 text-gray-500'} backdrop-blur-xl rounded`}>
                                        Or continue with email
                                    </span>
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">Email address</label>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className={`appearance-none relative block w-full px-4 py-3 border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${darkMode
                                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                                                    : 'bg-white/50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                                                }`}
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className={`appearance-none relative block w-full px-4 py-3 border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${darkMode
                                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                                                    : 'bg-white/50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                                                }`}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className={`text-sm text-center p-3 rounded-lg ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800/50' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        {loading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : 'Sign in'}
                                    </button>
                                </div>
                            </form>

                            <div className="text-center">
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Don't have an account?{' '}
                                    <Link to="/signup" className={`font-medium hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                        Sign up now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer darkMode={darkMode} />
        </div>
    );
};
