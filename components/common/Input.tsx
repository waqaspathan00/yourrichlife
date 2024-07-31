import React from "react";

interface InputProps {
    type?: string;
    label: string;
    value: string;
    placeholder: string;
    handleChange: (e: any) => void;
}
export const Input = ({ type = "text", label, value, placeholder, handleChange }: InputProps) => {
    const labelText = label.charAt(0).toUpperCase() + label.slice(1);

    return (
        <div className="flex flex-col w-full">
            <label className="text-lg font-bold" htmlFor="input-field">
                {labelText}
            </label>
            <input
                type={type}
                className="bg-white border-2 border-grey-200 p-4 rounded-lg shadow-xl"
                placeholder={placeholder}
                id={`${label}-field`}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
