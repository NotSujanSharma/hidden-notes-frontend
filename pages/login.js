import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { login } from '../utils/api';
import { useAuthStore } from '../store/auth';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
    const { register: formRegister, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const router = useRouter();
    const setToken = useAuthStore((state) => state.setToken);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        setError('');
        try {
            const response = await login(data.email, data.password);
            setToken(response.token);
            router.push('/dashboard');
        } catch (error) {
            setError(error.message || 'Login failed. Please check your credentials.');
        }
    };

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-indigo-950 p-4">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="w-full max-w-md"
            >
                {/* Logo/Branding */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
                    <p className="mt-2 text-gray-600 dark:text-indigo-200">Sign in to access your account</p>
                </div>

                {/* Login Form */}
                <motion.div
                    className="bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="p-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300"
                            >
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-indigo-200">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400 dark:text-indigo-400" />
                                    </div>
                                    <input
                                        type="email"
                                        {...formRegister('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-indigo-700 rounded-lg bg-gray-50 dark:bg-indigo-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-indigo-200">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400 dark:text-indigo-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...formRegister('password', {
                                            required: 'Password is required'
                                        })}
                                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-indigo-700 rounded-lg bg-gray-50 dark:bg-indigo-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-indigo-400 hover:text-gray-600 dark:hover:text-indigo-300"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-indigo-200">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-sm transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-indigo-900"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={18} />
                                        Sign in
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Register Option */}
                <motion.div
                    className="mt-6 text-center"
                    variants={itemVariants}
                >
                    <p className="text-gray-600 dark:text-indigo-200">
                        Don't have an account?{' '}
                        <a
                            href="/register"
                            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                        >
                            Create one now
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}