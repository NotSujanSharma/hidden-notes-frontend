import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/auth';
import { getLink, getMessages } from '../utils/api';
import { motion } from 'framer-motion';
import { Copy, Flag, Check, Bell, MessageCircle, Link as LinkIcon, ExternalLink } from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const [link, setLink] = useState(null);
    const [messages, setMessages] = useState([]);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const linkData = await getLink();
                    setLink(linkData);
                    const messagesData = await getMessages();
                    setMessages(messagesData);
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

    const refreshMessages = async () => {
        setRefreshing(true);
        try {
            const messagesData = await getMessages();
            setMessages(messagesData);
        } catch (error) {
            console.error("Error refreshing messages:", error);
            showToast(error.message, "error");
        } finally {
            setRefreshing(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const copyToClipboard = () => {
        if (link) {
            navigator.clipboard.writeText(`https://example.com/submit/${link.link_id}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Simple toast notification (would be better with a proper toast library)
    const showToast = (message, type) => {
        // This would ideally use a toast library
        alert(message);
    };

    if (!token) return null;

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
            {/* Dashboard Header */}
            <div className="bg-white dark:bg-indigo-900/50 border-b border-gray-200 dark:border-indigo-800">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <LayoutDashboard size={32} className="text-blue-600 dark:text-blue-400" />
                        Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-indigo-200">
                        Manage your anonymous messages and share your unique link
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sidebar with Stats and Link */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Share Link Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                            <LinkIcon size={20} className="text-blue-500" />
                                            Your Anonymous Link
                                        </h2>
                                    </div>

                                    {link && (
                                        <div className="space-y-4">
                                            <p className="text-gray-600 dark:text-indigo-200 text-sm">
                                                Share this link with others to receive anonymous messages:
                                            </p>

                                            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-indigo-950/50 rounded-lg border border-gray-200 dark:border-indigo-800 overflow-hidden">
                                                <div className="truncate flex-1 font-mono text-sm text-gray-800 dark:text-indigo-200">
                                                    https://example.com/submit/{link.link_id}
                                                </div>
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="p-2 text-gray-500 dark:text-indigo-300 hover:text-blue-500 dark:hover:text-blue-400 bg-white dark:bg-indigo-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                    aria-label="Copy link"
                                                >
                                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                                <a
                                                    href={`/submit/${link.link_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-500 dark:text-indigo-300 hover:text-blue-500 dark:hover:text-blue-400 bg-white dark:bg-indigo-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                    aria-label="Open link"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={copyToClipboard}
                                                    className={`px-4 py-2.5 ${copied
                                                        ? 'bg-green-500 hover:bg-green-600'
                                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} 
                                                        text-white rounded-lg flex-1 flex items-center justify-center gap-2 transition-colors shadow-sm`}
                                                >
                                                    {copied ? (
                                                        <>
                                                            <Check size={18} />
                                                            Copied!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy size={18} />
                                                            Copy Link
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    className="px-4 py-2.5 bg-gray-100 dark:bg-indigo-800 text-gray-700 dark:text-indigo-200 hover:bg-gray-200 dark:hover:bg-indigo-700 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                                                    onClick={() => {
                                                        const shareData = {
                                                            title: 'Send me anonymous messages',
                                                            text: 'Send me anonymous feedback or messages!',
                                                            url: `https://example.com/submit/${link.link_id}`
                                                        };
                                                        if (navigator.share && navigator.canShare(shareData)) {
                                                            navigator.share(shareData);
                                                        } else {
                                                            copyToClipboard();
                                                        }
                                                    }}
                                                >
                                                    Share
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden"
                            >
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
                                        <ChartBar size={20} className="text-purple-500" />
                                        Message Stats
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                            <p className="text-sm text-blue-600 dark:text-blue-300 mb-1">Total Messages</p>
                                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">{messages.length}</p>
                                        </div>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                            <p className="text-sm text-purple-600 dark:text-purple-300 mb-1">Unread</p>
                                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">
                                                {messages.filter(m => !m.is_read).length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Messages Column */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-indigo-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-indigo-800 overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-indigo-800">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                            <MessageCircle size={20} className="text-indigo-500" />
                                            Recent Messages
                                        </h2>
                                        <div className="flex gap-2">
                                            <button onClick={refreshMessages} className="p-2 text-gray-600 dark:text-indigo-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-indigo-800 rounded-lg transition-colors">
                                                <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                                            </button>
                                            <button className="p-2 text-gray-600 dark:text-indigo-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-indigo-800 rounded-lg transition-colors">
                                                <Filter size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {messages.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <div className="inline-flex justify-center items-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50/50 rounded-full mb-4">
                                            <Inbox size={32} className="text-indigo-500 dark:text-indigo-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No messages yet</h3>
                                        <p className="text-gray-500 dark:text-indigo-300 mb-6">
                                            Share your link to start receiving anonymous messages
                                        </p>
                                        <button
                                            onClick={copyToClipboard}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-sm"
                                        >
                                            Copy Your Link
                                        </button>
                                    </div>
                                ) : (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="divide-y divide-gray-200 dark:divide-indigo-800"
                                    >
                                        {messages.map((message) => (
                                            <motion.div
                                                key={message.message_id}
                                                variants={itemVariants}
                                                className={`p-6 ${!message.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : ''} hover:bg-gray-50 dark:hover:bg-indigo-800/50 transition-colors`}
                                            >
                                                <div className="flex gap-4">
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${!message.is_read
                                                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-500 dark:text-blue-300'
                                                        : 'bg-gray-100 dark:bg-indigo-800 text-gray-500 dark:text-indigo-300'}`}>
                                                        {!message.is_read ? <Bell size={18} /> : <MessageCircle size={18} />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-gray-800 dark:text-white mb-2">{message.content}</p>
                                                        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-indigo-300 gap-x-4 gap-y-2">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200">
                                                                {message.category}
                                                            </span>
                                                            <span>{formatDate(message.created_at)}</span>
                                                            <span className={`flex items-center ${message.is_read
                                                                ? 'text-gray-500 dark:text-indigo-400'
                                                                : 'text-blue-500 dark:text-blue-300 font-medium'}`}>
                                                                {message.is_read ? 'Read' : 'New'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0 flex flex-col gap-2">
                                                        <button
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                            aria-label="Flag message"
                                                        >
                                                            <Flag size={18} />
                                                        </button>
                                                        {!message.is_read && (
                                                            <button
                                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                                aria-label="Mark as read"
                                                            >
                                                                <Check size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {messages.length > 0 && (
                                    <div className="p-4 border-t border-gray-200 dark:border-indigo-800 bg-gray-50 dark:bg-indigo-950/50 flex justify-center">
                                        <button className="px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                                            View All Messages
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Import these components
const LayoutDashboard = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
);

const ChartBar = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
);

const RefreshCw = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 2v6h6" />
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
        <path d="M21 22v-6h-6" />
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
    </svg>
);

const Filter = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const Inbox = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
);