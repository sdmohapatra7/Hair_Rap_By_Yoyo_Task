import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

    // Ensure services are loaded to find the selected one
    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServices());
        }
    }, [dispatch, services]);

    // Handle successful booking redirection
    useEffect(() => {
        if (createStatus === 'succeeded') {
            const timer = setTimeout(() => {
                dispatch(resetCreateStatus());
                navigate('/bookings');
            }, 1500); // Wait a bit to show success message
            return () => clearTimeout(timer);
        }
    }, [createStatus, navigate, dispatch]);

    const formik = useFormik({
        initialValues: {
            serviceId: serviceId || '',
            date: '',
            time: '',
            notes: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            serviceId: Yup.string().required('Service selection is required'),
            date: Yup.date()
                .required('Date is required')
                .min(new Date(), 'Date cannot be in the past'),
            time: Yup.string().required('Time is required'),
            notes: Yup.string().max(200, 'Notes must be 200 characters or less')
        }),
        onSubmit: (values) => {
            const bookingData = {
                ...values,
                serviceName: services.find(s => s.id === parseInt(values.serviceId))?.name || 'Unknown Service',
                serviceId: parseInt(values.serviceId)
            };
            dispatch(createBooking(bookingData));
        },
    });

    const selectedService = services.find(s => s.id === parseInt(formik.values.serviceId));

    if (createStatus === 'succeeded') {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-green-50 rounded-2xl text-center shadow-lg border border-green-100">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600">Redirecting to your bookings...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-primary-600 px-8 py-6 text-white">
                    <h1 className="text-2xl font-bold">Book Appointment</h1>
                    <p className="opacity-90 mt-1">
                        {selectedService ? `For ${selectedService.name} ($${selectedService.price})` : 'Select your service'}
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
                    {createError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                            <p className="text-red-700">{createError}</p>
                        </div>
                    )}

                    {/* Service Selection */}
                    <div>
                        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                        <select
                            id="serviceId"
                            {...formik.getFieldProps('serviceId')}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${formik.touched.serviceId && formik.errors.serviceId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Select a service</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - ${service.price} ({service.duration} min)
                                </option>
                            ))}
                        </select>
                        {formik.touched.serviceId && formik.errors.serviceId ? (
                            <div className="text-red-500 text-xs mt-1 absolute">{formik.errors.serviceId}</div>
                        ) : null}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date Field */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                id="date"
                                type="date"
                                {...formik.getFieldProps('date')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${formik.touched.date && formik.errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {formik.touched.date && formik.errors.date ? (
                                <div className="text-red-500 text-xs mt-1 absolute">{formik.errors.date}</div>
                            ) : null}
                        </div>

                        {/* Time Field */}
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <select
                                id="time"
                                {...formik.getFieldProps('time')}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${formik.touched.time && formik.errors.time ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select a time</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="13:00">01:00 PM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                            </select>
                            {formik.touched.time && formik.errors.time ? (
                                <div className="text-red-500 text-xs mt-1 absolute">{formik.errors.time}</div>
                            ) : null}
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                        <textarea
                            id="notes"
                            rows="3"
                            {...formik.getFieldProps('notes')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                            placeholder="Any special requests or details..."
                        />
                        {formik.touched.notes && formik.errors.notes ? (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.notes}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        disabled={createStatus === 'loading'}
                        className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-md transition-all duration-300 ${createStatus === 'loading'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                    >
                        {createStatus === 'loading' ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
