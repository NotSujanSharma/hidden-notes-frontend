import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useState } from 'react';
import { submitMessage } from '../../utils/api';
import Head from 'next/head';
import { getUserName } from '../../utils/api';
import { motion } from 'framer-motion';
import { MessageCircle, Send, AlertCircle } from 'lucide-react';

export default function SubmitMessage() {
    const router = useRouter();
    const { link_id } = router.query;
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    const [captcha, setCaptcha] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (router.isReady && !link_id) {
            router.push('/');
            return;
        }
        const fetchData = async (link_id) => {
            setLoading(true);
            try {
                const name = await getUserName(link_id);
                setName(name.name);
                document.title = `Send a message to ${name.name} | Hidden Notes`;
            } catch (error) {
                console.error("Error fetching data:", error);
                showToast(error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        if (router.isReady && link_id) {
            fetchData(link_id);
        }
    }, [link_id, router.isReady]);

    const onSubmit = async (data) => {
        // if (!captcha) {
        //     showToast('Please complete the CAPTCHA', 'error');
        //     return;
        // }

        setLoading(true);
        try {
            await submitMessage(link_id, data.content, data.category, captcha);
            setSubmitted(true);
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type) => {
        // This would ideally use a toast library
        alert(message);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-indigo-950 flex justify-center items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-8 bg-white dark:bg-indigo-900/50 rounded-xl shadow-lg max-w-md mx-4"
                >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Message Sent!</h2>
                    <p className="text-gray-600 dark:text-indigo-200 mb-4">
                        Your anonymous message has been delivered successfully.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-indigo-300">
                        Redirecting you back to home...
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{name ? `Send a message to ${name}` : 'Hidden Notes'}</title>
                <meta name="description" content="Send an anonymous message to someone." />
            </Head>
            <div className="min-h-screen bg-gray-50 dark:bg-indigo-950 flex justify-center items-center p-4">
                {loading ? (
                    <div className="animate-pulse flex space-x-4 p-8 bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm w-full max-w-md">
                        <div className="rounded-full bg-indigo-200 dark:bg-indigo-700 h-12 w-12"></div>
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-indigo-200 dark:bg-indigo-700 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
                                <div className="h-4 bg-indigo-200 dark:bg-indigo-700 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full max-w-md"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-200 dark:border-indigo-800">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <MessageCircle size={20} className="text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        Send a Message
                                    </h2>
                                </div>
                                <p className="text-gray-600 dark:text-indigo-200 text-sm">
                                    Send anonymously to <span className="font-bold text-lg">{name}</span>
                                </p>
                            </div>

                            {/* Form Content */}
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-indigo-200 mb-1.5">
                                        Your Message
                                    </label>
                                    <textarea
                                        {...formRegister('content', {
                                            required: 'Please enter your message',
                                            maxLength: { value: 1000, message: 'Message must be less than 1000 characters' },
                                        })}
                                        className={`w-full p-3 bg-gray-50 dark:bg-indigo-950/50 border ${errors.content ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-indigo-700'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-800 dark:text-white`}
                                        placeholder="What would you like to say?"
                                        rows="6"
                                    />
                                    {errors.content && (
                                        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5">
                                            <AlertCircle size={14} />
                                            {errors.content.message}
                                        </p>
                                    )}
                                </div>

                                <div className='hidden'>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-indigo-200 mb-1.5">
                                        Category
                                    </label>
                                    <select
                                        {...formRegister('category', { required: 'Please select a category' })}
                                        className={`w-full p-3 bg-gray-50 dark:bg-indigo-950/50 border ${errors.category ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-indigo-700'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-800 dark:text-white`}
                                        
                                        >
                                        <option value="">Select a category</option>
                                        <option value="Inner Feelings" selected>Inner Feelings</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Question">Question</option>
                                        <option value="Compliment">Compliment</option>
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5">
                                            <AlertCircle size={14} />
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-2">
                                    {/* <ReCAPTCHA
                                        sitekey="your_site_key"
                                        onChange={(value) => setCaptcha(value)}
                                        theme="light"
                                        className="recaptcha-container"
                                    />
                                    {!captcha && (
                                        <p className="mt-1 text-sm text-gray-500 dark:text-indigo-300">
                                            Please complete the verification above
                                        </p>
                                    )} */}
                                </div>
                            </div>

                            {/* Footer with Submit Button */}
                            <div className="p-6 border-t border-gray-200 dark:border-indigo-800 bg-gray-50 dark:bg-indigo-950/50">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full p-3 flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white rounded-lg shadow-sm transition-colors font-medium`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader size={18} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                                <p className="mt-4 text-xs text-center text-gray-500 dark:text-indigo-400">
                                    Your message will be sent anonymously.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                )}
            </div>
        </>
    );
}

// UI Components
const Check = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const Loader = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
);