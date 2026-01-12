"use client";
import React, { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
// import { STRING } from "@/utils/string";

type CustomModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: ReactNode;
    title?: string;
    onSubmit?: (e: React.FormEvent) => void;
    loading?: boolean;
    submitButtonText?: string;
    submitButtonLoadingText?: string;
    size?: "small" | "medium" | "large";
};

const CustomModal = ({
    open,
    setOpen,
    children,
    title,
    onSubmit,
    loading = false,
    submitButtonText,
    submitButtonLoadingText,
    size = "small"
}: CustomModalProps) => {
    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className={`modal-content ${size === "small" ? "max-w-md" : size === "medium" ? "max-w-lg" : "max-w-xl"}`} onClick={(e) => e.stopPropagation()}>
                <IoClose
                    onClick={() => setOpen(false)}
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

export default CustomModal;
