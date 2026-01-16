"use client";

import Input from "@/components/input";
import PasswordInput from "@/components/input/PasswordInput";
import CustomModal from "@/components/modals";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormik } from "formik";
import { LoginSchema } from "@/utils/schema";
import RouteModal from "@/components/modals/RouteModal";
import GoogleButton from "@/components/common/buttons/GoogleButton";
import AuthButton from "@/components/common/buttons/AuthButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function LoginModal() {
    const router = useRouter();
    const { loading } = useSelector((state: RootState) => state.auth);

    const loginForm = useFormik({
        initialValues: {
            phoneNo: "",
        },
        validationSchema: LoginSchema,
        validateOnBlur: true,
        onSubmit: async (values, actions) => {
            try {
                console.log("Login Payload:", values);
                // await loginApi(values)
                actions.resetForm();
                router.push("/verify-otp");
                // setOpen(false);
            } catch (error) {
                console.error(error);
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    return (
        <RouteModal>
            <form
                onSubmit={loginForm.handleSubmit}
                className="flex flex-col gap-4"
            >
                <h2 className="font-nunito text-xl font-semibold text-gray-800">
                    Please Login to continue
                </h2>

                <Input
                    name="phoneNo"
                    type="number"
                    label="Phone Number"
                    required
                    value={loginForm.values.phoneNo}
                    changeHandler={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    error={loginForm.errors.phoneNo}
                    touched={loginForm.touched.phoneNo}
                    placeHolder="9999999999"
                />

                {/* <PasswordInput
                    name="password"
                    label="Password"
                    required
                    value={loginForm.values.password}
                    changeHandler={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    error={loginForm.errors.password}
                    touched={loginForm.touched.password}
                    placeHolder="Enter your password"
                /> */}

                <AuthButton text="Login" loading={loading} />
            </form>
            {/* <GoogleButton /> */}
        </RouteModal>
    );
}
