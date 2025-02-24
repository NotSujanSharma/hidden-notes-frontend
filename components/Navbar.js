import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import Link from 'next/link';
import { Menu, X, Moon, Sun, User, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const token = useAuthStore((state) => state.token);
    const [theme, setTheme] = useState('light');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-indigo-950/90 dark:bg-indigo-950/90 border-b border-indigo-800/50 dark:border-indigo-800/50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" legacyBehavior>
                        <a className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-400 dark:to-purple-400">
                                Hidden Notes
                            </h1>
                        </a>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {token ? (
                            <>
                                <Link href="/dashboard" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200 flex items-center gap-2 transition-colors">
                                        <LayoutDashboard size={18} />
                                        <span>Dashboard</span>
                                    </a>
                                </Link>
                                <Link href="/profile" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200 flex items-center gap-2 transition-colors">
                                        <User size={18} />
                                        <span>Profile</span>
                                    </a>
                                </Link>
                                <Link href="/logout" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200 flex items-center gap-2 transition-colors">
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </a>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" legacyBehavior>
                                    <a className="px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200 transition-colors">
                                        Login
                                    </a>
                                </Link>
                                <Link href="/register" legacyBehavior>
                                    <a className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors">
                                        Register
                                    </a>
                                </Link>
                            </>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="ml-2 p-2 rounded-full hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200"
                            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200"
                            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200"
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
                        className="md:hidden bg-indigo-950 dark:bg-indigo-950 border-t border-indigo-800/50 dark:border-indigo-800/50"
                    >
                        <div className="container mx-auto px-4 py-3 space-y-1">
                            {token ? (
                                <>
                                    <Link href="/dashboard" legacyBehavior>
                                        <a className="block px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200 flex items-center gap-2">
                                            <LayoutDashboard size={18} />
                                            <span>Dashboard</span>
                                        </a>
                                    </Link>
                                    <Link href="/profile" legacyBehavior>
                                        <a className="block px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200 flex items-center gap-2">
                                            <User size={18} />
                                            <span>Profile</span>
                                        </a>
                                    </Link>
                                    <Link href="/logout" legacyBehavior>
                                        <a className="block px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200 flex items-center gap-2">
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </a>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" legacyBehavior>
                                        <a className="block px-4 py-2 rounded-lg hover:bg-indigo-900/50 dark:hover:bg-indigo-900/50 text-indigo-200 dark:text-indigo-200">
                                            Login
                                        </a>
                                    </Link>
                                    <Link href="/register" legacyBehavior>
                                        <a className="block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
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