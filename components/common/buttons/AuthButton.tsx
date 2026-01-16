import React from "react";

type ButtonProps = {
    text: string;
    disabled?: boolean;
    clickHandler?: () => void;
    loading?: boolean;
};

const AuthButton = ({
    text,
    disabled = false,
    loading = false,
    clickHandler,
}: ButtonProps) => {
    return (
        <button
            type="submit"
            onClick={clickHandler}
            disabled={disabled || loading}
            className={`
                relative w-full
                rounded-xl
                bg-gradient-to-r from-blue-600 to-blue-700
                px-6 py-2.5
                text-sm font-semibold text-white
                shadow-md
                transition-all duration-200
                hover:shadow-lg hover:from-blue-700 hover:to-blue-800
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
                cursor-pointer
            `}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                </span>
            ) : (
                text
            )}
        </button>
    );
};

export default AuthButton;
