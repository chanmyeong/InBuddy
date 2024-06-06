import { createSlice } from '@reduxjs/toolkit';

const initialJourneyAllState = [];
const JourneyAllSlice = createSlice({
    name: 'journeyAll',
    initialState: initialJourneyAllState,
    reducers: {
        setJourney(state, action) {
            return action.payload;
        },
    },
});

export const JourneyAllActions = JourneyAllSlice.actions;

export default JourneyAllSlice.reducer;
