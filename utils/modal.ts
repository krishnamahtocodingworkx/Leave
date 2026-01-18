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
}