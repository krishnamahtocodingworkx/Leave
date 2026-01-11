// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ProductCategory, ProductSortOption } from "@/utils/enum";
// import { ProductSliceType } from "@/utils/types";
// import { fetchProducts } from "./products/productsThunk";

// const initialState: ProductSliceType = {
//     allProducts: [],
//     products: [],
//     sortBy: ProductSortOption.PRICE_LOW_TO_HIGH,
//     category: ProductCategory.ALL,
//     search: "",
//     loading: false,
//     error: null,
// };

// /**
//  * 
//  * @param state - current state of the product slice
//  * @returns void - modifies the state.products based on current filters and sort option
//  */
// const applyFiltersAndSort = (state: ProductSliceType) => {
//     let filtered = [...state.allProducts];

//     if (state.category !== ProductCategory.ALL) {
//         filtered = filtered.filter(
//             (p) => p.category === state.category
//         );
//     }

//     if (state.search.trim()) {
//         filtered = filtered.filter((p) =>
//             p.title
//                 .toLowerCase()
//                 .includes(state.search.toLowerCase())
//         );
//     }

//     switch (state.sortBy) {
//         case ProductSortOption.PRICE_LOW_TO_HIGH:
//             filtered.sort((a, b) => a.price - b.price);
//             break;

//         case ProductSortOption.PRICE_HIGH_TO_LOW:
//             filtered.sort((a, b) => b.price - a.price);
//             break;

//         case ProductSortOption.HIGHEST_RATED:
//             filtered.sort(
//                 (a, b) => b.rating.rate - a.rating.rate
//             );
//             break;

//         case ProductSortOption.NAME_A_TO_Z:
//             filtered.sort((a, b) =>
//                 a.title.localeCompare(b.title)
//             );
//             break;

//         case ProductSortOption.NAME_Z_TO_A:
//             filtered.sort((a, b) =>
//                 b.title.localeCompare(a.title)
//             );
//             break;
//     }

//     state.products = filtered;
// };

// const productsSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//         sortByHandler(
//             state,
//             action: PayloadAction<ProductSortOption>
//         ) {
//             state.sortBy = action.payload;
//             applyFiltersAndSort(state);
//         },

//         categoryHandler(
//             state,
//             action: PayloadAction<ProductCategory>
//         ) {
//             state.category = action.payload;
//             applyFiltersAndSort(state);
//         },

//         searchHandler(
//             state,
//             action: PayloadAction<string>
//         ) {
//             state.search = action.payload;
//             applyFiltersAndSort(state);
//         },
//     },
//     extraReducers(builder) {
//         builder.addCase(fetchProducts.pending, (state) => {
//             state.loading = true;
//         })
//         builder.addCase(fetchProducts.fulfilled, (state, action) => {
//             state.loading = false;
//             state.allProducts = action.payload;
//             applyFiltersAndSort(state);
//         });
//         builder.addCase(fetchProducts.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload?.message || "Something went wrong";
//         });
//     }
// });

// export const {
//     sortByHandler,
//     categoryHandler,
//     searchHandler,
// } = productsSlice.actions;

// export default productsSlice.reducer;
