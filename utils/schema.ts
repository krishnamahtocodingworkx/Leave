import * as Yup from "yup";

/**
 * @name Schemas
 * @description for validation of data
 * @returns Schemas for Validation
 */

import {
    emailRegExp,
    passRegExp,
    passwordError,
    phoneRegExp,
    nameRegExp,
} from "./regex";
import { ProductCategory, ProductCondition, ProductSubCategory } from "./enum";

// export const LoginSchema = () =>
//     Yup.object().shape({
//         email: Yup.string()
//             .trim()
//             .required("Enter the required field")
//             .matches(emailRegExp, "Please enter valid Email"),
//         password: Yup.string()
//             .trim()
//             .required("Enter the required field")
//             .max(16, "Password should be maximum of 16 characters")
//             .min(8, "Password should be minimum of 8 characters")
//             .matches(passRegExp, passwordError),
//     });
export const LoginSchema = () =>
    Yup.object().shape({
        phoneNumber: Yup.string()
            .trim()
            .required("Enter the required field")
            .matches(phoneRegExp, "Please enter valid Phone Number"),
    });
export const ForgotPasswordSchema = () =>
    Yup.object().shape({
        email: Yup.string()
            .trim()
            .required("Enter the required field")
            .matches(emailRegExp, "Please enter valid Email"),
    });

export const VerifyEmailSchema = () =>
    Yup.object().shape({
        code: Yup.string()
            .trim()
            .required("Enter the required field")
            .min(4, "Code should be minimum of 4 digits")
            .matches(/^[0-9]+$/, "Please enter valid Code"),
    });

export const ResetPasswordSchema = () =>
    Yup.object().shape({
        password: Yup.string()
            .trim()
            .required("Enter the required field")
            .max(16, "Password should be maximum of 16 characters")
            .min(8, "Password should be minimum of 8 characters")
            .matches(passRegExp, passwordError),
        confirmPassword: Yup.string()
            .trim()
            .required("Enter the required field")
            .oneOf([Yup.ref("password")], "Password and Confirm Password must match"),
    });

export const ChangePasswordSchema = () =>
    Yup.object().shape({
        oldPassword: Yup.string()
            .trim()
            .required("Enter the required field")
            .min(8, "Password should be minimum of 8 characters")
            .max(16, "Password should be maximum of 16 characters")
            .matches(passRegExp, passwordError),
        newPassword: Yup.string()
            .trim()
            .required("Enter the required field")
            .max(16, "Password should be maximum of 16 characters")
            .min(8, "Password should be minimum of 8 characters")
            .matches(passRegExp, passwordError),
        confirmPassword: Yup.string()
            .trim()
            .required("Enter the required field")
            .oneOf(
                [Yup.ref("newPassword")],
                "Password and Confirm Password must match"
            ),
    });
export const categorySchema =
    Yup.object().shape({
        category: Yup.string()
            .required("Please select your item category to continue"),
        subCategory: Yup.string()
            .required("Please select your item sub category to continue")
    });

export const aboutItemSchema = Yup.object().shape({
    itemName: Yup.string().required("Please enter item name").min(10, "Item name should be minimum of 10 characters").max(100, "Item name should be maximum of 100 characters"),
    about: Yup.string().required("Please enter about item").min(20, "About item should be minimum of 20 characters").max(500, "About item should be maximum of 500 characters"),
    reasonToSell: Yup.string().required("Please enter reason to sell").min(10, "Reason to sell should be minimum of 10 characters").max(200, "Reason to sell should be maximum of 200 characters"),
    price: Yup.number().typeError("Price must be a number").required("Please enter price").min(50, "Price must be at least 50").max(1000000, "Price must be at most 1000000"),
    condition: Yup.mixed().oneOf(Object.values(ProductCondition), "Please select a valid product condition").required("Please select product condition"),
})