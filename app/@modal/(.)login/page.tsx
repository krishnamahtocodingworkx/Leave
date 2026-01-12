"use client";

import CustomModal from "@/components/modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginModal() {
    const router = useRouter();
    const [open, setOpen] = React.useState(true);
    
    return (
        <CustomModal open={open} setOpen={setOpen} size="medium" >
            <h2 className="font-nunito text-xl font-semibold text-gray-800">Please Login to continue</h2>
            <div>
                <label htmlFor="email"></label>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    onError={(e) => { console.log(e) }}
                />
            </div>
            <p>
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/signup");
                    }}
                    className="text-blue-500 underline"
                >
                    Sign up
                </Link>
            </p>
            <button onClick={() => router.back()}>Close</button>
        </CustomModal>
    );
}
