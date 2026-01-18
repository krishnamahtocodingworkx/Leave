import { AuthSlice } from "@/utils/modal";
import { createSlice } from "@reduxjs/toolkit";
import { verifyOtp, sendOtp } from "./authThunk";

const initialState: AuthSlice = {
    user: null,
    loading: false,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
            }).addCase(sendOtp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            }).addCase(sendOtp.rejected, (state) => {
                state.loading = false;
            })

        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload.user;
                // state.token = action.payload.token;
            }).addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            });
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;