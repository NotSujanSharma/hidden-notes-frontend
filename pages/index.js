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
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
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
                            <motion.span variants={itemVariants} className="inline-block px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium mb-2">
                                Hidden Notes
                            </motion.span>

                            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Connect Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Anonymous</span> Conversations
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg md:text-xl text-indigo-100 max-w-md">
                                Give and receive honest feedback, meaningful questions, or heartfelt compliments without revealing your identity.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
                                <Link href="/register" legacyBehavior>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold flex items-center justify-center gap-2"
                                    >
                                        Get Started <ArrowRight size={18} />
                                    </motion.button>
                                </Link>
                                <Link href="/login" legacyBehavior>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-6 py-3 bg-transparent border border-indigo-400 hover:bg-indigo-800/20 text-white rounded-lg font-semibold"
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
                            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-indigo-300/20 shadow-xl backdrop-blur-sm">
                                <div className="space-y-4">
                                    <div className="bg-indigo-800/50 p-4 rounded-lg">
                                        <p className="text-indigo-200">Anonymous says:</p>
                                        <p className="font-medium">Your presentation today was inspiring! The way you handled those tough questions was impressive.</p>
                                    </div>
                                    <div className="bg-purple-800/50 p-4 rounded-lg">
                                        <p className="text-purple-200">Anonymous says:</p>
                                        <p className="font-medium">Have you considered adding more examples to the documentation? It would really help new users.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/30 rounded-full filter blur-xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/30 rounded-full filter blur-xl"></div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-indigo-950/50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
                        <p className="text-indigo-200 max-w-2xl mx-auto">Discover the benefits of anonymous communication in a secure, respectful environment.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-indigo-900/50 p-6 rounded-xl border border-indigo-800"
                        >
                            <Shield className="w-12 h-12 text-blue-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Complete Anonymity</h3>
                            <p className="text-indigo-200">Your identity remains completely private when sending messages, allowing for honest communication.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="bg-indigo-900/50 p-6 rounded-xl border border-indigo-800"
                        >
                            <MessageCircle className="w-12 h-12 text-purple-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Meaningful Feedback</h3>
                            <p className="text-indigo-200">Receive genuine opinions and insights that people might hesitate to share face-to-face.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="bg-indigo-900/50 p-6 rounded-xl border border-indigo-800"
                        >
                            <Users className="w-12 h-12 text-blue-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Community Guidelines</h3>
                            <p className="text-indigo-200">Our platform encourages constructive communication and prevents harassment or abuse.</p>
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
                    <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 md:p-12 rounded-2xl border border-indigo-300/20">
                        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                        <p className="text-xl text-indigo-200 mb-8">Create your profile and share your unique link with friends, colleagues, or your audience.</p>
                        <Link href="/register" legacyBehavior>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold text-lg"
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