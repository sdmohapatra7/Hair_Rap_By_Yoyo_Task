import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchServices } from '../store/servicesSlice';
import { createBooking, resetCreateStatus } from '../store/bookingsSlice';

const BookingForm = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items: services } = useSelector((state) => state.services);
    const { createStatus, createError } = useSelector((state) => state.bookings);

    // Ensure services are loaded
    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServices());
        }
    }, [dispatch, services]);

    // Handle success redirect
    useEffect(() => {
        if (createStatus === 'succeeded') {
            const timer = setTimeout(() => {
                dispatch(resetCreateStatus());
                navigate('/bookings');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [createStatus, navigate, dispatch]);

    const selectedService = services.find(s => s.id === parseInt(serviceId)) || null;
    const initialPrice = selectedService ? selectedService.price : 0;
    const originalPrice = selectedService ? selectedService.originalPrice : 0;

    const location = useLocation();
    const { preSelectedDate, preSelectedTime } = location.state || {};

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: 'Female',
            stylist: '',
            serviceType: selectedService ? selectedService.name : '',
            serviceCategory: selectedService ? selectedService.category : '',
            date: preSelectedDate || '',
            time: preSelectedTime || '',
            message: '',
            agreeToTerms: false
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Required'),
            date: Yup.date().required('Required'),
            time: Yup.string().required('Required'),
            agreeToTerms: Yup.boolean().oneOf([true], 'Must accept terms')
        }),
        onSubmit: (values) => {
            const bookingData = {
                ...values,
                serviceName: selectedService ? selectedService.name : values.serviceType,
                serviceId: selectedService ? selectedService.id : Date.now(),
                price: initialPrice
            };
            dispatch(createBooking(bookingData));
        },
    });

    if (createStatus === 'succeeded') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Success!</h2>
                    <p className="text-gray-600">Your appointment has been scheduled.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
            {/* Hero / Header Section */}
            <div className="mb-8 relative h-40 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                {/* Use service image if available as background, or fallback to salon theme */}
                <img
                    src={selectedService?.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600"}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Salon Background"
                />
                <div className="relative z-20 text-center text-white">
                    <h1 className="text-3xl font-bold mb-1">Confirm Booking</h1>
                    <p className="text-sm text-gray-200">Home &gt; Services &gt; Booking</p>
                </div>
            </div>

            {/* Service & Salon Info Card */}
            <div className="mb-8 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0 shadow-md">
                        {selectedService ? (
                            <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
                        )}
                    </div>
                    <div className="flex-1 text-center md:text-left transition-colors duration-300">
                        <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-500 mb-2">
                            <span>★★★★☆</span>
                            <span className="text-gray-400 text-xs ml-1">4.9 (255 reviews)</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{selectedService?.name || 'Select Service'}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{selectedService?.location || 'Location'}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-50 dark:border-gray-700 pt-4">
                            <span className="flex items-center"><span className="mr-2 text-lg">📧</span> Glamxxxxxx@example.com</span>
                            <span className="flex items-center"><span className="mr-2 text-lg">📞</span> +1 888 8XX XXXX</span>
                            <span className="flex items-center"><span className="mr-2 text-lg">📍</span> Texas, USA</span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <button className="bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-gray-600 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                            View Salon Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book an Appointment</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Ready to take the first step toward your dream property? Fill out the form below.</p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">First Name <span className="text-red-500">*</span></label>
                            <input type="text" {...formik.getFieldProps('firstName')} placeholder="Enter First Name" className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-1 focus:ring-primary-500 outline-none text-sm placeholder-gray-400 dark:text-white" />
                            {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500 text-xs mt-1">{formik.errors.firstName}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Last Name <span className="text-red-500">*</span></label>
                            <input type="text" {...formik.getFieldProps('lastName')} placeholder="Enter Last Name" className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-1 focus:ring-primary-500 outline-none text-sm placeholder-gray-400 dark:text-white" />
                            {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500 text-xs mt-1">{formik.errors.lastName}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Email <span className="text-red-500">*</span></label>
                            <input type="email" {...formik.getFieldProps('email')} placeholder="Enter your Email" className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-1 focus:ring-primary-500 outline-none text-sm placeholder-gray-400 dark:text-white" />
                            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Phone <span className="text-red-500">*</span></label>
                            <input type="text" {...formik.getFieldProps('phone')} placeholder="Enter Phone Number" className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-1 focus:ring-primary-500 outline-none text-sm placeholder-gray-400 dark:text-white" />
                            {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>}
                        </div>
                    </div>

                    {/* Choose Whom */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Choose Whom</label>
                        <div className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-300 flex justify-between items-center cursor-pointer">
                            <span>Select gender</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Choose Stylist <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select {...formik.getFieldProps('stylist')} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none appearance-none focus:ring-1 focus:ring-primary-500 outline-none text-sm text-gray-500 dark:text-gray-300">
                                    <option value="">Select Stylist</option>
                                    <option value="john">John Doe</option>
                                    <option value="jane">Jane Smith</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            {formik.touched.stylist && formik.errors.stylist && <div className="text-red-500 text-xs mt-1">{formik.errors.stylist}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Gender <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select {...formik.getFieldProps('gender')} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none appearance-none focus:ring-1 focus:ring-primary-500 outline-none text-sm text-gray-500 dark:text-gray-300">
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Services Type</label>
                            <div className="relative">
                                <select disabled value={initialPrice ? 'Standard' : ''} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none appearance-none outline-none text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed">
                                    <option>Standard Service</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Service Category</label>
                            <div className="relative">
                                <select disabled value={selectedService?.category || ''} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none appearance-none outline-none text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed">
                                    <option>{selectedService?.category || 'Select Category'}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Select Date <span className="text-red-500">*</span></label>
                            <input type="date" {...formik.getFieldProps('date')} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-1 focus:ring-primary-500 outline-none text-sm text-gray-500 dark:text-gray-300" />
                            {formik.touched.date && formik.errors.date && <div className="text-red-500 text-xs mt-1">{formik.errors.date}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Time <span className="text-red-500">*</span></label>
                            <input type="time" {...formik.getFieldProps('time')} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-1 focus:ring-primary-500 outline-none text-sm text-gray-500 dark:text-gray-300" />
                            {formik.touched.time && formik.errors.time && <div className="text-red-500 text-xs mt-1">{formik.errors.time}</div>}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Message</label>
                        <textarea {...formik.getFieldProps('message')} rows="4" placeholder="Enter your Message here.." className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:ring-1 focus:ring-primary-500 outline-none text-sm placeholder-gray-400 dark:text-white resize-none"></textarea>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{initialPrice}</h3>
                                <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
                                <span className="bg-green-400 text-white text-[10px] px-2 py-0.5 rounded font-bold">50% OFF</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...formik.getFieldProps('agreeToTerms')} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">I agree with <Link to="#" className="text-gray-900 dark:text-white underline">Terms of Use</Link> and <Link to="#" className="text-gray-900 dark:text-white underline">Privacy Policy</Link></span>
                        </label>
                        {formik.touched.agreeToTerms && formik.errors.agreeToTerms && <div className="text-red-500 text-xs">{formik.errors.agreeToTerms}</div>}

                        <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
