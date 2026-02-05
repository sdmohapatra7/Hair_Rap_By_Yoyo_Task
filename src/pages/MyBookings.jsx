import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, cancelBooking } from '../store/bookingsSlice';
import { Link } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

const MyBookings = () => {
    const dispatch = useDispatch();
    const { items: bookings, status } = useSelector((state) => state.bookings);
    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest first) or 'asc'
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const initiateCancel = (id) => {
        setBookingToCancel(id);
        setIsModalOpen(true);
    };

    const confirmCancel = () => {
        if (bookingToCancel) {
            dispatch(cancelBooking(bookingToCancel));
            setBookingToCancel(null);
        }
    };

    // Filter Logic
    const filteredBookings = bookings.filter(booking => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Pending') return booking.status === 'Confirmed';
        if (activeTab === 'Canceled') return booking.status === 'Cancelled';
        return booking.status === activeTab; // Completed
    }).sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return "bg-green-100 text-green-700";
            case 'Cancelled': return "bg-red-100 text-red-700";
            case 'Confirmed': return "bg-blue-100 text-blue-700"; // Pending
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            }); // Tue 30 Sep
        } catch (e) { return dateString; }
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'All', label: 'All', count: bookings.length },
        { id: 'Pending', label: 'Pending', count: bookings.filter(b => b.status === 'Confirmed').length },
        { id: 'Canceled', label: 'Canceled', count: bookings.filter(b => b.status === 'Cancelled').length },
        { id: 'Completed', label: 'Completed', count: bookings.filter(b => b.status === 'Completed').length },
    ];

    return (
        <div className="w-full p-4 md:p-8">
            {/* Tabs Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div className="flex bg-transparent gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm border border-gray-100 font-bold'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 sm:mt-0">
                    <span>Sort by</span>
                    <button
                        onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                        className="flex items-center hover:text-gray-600 gap-1"
                    >
                        <svg className={`w-4 h-4 transform transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        No {activeTab} bookings found.
                    </div>
                ) : filteredBookings.map(booking => (
                    <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">{booking.serviceName}</h3>
                                    <p className="text-gray-400 text-sm font-medium"># {booking.id.toString().slice(-4).toUpperCase() || '102'}</p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="">
                                <span className={`px-4 py-1 rounded-full text-xs font-bold capitalize ${getStatusStyle(booking.status)}`}>
                                    {booking.status === 'Confirmed' ? 'Pending' : booking.status}
                                </span>
                            </div>
                        </div>

                        {/* Details Row */}
                        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-4 mt-8">
                            <div className="w-full md:w-auto flex flex-col md:flex-row gap-1 md:gap-2">
                                <span className="text-pink-500 font-medium">Booking Date</span>
                                <span className="text-gray-600 dark:text-gray-300 font-medium">{formatDate(booking.date)} • {booking.time}</span>
                            </div>

                            <div className="w-full md:w-auto flex flex-col md:flex-row gap-1 md:gap-2 text-right md:text-left">
                                <span className="text-gray-900 dark:text-gray-100 font-bold">Total paid</span>
                                <span className="text-gray-900 dark:text-gray-100 font-bold">₹{booking.price}</span>
                            </div>

                            <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-6">
                                <Link to={`/bookings/${booking.id}`} className="text-pink-500 font-medium text-sm hover:text-pink-600 flex items-center">
                                    Booking Details <span className="ml-1">&gt;</span>
                                </Link>

                                {booking.status === 'Confirmed' && (
                                    <button
                                        onClick={() => initiateCancel(booking.id)}
                                        className="text-red-400 text-sm font-medium hover:text-red-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                                {booking.status === 'Cancelled' && (
                                    <span className="text-red-300 text-xs px-3 py-1 bg-red-50 rounded-full">Cancelled</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmCancel}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking?"
                isDangerous={true}
            />
        </div>
    );
};

export default MyBookings;
