import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
        accessToken: null,
    },
    reducers: {
        loginStart(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;