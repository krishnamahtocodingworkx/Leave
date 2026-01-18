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