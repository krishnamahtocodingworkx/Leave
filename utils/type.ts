import { ProductCategory, ProductSubCategory } from "./enum";

export type ProductCategoryType = { label: string, value: ProductCategory, imgUrl: string, options: { label: string, value: ProductSubCategory }[] }