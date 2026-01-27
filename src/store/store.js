import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import bookingsReducer from './bookingsSlice';

export const store = configureStore({
    reducer: {
        services: servicesReducer,
        bookings: bookingsReducer,
    },
});
