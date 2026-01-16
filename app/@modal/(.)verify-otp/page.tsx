"use client";

import AuthButton from "@/components/common/buttons/AuthButton";
import RouteModal from "@/components/modals/RouteModal";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import OTPInput from "react-otp-input";

export default function SignupModal() {
    const { loading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [otp, setOtp] = React.useState("");

    const handleVerify = () => {
        router.push("/");
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
                    <p className="text-warning">9876546587</p>
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


