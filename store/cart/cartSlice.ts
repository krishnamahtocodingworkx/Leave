// import { CartSliceType } from "@/utils/types";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState: CartSliceType = {
//     products: [],
//     totalAmount: 0,
//     subTotal: 0,
//     tax: 0
// };
// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart(state, action) {
//             console.log("payload :", action.payload);
//             const existingProduct = state.products.find(
//                 (item) => item.product.id === action.payload.id
//             );
//             if (existingProduct) {
//                 existingProduct.quantity += 1;
//             } else {
//                 state.products.push({
//                     product: action.payload,
//                     quantity: 1,
//                 });
//             }
//             state.subTotal += action.payload.price;
//             state.tax = state.subTotal * 0.18;
//             state.totalAmount = state.subTotal + state.tax;
//         },
//         removeFromCart(state, action) {
//             const existingProductIndex = state.products.findIndex(
//                 (item) => item.product.id === action.payload.id
//             );
//             if (existingProductIndex !== -1) {
//                 const existingProduct =
//                     state.products[existingProductIndex];
//                 if (existingProduct.quantity > 1) {
//                     existingProduct.quantity -= 1;
//                 } else {
//                     state.products.splice(existingProductIndex, 1);
//                 }
//                 state.subTotal -= action.payload.price;
//                 state.tax = state.subTotal * 0.18;
//                 state.totalAmount = state.subTotal + state.tax;
//             }
//         },
//         completelyRemoveProduct(state, action) {
//             const existingProductIndex = state.products.findIndex(
//                 (item) => item.product.id === action.payload.id
//             );
//             if (existingProductIndex !== -1) {
//                 const existingProduct =
//                     state.products[existingProductIndex];
//                 state.subTotal -= existingProduct.product.price * existingProduct.quantity;
//                 state.products.splice(existingProductIndex, 1);
//                 state.tax = state.subTotal * 0.18;
//                 state.totalAmount = state.subTotal + state.tax;
//             }
//         }
//         ,
//         clearCart(state) {
//             state.products = [];
//             state.totalAmount = 0;
//         },
//     }
// })

// export const { addToCart, removeFromCart, clearCart, completelyRemoveProduct } = cartSlice.actions;
// export default cartSlice.reducer;