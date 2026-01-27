import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-primary-700 bg-primary-50' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50';
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                                LuxeSalon
                            </span>
                        </Link>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')}`}
                        >
                            Services
                        </Link>
                        <Link
                            to="/bookings"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/bookings')}`}
                        >
                            My Bookings
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
