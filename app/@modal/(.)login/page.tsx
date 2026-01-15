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

export default function LoginModal() {
    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        validateOnBlur: true,
        validateOnChange: false, // professional UX
        onSubmit: async (values, actions) => {
            try {
                console.log("Login Payload:", values);
                // await loginApi(values)
                actions.resetForm();
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
                    name="email"
                    type="email"
                    label="Email"
                    required
                    value={loginForm.values.email}
                    changeHandler={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    error={loginForm.errors.email}
                    touched={loginForm.touched.email}
                    placeHolder="Enter your email"
                />

                <PasswordInput
                    name="password"
                    label="Password"
                    required
                    value={loginForm.values.password}
                    changeHandler={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    error={loginForm.errors.password}
                    touched={loginForm.touched.password}
                    placeHolder="Enter your password"
                />

                <button
                    type="submit"
                    disabled={loginForm.isSubmitting}
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loginForm.isSubmitting ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-gray-600 text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-500 underline"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
            <GoogleButton />
        </RouteModal>
    );
}
