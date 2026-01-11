// import { ENDPOINTS } from "@/utils/endPoints";
// import { Product } from "@/utils/types";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// type RejectValue = {
//     message: string;
// };

// export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: RejectValue }>(
//     "products/fetchProducts",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await fetch(ENDPOINTS.GET_ALL_PRODUCTS);
//             if (res.status !== 200) {
//                 return rejectWithValue({ message: "Something went wrong !" });
//             }
//             const dataToSend = await res.json();
//             return dataToSend;
//         } catch (_error) {
//             console.log("error :", _error);
//             return rejectWithValue({ message: "Network error. Please try again later." });
//         }
//     }
// );