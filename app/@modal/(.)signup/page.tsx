"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function SignupModal() {
    const router = useRouter();

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>Signup</h2>
                <button onClick={() => router.back()}>Close</button>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 1000,
};

const modalStyle = {
    padding: 20,
    margin: "100px auto",
    width: 300,
    background: "#fff",
};
