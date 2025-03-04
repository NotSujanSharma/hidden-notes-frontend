import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import Link from 'next/link';
import { Menu, X, Moon, Sun, User, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const token = useAuthStore((state) => state.token);
    const [theme, setTheme] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.add(savedTheme);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white dark:bg-indigo-950/80 border-b border-indigo-200 dark:border-indigo-800/50 shadow-sm transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" legacyBehavior>
                        <a className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold">H</span>
                            </div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-colors duration-300">
                                Hidden Notes
                            </h1>
                        </a>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {token ? (
                            <>
                                <Link href="/dashboard" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white flex items-center gap-2 transition-colors duration-300">
                                        <LayoutDashboard size={18} />
                                        <span>Dashboard</span>
                                    </a>
                                </Link>
                                <Link href="/profile" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white flex items-center gap-2 transition-colors duration-300">
                                        <User size={18} />
                                        <span>Profile</span>
                                    </a>
                                </Link>
                                <Link href="/logout" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white flex items-center gap-2 transition-colors duration-300">
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </a>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300">
                                        Login
                                    </a>
                                </Link>
                                <Link href="/register" legacyBehavior>
                                    <a className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors duration-300">
                                        Register
                                    </a>
                                </Link>
                            </>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="ml-2 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300"
                            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300"
                            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300"
                            aria-label="Open menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-indigo-950 border-t border-indigo-200 dark:border-indigo-800/50 transition-colors duration-300"
                    >
                        <div className="container mx-auto px-4 py-3 space-y-1">
                            {token ? (
                                <>
                                    <Link href="/dashboard" legacyBehavior>
                                        <a className="px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white flex items-center gap-2 transition-colors duration-300">
                                            <LayoutDashboard size={18} />
                                            <span>Dashboard</span>
                                        </a>
                                    </Link>
                                    <Link href="/profile" legacyBehavior>
                                        <a className="px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white flex items-center gap-2 transition-colors duration-300">
                                            <User size={18} />
                                            <span>Profile</span>
                                        </a>
                                    </Link>
                                    <Link href="/logout" legacyBehavior>
                                        <a className="px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white flex items-center gap-2 transition-colors duration-300">
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </a>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" legacyBehavior>
                                        <a className="block px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300">
                                            Login
                                        </a>
                                    </Link>
                                    <Link href="/register" legacyBehavior>
                                        <a className="block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-colors duration-300">
                                            Register
                                        </a>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}