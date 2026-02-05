import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: services, status } = useSelector((state) => state.services);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServices());
        }
    }, [status, dispatch]);

    const service = services.find(s => s.id === parseInt(id));

    if (!service) {
        return <div className="p-8 text-center text-gray-500">Loading service details...</div>;
    }

    // Mock Time Slots
    const timeSlots = [
        "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"
    ];

    const handleBookNow = () => {
        if (!selectedDate || !selectedTime) {
            alert("Please select a date and time");
            return;
        }
        navigate(`/book/${service.id}`, {
            state: {
                preSelectedDate: selectedDate,
                preSelectedTime: selectedTime
            }
        });
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/services" className="hover:text-primary-600">Services</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{service.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Image & Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                            ⭐ {service.rating} ({service.reviews || 120} reviews)
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                        <p className="text-gray-500 mb-6 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            {service.location}
                        </p>

                        <div className="prose prose-sm text-gray-600 max-w-none">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                            <p className="mb-4">
                                Experience the best {service.subCategory.toLowerCase()} services with our expert stylists.
                                This session includes a comprehensive consultation followed by a relaxing treatment tailored to your needs.
                                We use only premium products to ensure you leave feeling refreshed and looking your best.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>45-60 minute session</li>
                                <li>Premium organic products</li>
                                <li>Expert consultation included</li>
                                <li>Complimentary beverage</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Widget */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg sticky top-24">
                        <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-primary-600">₹{service.price}</span>
                                    {service.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">₹{service.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Available Today</span>
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Select Date</label>
                            <input
                                type="date"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-700"
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        {/* Time Selection */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Select Time</label>
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-2 px-1 text-xs font-medium rounded-lg border transition-all ${selectedTime === time
                                                ? 'bg-primary-600 text-white border-primary-600'
                                                : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleBookNow}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-md shadow-primary-200"
                        >
                            Book Appointment
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            No payment required today. Pay at the salon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
