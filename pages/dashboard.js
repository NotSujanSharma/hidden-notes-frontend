import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/auth';
import { getLink, getMessages } from '../utils/api';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const [link, setLink] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else {
            const fetchData = async () => {
                try {
                    const linkData = await getLink();
                    setLink(linkData);
                    const messagesData = await getMessages();
                    setMessages(messagesData);
                } catch (error) {
                    alert(error.message);
                }
            };
            fetchData();
        }
    }, [token, router]);

    if (!token) return null;

    return (
        <div className="p-8 dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">Dashboard</h1>
            {link && (
                <div className="mb-8">
                    <p className="dark:text-gray-300">
                        Your unique link: <a href={`/submit/${link.link_id}`} className="text-blue-600 dark:text-blue-400">{`https://example.com/submit/${link.link_id}`}</a>
                    </p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`https://example.com/submit/${link.link_id}`);
                            alert('Link copied!');
                        }}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Copy Link
                    </button>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Messages</h2>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                {messages.map((message) => (
                    <div
                        key={message.message_id}
                        className={`p-4 bg-white dark:bg-gray-700 rounded-lg shadow ${!message.is_read ? 'bg-yellow-100 dark:bg-yellow-800' : ''}`}
                    >
                        <p className="text-gray-700 dark:text-gray-300">{message.content}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {message.category} - {new Date(message.created_at).toLocaleString()}
                        </p>
                        <p className="text-sm">{message.is_read ? 'Read' : 'Unread'}</p>
                        <button className="mt-2 px-2 py-1 bg-red-600 text-white rounded">Flag</button>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}