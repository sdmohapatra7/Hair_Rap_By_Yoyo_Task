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
            return new Date(dateString).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const filteredBookings = bookings.filter(booking => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Upcoming') return booking.status === 'Confirmed'; // Assuming confirmed are upcoming
        if (activeTab === 'Cancelled') return booking.status === 'Cancelled';
        return true;
    });

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
                {['All', 'Upcoming', 'Cancelled'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                            ? 'bg-white text-primary-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-500 mb-6">You haven't booked any appointments yet.</p>
                    <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                        Book Appointment
                    </Link>
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 italic">
                    No {activeTab.toLowerCase()} bookings found.
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow">
                            <div className="mb-4 sm:mb-0">
                                <h3 className="text-lg font-bold text-gray-900">{booking.serviceName}</h3>
                                <div className="flex items-center text-gray-600 mt-1">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    {formatDate(booking.date)} at {booking.time}
                                </div>
                                {booking.notes && (
                                    <p className="text-sm text-gray-500 mt-2 italic">Note: "{booking.notes}"</p>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'Confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {booking.status}
                                </span>
                                {booking.status === 'Confirmed' && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        disabled={cancelStatus === 'loading'}
                                        className="text-sm text-red-600 hover:text-red-800 font-medium hover:underline transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
