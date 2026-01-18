import { ENV } from "./env";

export const ENDPOINTS = {
    SEND_OTP: `${ENV.API_BASE_URL}/api/v1/auth/send-otp`,
    // VERIFY_OTP: `${ENV.API_BASE_URL}/api/v1/auth/verify-otp`,
    VERIFY_OTP: `https://stillo.onrender.com/api/v1/auth/verify-otp`,
}