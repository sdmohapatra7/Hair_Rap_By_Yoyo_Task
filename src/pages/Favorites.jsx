import React from 'react';
import ServiceCard from '../components/ServiceCard';

const Favorites = () => {
    // Mock data reusing the service structure
    const favoriteServices = [
        {
            id: 1,
            title: "Men's Haircut",
            description: "A precision cut tailored to your style and face shape.",
            price: 25,
            duration: "30 min",
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "Facial Spa",
            description: "Rejuvenating facial treatment for glowing skin.",
            price: 50,
            duration: "60 min",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto animate-fade-in-up">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Favorites</h1>
                <p className="text-gray-500 dark:text-gray-400">Your go-to services.</p>
            </header>

            {favoriteServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <p className="text-gray-400">No favorites yet. Go explore services!</p>
                </div>
            )}
        </div>
    );
};

export default Favorites;
