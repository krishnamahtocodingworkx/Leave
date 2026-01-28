import React from "react";
import { InputFieldProps } from "@/utils/type";

export interface TextAreaFieldProps {
    name: string;
    value: string;
    changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    label?: string;
    required?: boolean;
    error?: string;
    touched?: boolean;
    placeHolder?: string;
    disabled?: boolean;
    rows?: number;
}

const TextArea: React.FC<TextAreaFieldProps> = ({
    name,
    value,
    changeHandler,
    onBlur,
    label,
    required,
    error,
    touched,
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

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={changeHandler}
                onBlur={onBlur}
                placeholder={placeHolder}
                disabled={disabled}
                rows={4}
                className={`border rounded-lg px-3 py-2 text-sm outline-none transition resize-none
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

export default TextArea;
