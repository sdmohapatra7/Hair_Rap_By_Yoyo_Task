import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
    const dispatch = useDispatch();
    const { items: services, status } = useSelector((state) => state.services);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServices());
        }
    }, [status, dispatch]);

    // Get top rated services for display
    const topRatedServices = services
        .filter(s => s.rating >= 4.5)
        .slice(0, 4);

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Discover & Book the</span>{' '}
                                    <span className="block text-primary-600 xl:inline">Best Salons Near You</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                                    Browse services, read reviews, and book appointments 24/7. Your next makeover is just a click away.
                                </p>
                            </div>

                            {/* Search Box */}
                            <div className="mt-8 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-3xl">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="relative md:col-span-2">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="text" className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="What are you looking for?" />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        </div>
                                        <input type="text" className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="Location" />
                                    </div>
                                    <Link to="/services" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 md:py-3 md:text-lg transition-colors">
                                        Search
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Salon Interior" />
                </div>
            </div>

            {/* Featured Salons Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Top Rated Salons Near You</h2>
                        <p className="mt-2 text-gray-500">Book appointment with the best salons</p>
                    </div>
                    <Link to="/services" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topRatedServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>

            {/* Popular Locations */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Salon Locations</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {['Maryland', 'California', 'Texas', 'New Jersey', 'Washington'].map((city) => (
                        <div key={city} className="relative rounded-xl overflow-hidden group cursor-pointer h-32">
                            <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors z-10"></div>
                            <img
                                src={`https://source.unsplash.com/featured/?${city},city`}
                                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1449824913929-2b3ae88ba6da?auto=format&fit=crop&w=400&q=80'}
                                alt={city}
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <h3 className="text-white font-bold text-lg">{city}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-600">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to get your glow on?</span>
                        <span className="block">Start booking today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-primary-100">
                        Join thousands of satisfied customers who book their salon appointments with ease.
                    </p>
                    <Link
                        to="/services"
                        className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 sm:w-auto"
                    >
                        Explore Services
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
