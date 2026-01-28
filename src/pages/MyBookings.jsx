import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, cancelBooking } from '../store/bookingsSlice';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const dispatch = useDispatch();
    const { items: bookings, status, error, cancelStatus } = useSelector((state) => state.bookings);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const handleCancel = (id) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            dispatch(cancelBooking(id));
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
    });

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header / Breadcrumbs - Hidden for now as it's in Sidebar context usually, or we add above */}
            {/* <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-400">Home > Customer > Dashboard</p>
            </div> */}

            {/* Tabs & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-gray-50 p-1 rounded-xl">
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
                    <button className="hover:text-gray-900">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
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
                    filteredBookings.map((booking) => (
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
                                        <button onClick={() => handleCancel(booking.id)} className="text-red-500 hover:text-red-700 font-medium text-xs">
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
            <div className="mt-8 flex justify-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-white shadow-md shadow-primary-200 text-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 text-sm">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 text-sm">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default MyBookings;
