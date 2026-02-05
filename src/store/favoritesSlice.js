import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: loadFavorites(), // Array of service IDs
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const serviceId = action.payload;
            const index = state.items.indexOf(serviceId);

            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(serviceId);
            }

            localStorage.setItem('favorites', JSON.stringify(state.items));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
