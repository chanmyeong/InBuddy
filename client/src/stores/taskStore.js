import { createSlice } from '@reduxjs/toolkit';

const initialTaskState = [];
const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        setTask(state, action) {
            return action.payload;
        },
    },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;
