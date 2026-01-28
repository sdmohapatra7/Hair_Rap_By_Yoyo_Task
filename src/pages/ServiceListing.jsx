import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';
import ServiceCard from '../components/ServiceCard';

const ServiceListing = () => {
    const dispatch = useDispatch();
    const { items: services, status, error } = useSelector((state) => state.services);

    // Filter States
    const [keyword, setKeyword] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [priceRange, setPriceRange] = useState(2000); // Max Price
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [sortBy, setSortBy] = useState('Recommended');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServices());
        }
    }, [status, dispatch]);

    // Derived Unique Values for Filters
    const subCategories = useMemo(() => {
        return [...new Set(services.map(s => s.subCategory))].filter(Boolean).sort();
    }, [services]);

    const locations = useMemo(() => {
        // Extract city/state if needed, or use full string. Using simplified location for now.
        // Assuming location is "City, State, Country", let's just use the full string or unique cities
        return [...new Set(services.map(s => s.location))].filter(Boolean).sort();
    }, [services]);

    // Handle Category Checkbox
    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Handle SubCategory Checkbox/Select
    const toggleSubCategory = (subCat) => {
        setSelectedSubCategories(prev =>
            prev.includes(subCat)
                ? prev.filter(s => s !== subCat)
                : [...prev, subCat]
        );
    };

    // Handle Location Checkbox/Select
    const toggleLocation = (loc) => {
        setSelectedLocations(prev =>
            prev.includes(loc)
                ? prev.filter(l => l !== loc)
                : [...prev, loc]
        );
    };

    // Handle Rating Checkbox
    const toggleRating = (rating) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating]
        );
    };

    // Filter Logic
    const filteredServices = useMemo(() => {
        return services.filter(service => {
            // Keyword Search
            if (keyword && !service.name.toLowerCase().includes(keyword.toLowerCase()) &&
                !service.subCategory.toLowerCase().includes(keyword.toLowerCase())) {
                return false;
            }

            // Category Filter
            if (selectedCategories.length > 0 && !selectedCategories.includes(service.category)) {
                return false;
            }

            // Sub Category Filter
            if (selectedSubCategories.length > 0 && !selectedSubCategories.includes(service.subCategory)) {
                return false;
            }

            // Location Filter
            if (selectedLocations.length > 0 && !selectedLocations.includes(service.location)) {
                return false;
            }

            // Price Filter
            if (service.price > priceRange) {
                return false;
            }

            // Rating Filter
            if (selectedRatings.length > 0 && !selectedRatings.some(r => Math.floor(service.rating) === r)) {
                return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'Price Low to High') return a.price - b.price;
            if (sortBy === 'Price High to Low') return b.price - a.price;
            if (sortBy === 'Rating') return b.rating - a.rating;
            return 0; // Default/Recommended
        });
    }, [services, keyword, selectedCategories, selectedSubCategories, selectedLocations, priceRange, selectedRatings, sortBy]);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return <div className="text-center text-red-600 py-10">Error loading services: {error}</div>;
    }

    const categories = ['Hair', 'Spa', 'Makeup', 'Nails'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center h-48 rounded-2xl mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {/* Background Image could go here */}
                <div className="relative z-20 text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">Services</h1>
                    <p className="text-gray-300 text-sm">Home &gt; Services</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-1/4 shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                            <button
                                onClick={() => {
                                    setKeyword('');
                                    setSelectedCategories([]);
                                    setSelectedSubCategories([]);
                                    setSelectedLocations([]);
                                    setPriceRange(2000);
                                    setSelectedRatings([]);
                                }}
                                className="text-xs text-gray-500 hover:text-primary-600"
                            >
                                Reset Filter
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search By Keyword</label>
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="What are you looking for?"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 outline-none"
                            />
                        </div>

                        {/* Categories */}
                        <div className="mb-6 space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                            {categories.map((cat) => (
                                <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => toggleCategory(cat)}
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="text-sm text-gray-600">{cat}</span>
                                </label>
                            ))}
                        </div>

                        {/* Sub Category */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 outline-none bg-white"
                                onChange={(e) => {
                                    if (e.target.value) toggleSubCategory(e.target.value);
                                }}
                                value=""
                            >
                                <option value="">Select Sub Category</option>
                                {subCategories.map(sub => (
                                    <option key={sub} value={sub} disabled={selectedSubCategories.includes(sub)}>{sub}</option>
                                ))}
                            </select>
                            {/* Active Tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedSubCategories.map(sub => (
                                    <span key={sub} className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        {sub}
                                        <button onClick={() => toggleSubCategory(sub)} className="hover:text-primary-900">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 outline-none bg-white"
                                onChange={(e) => {
                                    if (e.target.value) toggleLocation(e.target.value);
                                }}
                                value=""
                            >
                                <option value="">Select Location</option>
                                {locations.map(loc => (
                                    <option key={loc} value={loc} disabled={selectedLocations.includes(loc)}>{loc}</option>
                                ))}
                            </select>
                            {/* Active Tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedLocations.map(loc => (
                                    <span key={loc} className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        {loc}
                                        <button onClick={() => toggleLocation(loc)} className="hover:text-primary-900">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>


                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-4">Price Range (Max: ₹{priceRange})</label>
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                step="50"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>₹0</span>
                                <span>₹2000</span>
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="mb-6 space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ratings</label>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRatings.includes(rating)}
                                        onChange={() => toggleRating(rating)}
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.243.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.567-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">({rating} Stars)</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Found <span className="text-primary-600">{filteredServices.length} Services</span></h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-sm border-none bg-transparent font-medium text-gray-800 focus:ring-0 cursor-pointer outline-none"
                            >
                                <option>Recommended</option>
                                <option>Price Low to High</option>
                                <option>Price High to Low</option>
                                <option>Rating</option>
                            </select>
                        </div>
                    </div>

                    {filteredServices.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl">
                            <p className="text-gray-500">No services found matching your filters.</p>
                            <button
                                onClick={() => {
                                    setKeyword('');
                                    setSelectedCategories([]);
                                    setSelectedSubCategories([]);
                                    setSelectedLocations([]);
                                    setPriceRange(2000);
                                    setSelectedRatings([]);
                                }}
                                className="text-primary-600 font-medium mt-2 hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceListing;
