import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import bookingsReducer from './bookingsSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        services: servicesReducer,
        bookings: bookingsReducer,
        auth: authReducer,
    },
});
