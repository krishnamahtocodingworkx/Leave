// app/@modal/(.)login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function LoginModal() {
    const router = useRouter();

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>Login</h2>
                <button onClick={() => router.back()}>Close</button>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
};

const modalStyle = {
    padding: 20,
    margin: "100px auto",
    width: 300,
};
