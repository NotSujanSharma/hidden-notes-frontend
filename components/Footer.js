import Link from "next/link";

export default function Footer() {
    return (
        <div className=" bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <footer className="py-8 border-t border-indigo-800/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-indigo-300 mb-4 md:mb-0">© 2025 Anonymous Messaging Platform. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-indigo-300 hover:text-white">Privacy</Link>
                        <Link href="/terms" className="text-indigo-300 hover:text-white">Terms</Link>
                        <Link href="/help" className="text-indigo-300 hover:text-white">Help Center</Link>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    );
}