import { createSlice } from '@reduxjs/toolkit';

const initialFlightInfoState = {};
const flightInfoSlice = createSlice({
    name: 'flightInfo',
    initialState: initialFlightInfoState,
    reducers: {
        initialFlightInfo() {
            return {};
        },
        setFlightInfo(state, action) {
            return action.payload;
        },
        // deleteFlightInfo(state, action) {
        //     deleteFlightInfo(1, action.payload);
        // },
    },
});

export const flightInfoActions = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
