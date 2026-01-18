import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService, { ErrorResponse, extractErrorMessage } from "@/services/client";
import { ENDPOINTS } from "@/utils/endPoints";
import { AuthSlice } from "@/utils/modal";
import { SHOW_ERROR_TOAST, SUCCESS_TOAST } from "@/utils/toasts";

export const sendOtp = createAsyncThunk(
    "auth/sendOtp",
    async (
        payload: { phoneNumber: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await ApiService.post(ENDPOINTS.SEND_OTP, payload);
            console.log("send otp response :", response);
            SUCCESS_TOAST(response.data.message)
            return payload;
            // return response.data.data as AuthSlice;
        } catch (error) {
            console.log("login error :", error)
            return rejectWithValue(error);
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (
        payload: { phoneNumber: string, otp: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await ApiService.post(ENDPOINTS.VERIFY_OTP, payload);
            console.log("verify otp response :", response);
            SUCCESS_TOAST(response.data.message);
            return response.data.data as AuthSlice;
        } catch (error) {
            console.log("verify otp error :", error)
            const message = extractErrorMessage(
                error,
                "OTP verification failed"
            );
            SHOW_ERROR_TOAST(message)
            return rejectWithValue(error);
        }
    }
);