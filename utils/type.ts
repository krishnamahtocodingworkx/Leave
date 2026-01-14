import { IconType } from "react-icons/lib";
import { ProductCategory, ProductSubCategory } from "./enum";

export type ProductCategoryType = { label: string, value: ProductCategory, imgUrl: string, options: { label: string, value: ProductSubCategory }[] }


// utils/type.ts
export interface InputFieldProps {
    name: string;
    value: string;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    label?: string;
    placeHolder?: string;
    required?: boolean;
    error?: string;
    touched?: boolean;
    type?: React.HTMLInputTypeAttribute;
    disabled?: boolean;
}

export type NavItems = { name: string; href: string, icon?: IconType };
