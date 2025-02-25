import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-white dark:bg-gradient-to-br dark:from-purple-900 dark:to-indigo-900 bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800 dark:text-white transition-colors duration-300">
            <footer className="py-6 border-t border-indigo-200 dark:border-indigo-800/50 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 dark:text-indigo-200 mb-4 md:mb-0 transition-colors duration-300">© 2025 Sujan Sharma. All rights reserved.</p>
                        <div className="flex space-x-6">
                            <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300">Privacy</Link>
                            <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300">Terms</Link>
                            <Link href="/help" className="text-gray-600 hover:text-blue-600 dark:text-indigo-200 dark:hover:text-white transition-colors duration-300">Help Center</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}