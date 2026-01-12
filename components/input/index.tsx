// components/input/index.tsx
import React from "react";
import { InputFieldProps } from "@/utils/type";

const Input: React.FC<InputFieldProps> = ({
    name,
    value,
    changeHandler,
    onBlur,
    label,
    required,
    error,
    touched,
    type = "text",
    placeHolder,
    disabled,
}) => {
    const showError = Boolean(touched && error);

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={changeHandler}
                onBlur={onBlur}
                placeholder={placeHolder}
                disabled={disabled}
                className={`border rounded-md px-3 py-2 text-sm outline-none transition
          ${showError
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    }
        `}
            />

            {showError && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
