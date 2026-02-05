import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const stats = [
        { label: 'Upcoming Bookings', value: '2', icon: '📅', color: 'bg-blue-100 text-blue-600' },
        { label: 'Loyalty Points', value: '350', icon: '💎', color: 'bg-purple-100 text-purple-600' },
        { label: 'Reviews Given', value: '12', icon: '⭐', color: 'bg-yellow-100 text-yellow-600' },
    ];

    const recentActivity = [
        { id: 1, text: 'You booked a Haircut', date: 'Today, 2:30 PM', icon: '✂️' },
        { id: 2, text: 'Points added from visit', date: 'Yesterday', icon: '💎' },
        { id: 3, text: 'Left a review for Styling', date: '3 days ago', icon: '✍️' },
    ];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, John!</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Next Appointment */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Next Appointment</h2>
                    <div className="bg-primary-50 dark:bg-gray-700 rounded-xl p-4 flex gap-4">
                        <div className="bg-white dark:bg-gray-600 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-primary-600 dark:text-primary-300 font-bold shadow-sm">
                            <span className="text-xs uppercase">Oct</span>
                            <span className="text-xl">24</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">Men's Haircut</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">with Alex • 4:00 PM</p>
                            <button
                                onClick={() => navigate('/bookings')}
                                className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                View Details →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {recentActivity.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.text}</div>
                                    <div className="text-xs text-gray-400">{item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
