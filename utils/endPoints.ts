import { ENV } from "./env";

export const ENDPOINTS = {
    LOGIN: `${ENV.API_BASE_URL}/api/v1/user/login`,
    SIGNUP: `${ENV.API_BASE_URL}/api/v1/auth/signup`,
}