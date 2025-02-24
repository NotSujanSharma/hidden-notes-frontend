import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { register as registerUser } from '../utils/api';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, Eye, EyeOff, AlertCircle, Check, Info, ArrowLeft } from 'lucide-react';

export default function Register() {
    const { register: formRegister, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const password = watch('password', '');

    const onSubmit = async (data) => {
        setError('');
        try {
            await registerUser(data.email, data.password);
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    // Password strength checker
    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, text: 'No password', color: 'gray' };

        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        const strengthMap = [
            { text: 'Very weak', color: 'red' },
            { text: 'Weak', color: 'orange' },
            { text: 'Fair', color: 'yellow' },
            { text: 'Good', color: 'blue' },
            { text: 'Strong', color: 'green' }
        ];

        return {
            strength,
            text: strengthMap[strength - 1]?.text || 'No password',
            color: strengthMap[strength - 1]?.color || 'gray'
        };
    };

    const passwordStrength = getPasswordStrength(password);

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

    if (success) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-indigo-950 p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 p-8 text-center"
                >
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                        <Check size={32} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Registration Successful!</h2>
                    <p className="text-gray-600 dark:text-indigo-200 mb-6">
                        Please verify your email address to activate your account. Redirecting you to login...
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-sm transition-colors font-medium"
                    >
                        Go to Login
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-indigo-950 p-4">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h1>
                    <p className="mt-2 text-gray-600 dark:text-indigo-200">Join us and start receiving anonymous feedback</p>
                </div>

                {/* Registration Form */}
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
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters'
                                            }
                                        })}
                                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-indigo-700 rounded-lg bg-gray-50 dark:bg-indigo-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-indigo-400 hover:text-gray-600 dark:hover:text-indigo-300"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.password.message}
                                    </p>
                                )}

                                {/* Password strength meter */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-xs font-medium text-gray-500 dark:text-indigo-300 flex items-center gap-1">
                                                <Info size={12} />
                                                Password strength: <span className={`text-${passwordStrength.color}-600 dark:text-${passwordStrength.color}-400`}>{passwordStrength.text}</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-${passwordStrength.color}-500 transition-all duration-300`}
                                                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-indigo-200">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400 dark:text-indigo-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...formRegister('confirmPassword', {
                                            required: 'Please confirm your password',
                                            validate: value => value === password || 'Passwords do not match'
                                        })}
                                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-indigo-700 rounded-lg bg-gray-50 dark:bg-indigo-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-indigo-400 hover:text-gray-600 dark:hover:text-indigo-300"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    {...formRegister('terms', { required: 'You must agree to the terms' })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-indigo-200">
                                    I agree to the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
                                </label>
                            </div>
                            {errors.terms && (
                                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.terms.message}
                                </p>
                            )}

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
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        Create Account
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Login Option */}
                <motion.div
                    className="mt-6 text-center"
                    variants={itemVariants}
                >
                    <a
                        href="/login"
                        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to login
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}