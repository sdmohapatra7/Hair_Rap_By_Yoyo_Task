import MockAdapter from 'axios-mock-adapter';

const services = [
    { id: 1, name: "Haircut", price: 50, duration: 30, image: "https://placehold.co/600x400?text=Haircut" },
    { id: 2, name: "Hair Coloring", price: 120, duration: 90, image: "https://placehold.co/600x400?text=Coloring" },
    { id: 3, name: "Manicure", price: 30, duration: 45, image: "https://placehold.co/600x400?text=Manicure" },
    { id: 4, name: "Pedicure", price: 40, duration: 60, image: "https://placehold.co/600x400?text=Pedicure" },
    { id: 5, name: "Facial", price: 80, duration: 60, image: "https://placehold.co/600x400?text=Facial" },
    { id: 6, name: "Beard Trim", price: 25, duration: 20, image: "https://placehold.co/600x400?text=Beard+Trim" }
];

let bookings = [];

export const setupMocks = (axiosInstance) => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 800 });

    // Mock GET /services
    mock.onGet('/services').reply(200, services);

    // Mock POST /bookings
    mock.onPost('/bookings').reply(config => {
        try {
            const data = JSON.parse(config.data);
            const newBooking = {
                id: Date.now(),
                ...data,
                status: 'Confirmed'
            };
            bookings.push(newBooking);
            return [200, { success: true, message: "Booking confirmed", booking: newBooking }];
        } catch (error) {
            return [400, { success: false, message: "Invalid data" }];
        }
    });

    // Mock POST /bookings/:id/cancel
    // Using a more flexible regex that doesn't strictly depend on the /api prefix if baseURL handles it
    mock.onPost(/\/bookings\/\d+\/cancel/).reply(config => {
        const match = config.url.match(/\/bookings\/(\d+)\/cancel/);
        if (match) {
            const id = parseInt(match[1]);
            const booking = bookings.find(b => b.id === id);

            if (booking) {
                booking.status = 'Cancelled';
                return [200, { success: true, message: "Booking cancelled", booking: { ...booking } }];
            }
        }
        return [404, { success: false, message: "Booking not found" }];
    });

    // Mock GET /bookings
    mock.onGet('/bookings').reply(200, bookings);

    return mock;
};
