"use client";

import RouteModal from "@/components/modals/RouteModal";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignupModal() {

    return (
        <RouteModal>
            <div className="flex flex-col gap-4">
                <h2 className="font-nunito text-xl font-semibold text-gray-800">
                    Signup Modal
                </h2>
                <p className="text-gray-600">
                    This is a placeholder for the signup form. Implement the form fields and submission logic as needed.
                </p>
            </div>
        </RouteModal>
    );
}


