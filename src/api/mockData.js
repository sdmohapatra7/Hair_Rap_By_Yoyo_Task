import MockAdapter from 'axios-mock-adapter';

const services = [
    {
        id: 1,
        name: "Glow & Glam Studio",
        category: "Hair",
        subCategory: "Hair Color",
        price: 499,
        originalPrice: 899,
        rating: 4.9,
        reviews: 255,
        location: "Maryland City, MD, USA",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 120,
        isFavorite: false
    },
    {
        id: 2,
        name: "The Velvet Touch",
        category: "Spa",
        subCategory: "Hair Spa",
        price: 569,
        originalPrice: 600,
        rating: 4.7,
        reviews: 120,
        location: "New Jersey, USA",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 45,
        isFavorite: true
    },
    {
        id: 3,
        name: "Aura Luxe Salon",
        category: "Hair",
        subCategory: "Hair Cut",
        price: 399,
        originalPrice: 699,
        rating: 4.5,
        reviews: 90,
        location: "California, USA",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 30,
        isFavorite: false
    },
    {
        id: 4,
        name: "Opal Beauty Lounge",
        category: "Makeup",
        subCategory: "Bridal Makeup",
        price: 749,
        originalPrice: 999,
        rating: 4.8,
        reviews: 310,
        location: "Maryland, USA",
        image: "https://images.unsplash.com/photo-1487412947132-26c5c1b15116?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 90,
        isFavorite: false
    },
    {
        id: 5,
        name: "The Glam Society",
        category: "Nails",
        subCategory: "Gel Nails",
        price: 459,
        originalPrice: 600,
        rating: 4.2,
        reviews: 50,
        location: "Texas, USA",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 60,
        isFavorite: false
    },
    {
        id: 6,
        name: "Crown & Curl",
        category: "Hair",
        subCategory: "Hair Cut",
        price: 699,
        originalPrice: 1099,
        rating: 4.9,
        reviews: 420,
        location: "Texas, USA",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 45,
        isFavorite: true
    },
    {
        id: 7,
        name: "Urban Blend",
        category: "Hair",
        subCategory: "Beard Trim",
        price: 299,
        originalPrice: 400,
        rating: 4.1,
        reviews: 85,
        location: "Alabama, USA",
        image: "https://images.unsplash.com/photo-1503951914296-3a57f4750f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 20,
        isFavorite: false
    },
    {
        id: 8,
        name: "Noir Luxury Salon",
        category: "Hair",
        subCategory: "Keratin Treatment",
        price: 1299,
        originalPrice: 1800,
        rating: 4.6,
        reviews: 150,
        location: "Washington, DC, USA",
        image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 150,
        isFavorite: true
    },
    {
        id: 9,
        name: "Blush & Gold Studio",
        category: "Makeup",
        subCategory: "Party Makeup",
        price: 399,
        originalPrice: 600,
        rating: 4.0,
        reviews: 30,
        location: "Montana, USA",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 60,
        isFavorite: false
    },
    {
        id: 10,
        name: "Élan Beauty Bar",
        category: "Nails",
        subCategory: "Manicure",
        price: 199,
        originalPrice: 350,
        rating: 4.4,
        reviews: 65,
        location: "New Jersey, USA",
        image: "https://images.unsplash.com/photo-1632345031635-fe515327e869?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: 40,
        isFavorite: false
    }
];

let bookings = [
    {
        id: 101,
        serviceName: "Glow & Glam Studio",
        serviceId: 1,
        date: "2024-09-30",
        time: "07:30 PM",
        price: 499,
        status: "Completed",
        bookingId: "R123",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        phone: "+1 234 567 8900",
        stylist: "John Doe",
        serviceCategory: "Hair"
    },
    {
        id: 102,
        serviceName: "Aura Luxe Salon",
        serviceId: 3,
        date: "2024-10-02",
        time: "10:00 AM",
        price: 399,
        status: "Confirmed",
        bookingId: "R124",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        phone: "+1 987 654 3210",
        stylist: "Jane Smith",
        serviceCategory: "Hair"
    },
    {
        id: 103,
        serviceName: "The Velvet Touch",
        serviceId: 2,
        date: "2024-08-15",
        time: "04:00 PM",
        price: 569,
        status: "Cancelled",
        bookingId: "R105",
        firstName: "Bob",
        lastName: "Wilson",
        email: "bob.wilson@example.com",
        phone: "+1 555 666 7777",
        stylist: "Not Assigned",
        serviceCategory: "Spa"
    }
];

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
    // Using a more flexible regex to catch the ID
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
