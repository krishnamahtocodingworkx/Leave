// components/input/PasswordInput.tsx
"use client";

import React from "react";
import { InputFieldProps } from "@/utils/type";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";


const PasswordInput: React.FC<InputFieldProps> = ({
    name,
    value,
    changeHandler,
    onBlur,
    label,
    required,
    error,
    touched,
    placeHolder,
}) => {
    const [show, setShow] = React.useState(false);
    const showError = Boolean(touched && error);

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={changeHandler}
                    onBlur={onBlur}
                    placeholder={placeHolder}
                    className={`border rounded-lg px-3 py-2 pr-10 text-sm w-full outline-none
                    ${showError
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        }
          `}
                />

                <button
                    type="button"
                    onClick={() => setShow((p) => !p)}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                >
                    {show ? <LuEyeClosed /> : <LuEye />}
                </button>
            </div>

            {showError && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default PasswordInput;
