"use client";

import AuthButton from "@/components/common/buttons/AuthButton";
import RouteModal from "@/components/modals/RouteModal";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { verifyOtp } from "@/store/auth/authThunk";

export default function VerifyOtpModal() {
    const { loading, user } = useSelector((state: RootState) => state.auth);
    const phoneNumber = user?.phoneNumber || "";
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const [otp, setOtp] = React.useState("");

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(
            verifyOtp({ phoneNumber, otp })
        ).unwrap().then(() => {
            router.back();
        });
    }
    return (
        <RouteModal>
            <form
                onSubmit={handleVerify}
                className="flex flex-col gap-4"
            >
                <h2 className="font-nunito text-xl font-semibold text-gray-800">
                    Verify your account
                </h2>
                <div>
                    <p>We have sent a code sent to</p>
                    <p className="text-warning">{phoneNumber}</p>
                </div>

                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span className="otp-separator"></span>}
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus={true}
                    inputType={"tel"}
                    containerStyle={"otp-container justify-center my-4"}
                    inputStyle={"otp-input-container"}
                />

                <AuthButton text="Verify" loading={loading} />
            </form>
        </RouteModal>
    );
}


