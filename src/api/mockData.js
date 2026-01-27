import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create axios mock instance
const mock = new MockAdapter(axios, { delayResponse: 800 }); // simulate latency

const services = [
    { id: 1, name: "Haircut", price: 50, duration: 30, image: "https://placehold.co/600x400?text=Haircut" },
    { id: 2, name: "Hair Coloring", price: 120, duration: 90, image: "https://placehold.co/600x400?text=Coloring" },
    { id: 3, name: "Manicure", price: 30, duration: 45, image: "https://placehold.co/600x400?text=Manicure" },
    { id: 4, name: "Pedicure", price: 40, duration: 60, image: "https://placehold.co/600x400?text=Pedicure" },
    { id: 5, name: "Facial", price: 80, duration: 60, image: "https://placehold.co/600x400?text=Facial" },
    { id: 6, name: "Beard Trim", price: 25, duration: 20, image: "https://placehold.co/600x400?text=Beard+Trim" }
];

let bookings = [];

// Mock GET /api/services
mock.onGet('/api/services').reply(200, services);

// Mock POST /api/bookings
mock.onPost('/api/bookings').reply(config => {
    const data = JSON.parse(config.data);
    const newBooking = {
        id: Date.now(),
        ...data,
        status: 'Confirmed'
    };
    bookings.push(newBooking);
    return [200, { success: true, message: "Booking confirmed", booking: newBooking }];
});

// Mock POST /api/bookings/:id/cancel
mock.onPost(/\/api\/bookings\/\d+\/cancel/).reply(config => {
    const match = config.url.match(/\/api\/bookings\/(\d+)\/cancel/);
    if (match) {
        const id = parseInt(match[1]);
        const booking = bookings.find(b => b.id === id);

        if (booking) {
            booking.status = 'Cancelled';
            return [200, { success: true, message: "Booking cancelled", booking }];
        }
    }
    return [404, { success: false, message: "Booking not found" }];
});

// Mock GET /api/bookings
mock.onGet('/api/bookings').reply(200, bookings);

export default mock;
