"use client";

import Input from "@/components/input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { LoginSchema } from "@/utils/schema";
import RouteModal from "@/components/modals/RouteModal";
import AuthButton from "@/components/common/buttons/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { sendOtp } from "@/store/auth/authThunk";

export default function SendOtpModal() {
    const router = useRouter();
    const { loading } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const loginForm = useFormik({
        initialValues: {
            phoneNumber: "",
        },
        validationSchema: LoginSchema,
        validateOnBlur: true,
        onSubmit: async (values, actions) => {
            try {
                await dispatch(sendOtp({ phoneNumber: values.phoneNumber.toString() })).unwrap();
                actions.resetForm();
                router.replace("/verify-otp");
            } catch (_) {
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
                    name="phoneNumber"
                    type="number"
                    label="Phone Number"
                    required
                    value={loginForm.values.phoneNumber}
                    changeHandler={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    error={loginForm.errors.phoneNumber}
                    touched={loginForm.touched.phoneNumber}
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
