import { createSlice } from '@reduxjs/toolkit';

const initialTestState = { word: '초기값' };
const testSlice = createSlice({
    name: 'test',
    initialState: initialTestState,
    reducers: {
        hello(state) {
            state.word = true;
        },
        hi(state) {
            state.word = false;
        },
        changeReducer(state, action) {
            state.word = action.payload;
        },
    },
});

export const testActions = testSlice.actions;
export default testSlice.reducer;
