import { LoginType, Role } from "./enum"

export type User = {
    phoneNumber: string,
    loginType: LoginType,
    role: Role,
    isVerified: boolean,
    _id: string,
    createdAt: string,
    updatedAt: string,
}
export type AuthSlice = {
    user: Partial<User> | null,
    loading: boolean,
    token: string | null,
    ownLocation: LocationResult | null
}



export type LocationResult = {
    place_id: number;
    licence: string;
    osm_type: "node" | "way" | "relation";
    osm_id: number;
    lat: string; // API returns string, not number
    lon: string; // API returns string, not number
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: Address;
    boundingbox: [string, string, string, string];
};

export type Address = {
    suburb?: string;
    city?: string;
    town?: string;
    state_district?: string;
    state?: string;
    "ISO3166-2-lvl4"?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
};
