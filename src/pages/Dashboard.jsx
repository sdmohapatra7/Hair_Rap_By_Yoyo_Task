import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // Mock user statistics
    const stats = [
        { label: 'Upcoming', value: '2', icon: '📅', color: 'bg-blue-100 text-blue-600' },
        { label: 'Completed', value: '12', icon: '✅', color: 'bg-green-100 text-green-600' },
        { label: 'Favorites', value: '4', icon: '❤️', color: 'bg-red-100 text-red-600' },
    ];

    const upcomingBookings = [
        {
            id: 1,
            service: "Men's Haircut",
            date: "Today, 4:00 PM",
            stylist: "John Doe",
            status: "Confirmed",
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            service: "Beard Trim",
            date: "Tomorrow, 2:00 PM",
            stylist: "Mike Ross",
            status: "Pending",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d66503c?auto=format&fit=crop&q=80&w=200"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up px-4 py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, John! 👋</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Here's what's happening with your bookings.</p>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Bookings */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Bookings</h2>
                    <Link to="/bookings" className="text-primary-600 font-medium hover:text-primary-700 text-sm">View all</Link>
                </div>

                <div className="space-y-4">
                    {upcomingBookings.map(booking => (
                        <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={booking.image} alt={booking.service} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white">{booking.service}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                    <span>🗓️ {booking.date}</span>
                                    <span>•</span>
                                    <span>✂️ {booking.stylist}</span>
                                </p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-xs font-bold ${booking.status === 'Confirmed'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}>
                                {booking.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <Link to="/services" className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-primary-200">
                    <span className="text-3xl">📅</span>
                    <span className="font-bold">Book New Appointment</span>
                </Link>
                <Link to="/ai-chat" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 text-gray-900 dark:text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-colors group">
                    <span className="text-3xl group-hover:scale-110 transition-transform">🤖</span>
                    <span className="font-bold">Ask AI Assistant</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
