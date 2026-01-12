const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const ENDPOINTS = {
    GET_ALL_PRODUCTS: BASE_URL + "/products",
    GET_PRODUCT_DETAILS: (id: string) => `${BASE_URL}/products/${id}`
}