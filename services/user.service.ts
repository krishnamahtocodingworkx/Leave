import { ENDPOINTS } from "@/utils/endPoints";
import ApiService from "./client";
import { LocationResult } from "@/utils/modal";
import { SUCCESS_TOAST } from "@/utils/toasts";


export const userServices = {
    fetchOwnAddress: async function (
        lat: number,
        long: number
    ) {
        try {
            const res = await ApiService.get<LocationResult>(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
            );

            return res.data as unknown;
        } catch (error) {
            console.log("error in address:", error);
            throw error; // better than returning null
        }
    },
    saveOwnLocation: async function (payload: { lat: number, lng: number, address: string }) {
        try {
            const res = await ApiService.post(ENDPOINTS.INITIAL_LOCATION, payload);
            console.log("initial location response :", res);
            SUCCESS_TOAST(res.data.message);
        } catch (error) {
            console.log("initial location error :", error);
        }
    }
}