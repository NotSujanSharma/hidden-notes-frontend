import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'next/router';
import { changePassword, getUser } from '../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Key, LogOut, Mail, CheckCircle, AlertCircle, Eye, EyeOff, Save } from 'lucide-react';

export default function Profile() {
    const router = useRouter();
    const { register: formRegister, handleSubmit, formState: { errors }, reset } = useForm();
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const userDetails = await getUser();
                    setName(userDetails.name);
                    setEmail(userDetails.email);
                    setEmailVerified(userDetails.emailVerified);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    showToast(error.message, "error");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [token, router]);

    if (!token) {
        return null;
    }

    const onSubmit = async (data) => {
        setFormSubmitting(true);
        setSuccessMessage('');
        setError('');
        try {
            await changePassword(data.currentPassword, data.newPassword);
            setSuccessMessage('Password changed successfully');
            reset({ currentPassword: '', newPassword: '' });
        } catch (error) {

            setError(error.message);
        } finally {
            setFormSubmitting(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Simple toast notification (would be better with a proper toast library)
    const showToast = (message, type) => {
        // This would ideally use a toast library
        alert(message);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-indigo-950 pb-16">
            {/* Profile Header */}
            <div className="bg-white dark:bg-indigo-900/50 border-b border-gray-200 dark:border-indigo-800">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <User size={32} className="text-blue-600 dark:text-blue-400" />
                        Profile Settings
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-indigo-200">
                        Manage your account information and security settings
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-indigo-200 dark:bg-indigo-700 h-12 w-12"></div>
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-indigo-200 dark:bg-indigo-700 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
                                    <div className="h-4 bg-indigo-200 dark:bg-indigo-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* User Info Column */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-1 space-y-6"
                        >
                            {/* Profile Card */}
                            <div className="bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                            <User size={20} className="text-blue-500" />
                                            Account Information
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Profile Avatar */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-3">
                                                {name.charAt(0).toUpperCase()}
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-800 dark:text-white">{name}</h3>
                                        </div>

                                        {/* User Details */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-indigo-950/50 rounded-lg border border-gray-200 dark:border-indigo-800">
                                                <Mail size={18} className="text-gray-500 dark:text-indigo-400" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500 dark:text-indigo-300">Email Address</p>
                                                    <p className="text-gray-800 dark:text-white font-medium">{email}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    {emailVerified ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                                            <CheckCircle size={14} className="mr-1" />
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                                                            <AlertCircle size={14} className="mr-1" />
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {!emailVerified && (
                                                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                                                    <Mail size={18} />
                                                    Verify Email
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Settings Column */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-indigo-800">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                        <Key size={20} className="text-purple-500" />
                                        Security Settings
                                    </h2>
                                </div>

                                <div className="p-6">
                                    {successMessage && (
                                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 flex items-center gap-2">
                                            <CheckCircle size={18} />
                                            {successMessage}
                                        </div>
                                        )}
                                        {error && (
                                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 flex items-center gap-2">
                                                <CheckCircle size={18} />
                                                {error}
                                            </div>
                                        )}

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    {...formRegister('currentPassword', { required: 'Current password is required' })}
                                                    className={`w-full px-4 py-3 rounded-lg border ${errors.currentPassword ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-indigo-700 bg-white dark:bg-indigo-950/50'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-white`}
                                                    placeholder="Enter your current password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-indigo-400 hover:text-gray-700 dark:hover:text-indigo-200"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {errors.currentPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.currentPassword.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    {...formRegister('newPassword', {
                                                        required: 'New password is required',
                                                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                                    })}
                                                    className={`w-full px-4 py-3 rounded-lg border ${errors.newPassword ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-indigo-700 bg-white dark:bg-indigo-950/50'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-white`}
                                                    placeholder="Enter your new password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-indigo-400 hover:text-gray-700 dark:hover:text-indigo-200"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {errors.newPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.newPassword.message}</p>}
                                            <p className="mt-2 text-sm text-gray-500 dark:text-indigo-300">Password must be at least 8 characters long</p>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                type="submit"
                                                disabled={formSubmitting}
                                                className={`flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            >
                                                {formSubmitting ? (
                                                    <>
                                                        <span className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></span>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save size={18} />
                                                        Update Password
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Additional Security Options Card */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-6 bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden"
                            >
                                <div className="p-6 border-b border-gray-200 dark:border-indigo-800">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                        <Shield size={20} className="text-indigo-500" />
                                        Additional Security Options
                                    </h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        <button className="w-full px-4 py-3 bg-gray-100 dark:bg-indigo-800 text-gray-700 dark:text-indigo-200 hover:bg-gray-200 dark:hover:bg-indigo-700 rounded-lg flex items-center justify-between transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-100 dark:bg-indigo-700 rounded-lg">
                                                    <ShieldCheck size={18} className="text-indigo-500 dark:text-indigo-300" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium">Two-Factor Authentication</p>
                                                    <p className="text-sm text-gray-500 dark:text-indigo-300">Add an extra layer of security to your account</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-400" />
                                        </button>

                                        <button className="w-full px-4 py-3 bg-gray-100 dark:bg-indigo-800 text-gray-700 dark:text-indigo-200 hover:bg-gray-200 dark:hover:bg-indigo-700 rounded-lg flex items-center justify-between transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-100 dark:bg-indigo-700 rounded-lg">
                                                    <ActivityIcon size={18} className="text-indigo-500 dark:text-indigo-300" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium">Login Activity</p>
                                                    <p className="text-sm text-gray-500 dark:text-indigo-300">View your recent account activity</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

// Import these components
const Shield = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const ShieldCheck = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const ActivityIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

const ChevronRight = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="9 18 15 12 9 6" />
    </svg>
);