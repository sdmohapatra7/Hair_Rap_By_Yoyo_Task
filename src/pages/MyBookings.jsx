import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, cancelBooking } from '../store/bookingsSlice';
import { Link } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

const MyBookings = () => {
    const dispatch = useDispatch();
    const { items: bookings, status, error, cancelStatus } = useSelector((state) => state.bookings);
    const [activeTab, setActiveTab] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest first) or 'asc' (oldest first)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

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

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            }); // Tue 30 Sep
        } catch (e) {
            return dateString;
        }
    };

    const tabs = [
        { name: 'All', count: bookings.length },
        { name: 'Pending', count: bookings.filter(b => b.status === 'Confirmed').length },
        { name: 'Cancelled', count: bookings.filter(b => b.status === 'Cancelled').length },
        { name: 'Completed', count: bookings.filter(b => b.status === 'Completed').length },
    ];

    const filteredBookings = bookings.filter(booking => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Pending') return booking.status === 'Confirmed';
        return booking.status === activeTab;
    }).sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Header */}
            <div className="mb-8 relative h-48 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Dashboard" />
                <div className="relative z-20 text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <Link to="/" className="hover:text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg></Link>
                        <span>&gt;</span>
                        <span>Customer</span>
                        <span>&gt;</span>
                        <span className="text-white">Dashboard</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Tabs & Sort */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex space-x-1 w-full sm:w-auto overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.name
                                    ? 'bg-primary-100 text-primary-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.name} ({tab.count})
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 text-sm text-gray-500 px-4">
                        <span>Sort by</span>
                        <button
                            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                            className="hover:text-gray-900 flex items-center gap-1"
                        >
                            {sortOrder === 'desc' ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                            ) : (
                                <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                            )}
                            <span className="text-xs">{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
                        </button>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                    {bookings.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                            <Link to="/" className="text-primary-600 hover:underline">Book an Appointment</Link>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 italic">
                            No {activeTab.toLowerCase()} bookings found.
                        </div>
                    ) : (
                        paginatedBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1">
                                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{booking.serviceName}</h3>
                                            <p className="text-sm font-medium text-gray-500"># {booking.bookingId || 'R123'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'

                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center py-4 border-t border-gray-50 text-sm">
                                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                                        <span className="text-primary-400 font-medium">Booking Date</span>
                                        <span className="text-gray-700 font-semibold">{formatDate(booking.date)} • {booking.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                                        <span className="text-gray-900 font-bold">Total paid</span>
                                        <span className="text-gray-900 font-bold">₹{booking.price}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Link to={`/bookings/${booking.id}`} className="text-primary-400 hover:text-primary-600 font-medium flex items-center gap-1">
                                            Booking Details
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                        </Link>
                                        {booking.status === 'Confirmed' && (
                                            <button onClick={() => initiateCancel(booking.id)} className="text-red-500 hover:text-red-700 font-medium text-xs">
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Mock */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${currentPage === i + 1
                                    ? 'bg-primary-500 text-white shadow-md shadow-primary-200'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmCancel}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking? This action cannot be undone."
                isDangerous={true}
            />
        </div>
    );
};

export default MyBookings;
