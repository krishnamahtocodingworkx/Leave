"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

type RouteModalProps = {
    children?: ReactNode;
    title?: string;
    onSubmit?: (e: React.FormEvent) => void;
    loading?: boolean;
    submitButtonText?: string;
    submitButtonLoadingText?: string;
    size?: "small" | "medium" | "large";
};

const RouteModal = ({
    children,
    title,
    onSubmit,
    loading = false,
    submitButtonText,
    submitButtonLoadingText,
    size = "small",
}: RouteModalProps) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };
    const router = useRouter();
    const overlayRef = useRef<HTMLDivElement>(null);

    // outside click
    const handleClick = (e: MouseEvent) => {
        if (overlayRef.current === e.target) {
            router.back();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    // ESC close
    useEffect(() => {
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.back();
        };
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, []);

    return (
        <div ref={overlayRef} className="modal-overlay">
            <div className={`modal-content ${size === "small" ? "max-w-md" : size === "medium" ? "max-w-lg" : "max-w-xl"}`} onClick={(e) => e.stopPropagation()}>
                <IoClose
                    onClick={() => router.back()}
                    className="modal-close-button"
                />

                {onSubmit ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {title && <h1 className="heading">{title}</h1>}
                        {children}
                        {submitButtonText && (
                            <div>
                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? submitButtonLoadingText || "loading..."
                                        : submitButtonText}
                                </button>
                            </div>
                        )}
                    </form>
                ) : (
                    <>
                        {title && <h1 className="heading">{title}</h1>}
                        {children}
                    </>
                )}
            </div>
        </div>
    );
};

export default RouteModal;
