import React from 'react';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            service: "Men's Haircut",
            stylist: "Alex",
            date: "Oct 15, 2023",
            rating: 5,
            comment: "Best haircut I've had in years! Alex really understood what I wanted."
        },
        {
            id: 2,
            service: "Beard Trim",
            stylist: "Sarah",
            date: "Sep 28, 2023",
            rating: 4,
            comment: "Great service, but a bit of a wait. Result was fantastic though."
        }
    ];

    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Reviews</h1>
                <p className="text-gray-500 dark:text-gray-400">Feedback you've shared with us.</p>
            </header>

            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{review.service}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Styled by {review.stylist} • {review.date}</p>
                            </div>
                            <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">"{review.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
