import { createSlice } from '@reduxjs/toolkit';
import { deleteItemList } from '@/apis/api/itemList';

const initialItemState = [];
const itemSlice = createSlice({
    name: 'items',
    initialState: initialItemState,
    reducers: {
        setItem(state, action) {
            return action.payload;
        },
        deleteItem(state, action) {
            deleteItemList(1, action.payload);
        },
    },
});

export const itemActions = itemSlice.actions;

export default itemSlice.reducer;
