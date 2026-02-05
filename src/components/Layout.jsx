import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const location = useLocation();

    // Check if the current route should use the dashboard layout (with sidebar)
    const isDashboardRoute = location.pathname.startsWith('/bookings') || location.pathname.startsWith('/profile');
    const isAIAssistantRoute = location.pathname === '/ai-chat';

    if (isAIAssistantRoute) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <div className={`flex ${isDashboardRoute ? 'max-w-7xl mx-auto' : ''}`}>
                {isDashboardRoute && <Sidebar />}
                <main className={`flex-1 ${isDashboardRoute ? 'bg-secondary-50 dark:bg-gray-900 min-h-[calc(100vh-64px)]' : ''} transition-colors duration-300`}>
                    {children}
                </main>
            </div>

            {/* Simple footer */}
            <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12 mt-auto transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>Features</li>
                                <li>Pricing</li>
                                <li>Case studies</li>
                                <li>Reviews</li>
                                <li>Updates</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>Getting started</li>
                                <li>Help center</li>
                                <li>Server status</li>
                                <li>Report a bug</li>
                                <li>Chat support</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-4">For Provider</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>About</li>
                                <li>Contact us</li>
                                <li>Careers</li>
                                <li>Faqs</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-4">SignUp For Subscription</h4>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Enter Email Address"
                                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                                />
                                <button className="w-full bg-primary-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">Copyright © 2025 - All Rights Reserved SalonWala</p>
                        <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-500">
                            <span>Terms and Conditions</span>
                            <span>Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
