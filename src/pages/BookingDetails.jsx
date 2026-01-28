import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings, cancelBooking } from '../store/bookingsSlice';

const BookingDetails = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: bookings, status } = useSelector((state) => state.bookings);
    const [booking, setBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (bookings.length === 0) {
            dispatch(fetchBookings());
        }
    }, [dispatch, bookings]);

    useEffect(() => {
        if (bookings.length > 0) {
            // loose comparison for string/number id mismatch
            const found = bookings.find(b => b.id == bookingId);
            setBooking(found);
        }
    }, [bookings, bookingId]);

    const initiateCancel = () => {
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        dispatch(cancelBooking(booking.id)).then(() => {
            navigate('/bookings');
        });
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!booking && status === 'succeeded') {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl text-gray-800">Booking not found</h2>
                <Link to="/bookings" className="text-primary-600 hover:underline mt-4 block">Back to Dashboard</Link>
            </div>
        );
    }

    if (!booking) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/bookings" className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Back to My Bookings
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-primary-50 px-8 py-6 border-b border-primary-100 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
                        <p className="text-sm text-primary-700 font-medium">Order #{booking.bookingId || 'ID'}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-sm font-bold ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : // Note: API might allow 'Canceled' vs 'Cancelled' check both or standard
                            'bg-blue-100 text-blue-700'
                        }`}>
                        {booking.status}
                    </span>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Service Info</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">Service Name</p>
                                    <p className="text-lg font-bold text-gray-900">{booking.serviceName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Stylist</p>
                                    <p className="font-medium text-gray-700 capitalize">{booking.stylist || 'Not Assigned'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Category</p>
                                    <p className="font-medium text-gray-700">{booking.serviceCategory || 'Standard'}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Appointment</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">Date & Time</p>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <p className="font-medium text-gray-900">
                                            {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <p className="font-medium text-gray-900">{booking.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Customer Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Name</p>
                                <p className="font-medium text-gray-900">{booking.firstName} {booking.lastName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Contact</p>
                                <p className="font-medium text-gray-900">{booking.email}</p>
                                <p className="font-medium text-gray-900">{booking.phone}</p>
                            </div>
                        </div>
                        {booking.message && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-500">Note</p>
                                <p className="font-medium text-gray-700 italic">"{booking.message}"</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-500">Total Amount</p>
                            <p className="text-3xl font-bold text-primary-600">₹{booking.price}</p>
                        </div>

                        {booking.status === 'Confirmed' && (
                            <button
                                onClick={initiateCancel}
                                className="px-6 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                </div>
            </div>


            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmCancel}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking? This action cannot be undone."
                isDangerous={true}
            />
        </div >
    );
};

export default BookingDetails;
