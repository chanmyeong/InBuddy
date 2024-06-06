import { createSlice } from '@reduxjs/toolkit';

const initialJourneyState = [];

const journeySlice = createSlice({
    name: 'journey',
    initialState: initialJourneyState,
    reducers: {
        initialJourney() {
            return [];
        },
        setJourney(state, action) {
            return [...state, action.payload]; // 새로운 배열을 반환하여 불변성 유지
        },
    },
});

export const journeyActions = journeySlice.actions;

export default journeySlice.reducer;
