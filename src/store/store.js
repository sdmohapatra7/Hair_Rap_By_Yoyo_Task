import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import bookingsReducer from './bookingsSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
    reducer: {
        services: servicesReducer,
        bookings: bookingsReducer,
        favorites: favoritesReducer,
    },
});
