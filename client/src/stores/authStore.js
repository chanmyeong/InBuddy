import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { user: null, accessToken: '', refreshToken: '' };
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },

        logout(state) {
            console.log('logout');
            state.accessToken = '';
            state.refreshToken = '';
            state.user = null;
        },

        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },

        setRefreshToken(state, action) {
            state.refreshToken = action.payload;
        },

        getUserProfile(state, action) {
            state.user = action.payload;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
