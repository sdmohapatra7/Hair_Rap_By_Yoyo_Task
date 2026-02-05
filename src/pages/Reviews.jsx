import React from 'react';

const Reviews = () => {
    // Mock user reviews data
    const reviews = [
        {
            id: 1,
            serviceName: "Men's Haircut",
            stylist: "John Doe",
            rating: 5,
            comment: "Great cut, exactly what I wanted!",
            date: "2023-10-15",
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            serviceName: "Beard Trim",
            stylist: "Mike Ross",
            rating: 4,
            comment: "Good service, but a bit of a wait.",
            date: "2023-09-20",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d66503c?auto=format&fit=crop&q=80&w=200"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up px-4 py-8">
            <header className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Feedback you've given to our stylists.</p>
            </header>

            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex gap-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                            <img src={review.image} alt={review.serviceName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{review.serviceName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">by {review.stylist}</p>
                                </div>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.243.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.567-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">"{review.comment}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
