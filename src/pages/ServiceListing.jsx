import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';
import ServiceCard from '../components/ServiceCard';

const ServiceListing = () => {
    const dispatch = useDispatch();
    const { items: services, status, error } = useSelector((state) => state.services);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServices());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="text-center text-red-600 py-10 bg-red-50 rounded-lg mx-4">
                <p>Error loading services: {error}</p>
                <button
                    onClick={() => dispatch(fetchServices())}
                    className="mt-4 text-primary-600 hover:text-primary-800 underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Our Premium Services
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Experience world-class hair and beauty treatments tailored just for you.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default ServiceListing;
