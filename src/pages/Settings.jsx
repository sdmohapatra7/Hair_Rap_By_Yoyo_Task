import React, { useState } from 'react';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        promo: true
    });

    const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your profile and preferences.</p>
            </header>

            <div className="space-y-8">
                {/* Profile Section */}
                <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile Information</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                                <input type="text" defaultValue="John" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                                <input type="text" defaultValue="Smith" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input type="email" defaultValue="john.smith@example.com" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                            <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                            Save Changes
                        </button>
                    </div>
                </section>

                {/* Notifications Section */}
                <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Notifications</h2>
                    <div className="space-y-4">
                        {[
                            { id: 'email', label: 'Email Notifications', desc: 'Receive booking confirmations via email.' },
                            { id: 'sms', label: 'SMS Reminders', desc: 'Get text alerts 1 hour before appointment.' },
                            { id: 'promo', label: 'Promotional Offers', desc: 'Be the first to know about discounts.' },
                        ].map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</div>
                                </div>
                                <button
                                    onClick={() => toggle(item.id)}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications[item.id] ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications[item.id] ? 'translate-x-6' : ''}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
