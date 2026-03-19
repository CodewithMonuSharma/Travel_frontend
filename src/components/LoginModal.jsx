import React, { useState, useContext } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const res = await api.post('/auth/login/', { username: email, password });
                login(res.data);
                onClose();
            } else {
                await api.post('/auth/register/', { username: email, email, password, first_name: name });
                // Switch to login mode after successful registration
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }
        } catch (err) {
            setError(err.response?.data?.detail || err.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await api.post('/auth/google/', { token: credentialResponse.credential });
            login(res.data);
            onClose();
        } catch (err) {
            setError('Google login failed');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-slate-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-500 font-medium">
                            {isLogin ? 'Sign in to manage your bookings and saved tours.' : 'Join us to explore the unseen beauty of North India.'}
                        </p>
                    </div>

                    {error && <p className={`mb-4 text-center text-sm font-semibold ${error.includes('successful') ? 'text-emerald-500' : 'text-red-500'}`}>{error}</p>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <UserIcon size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Forgot Password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-[0_4px_15px_rgb(16,185,129,0.3)] transition-all hover:shadow-[0_4px_20px_rgb(16,185,129,0.4)] transform hover:-translate-y-0.5"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-4 flex flex-col items-center gap-4">
                        <p className="text-sm font-medium text-slate-500">Or continue with</p>
                        <GoogleLogin 
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google login failed')}
                            theme="outline"
                            size="large"
                            width="100%"
                        />
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 font-medium text-sm">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                            >
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
