import { ProductCategory, ProductSubCategory } from "./enum";

export type ProductCategoryType = { label: string, value: ProductCategory, imgUrl: string, options: { label: string, value: ProductSubCategory }[] }


export interface InputFieldProps {
    required?: boolean;
    value: string;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    label?: string;
    name: string;
    placeHolder?: string;
    error?: string;
    touched?: boolean;
    errormessage?: string;
    type?: React.HTMLInputTypeAttribute;
    disabled?: boolean;
}
export type NavItems = { name: string; href: string };
