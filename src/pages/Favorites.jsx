import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServiceCard from '../components/ServiceCard';
import { fetchServices } from '../store/servicesSlice';

const Favorites = () => {
    const dispatch = useDispatch();
    const { items: services, status } = useSelector((state) => state.services);
    const favoriteIds = useSelector((state) => state.favorites.items);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServices());
        }
    }, [status, dispatch]);

    const favoriteServices = services.filter(service => favoriteIds.includes(service.id));

    return (
        <div className="max-w-6xl mx-auto animate-fade-in-up px-4 py-8">
            <header className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Favorites</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Your saved services and styles.</p>
            </header>

            {favoriteServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No favorites yet</h3>
                    <p className="text-gray-500 text-sm">Heart your favorite services to see them here!</p>
                </div>
            )}
        </div>
    );
};

export default Favorites;
