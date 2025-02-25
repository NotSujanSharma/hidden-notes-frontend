import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Shield, Users } from 'lucide-react';

export default function Home() {
    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br  dark:from-indigo-950 dark:via-purple-900 dark:to-indigo-900 from-blue-50 via-indigo-100 to-purple-100 text-gray-800 dark:text-white transition-colors duration-300">
            {/* Hero Section */}
            <header className="container mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 mb-12 lg:mb-0">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="space-y-6"
                        >
                            <motion.span variants={itemVariants} className="inline-block px-3 py-1 bg-blue-500 dark:bg-indigo-600 text-white rounded-full text-sm font-medium mb-2 transition-colors duration-300">
                                Hidden Notes
                            </motion.span>

                            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Connect Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-colors duration-300">Anonymous</span> Conversations
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-indigo-100 max-w-md transition-colors duration-300">
                                Give and receive honest feedback, meaningful questions, heartfelt compliments, or express your feelings without revealing your identity.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
                                <Link href="/register" legacyBehavior>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
                                    >
                                        Get Started <ArrowRight size={18} />
                                    </motion.button>
                                </Link>
                                <Link href="/login" legacyBehavior>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-6 py-3 bg-transparent border border-blue-400 dark:border-indigo-400 text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-indigo-800/20 rounded-lg font-semibold transition-colors duration-300"
                                    >
                                        Login to Your Account
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* This would be better with an actual image, but using a placeholder for now */}
                            <div className="bg-gradient-to-br from-white to-indigo-100 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-300/20 shadow-xl backdrop-blur-sm transition-colors duration-300">
                                <div className="space-y-4">
                                    <div className="bg-blue-100 dark:bg-indigo-800/50 p-4 rounded-lg transition-colors duration-300">
                                        <p className="text-blue-600 dark:text-indigo-200 transition-colors duration-300">Anonymous says:</p>
                                        <p className="font-medium text-gray-800 dark:text-white transition-colors duration-300">Your presentation today was inspiring! The way you handled those tough questions was impressive.</p>
                                    </div>
                                    <div className="bg-purple-100 dark:bg-purple-800/50 p-4 rounded-lg transition-colors duration-300">
                                        <p className="text-purple-600 dark:text-purple-200 transition-colors duration-300">Anonymous says:</p>
                                        <p className="font-medium text-gray-800 dark:text-white transition-colors duration-300">I love you more than you can ever imagine, but I cannot express my feelings in front of you. with love - anonymous</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-300/40 dark:bg-blue-500/30 rounded-full filter blur-xl transition-colors duration-300"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-300/40 dark:bg-purple-500/30 rounded-full filter blur-xl transition-colors duration-300"></div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-white/80 dark:bg-indigo-950/50 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300">Why Choose Our Platform?</h2>
                        <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto transition-colors duration-300">Discover the benefits of anonymous communication in a secure, respectful environment.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-white dark:bg-indigo-900/50 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <Shield className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4 transition-colors duration-300" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-300">Complete Anonymity</h3>
                            <p className="text-gray-600 dark:text-indigo-200 transition-colors duration-300">Your identity remains completely private when sending messages, allowing for honest communication.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="bg-white dark:bg-indigo-900/50 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <MessageCircle className="w-12 h-12 text-purple-500 dark:text-purple-400 mb-4 transition-colors duration-300" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-300">Meaningful Feedback</h3>
                            <p className="text-gray-600 dark:text-indigo-200 transition-colors duration-300">Receive genuine opinions and insights that people might hesitate to share face-to-face.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="bg-white dark:bg-indigo-900/50 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <Users className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4 transition-colors duration-300" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-300">Community Guidelines</h3>
                            <p className="text-gray-600 dark:text-indigo-200 transition-colors duration-300">Our platform encourages constructive communication and prevents harassment or abuse.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="container mx-auto px-4 text-center"
                >
                    <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-indigo-100 dark:from-blue-500/10 dark:to-purple-500/10 p-8 md:p-12 rounded-2xl border border-indigo-200 dark:border-indigo-300/20 shadow-lg transition-colors duration-300">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300">Ready to get started?</h2>
                        <p className="text-xl text-gray-600 dark:text-indigo-200 mb-8 transition-colors duration-300">Create your profile and share your unique link with friends, colleagues, or your audience.</p>
                        <Link href="/register" legacyBehavior>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-bold text-lg transition-colors duration-300"
                            >
                                Create Your Free Account
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}