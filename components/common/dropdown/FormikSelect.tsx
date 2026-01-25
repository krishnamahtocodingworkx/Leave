"use client";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

type Option = {
    label: string;
    value: string | number;
};

type SelectFieldProps = {
    name: string;
    label: string;
    value: string | number;
    options: Option[];
    onChange: (value: string | number) => void;
    onBlur?: () => void;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
};

const SelectField = ({
    name,
    label,
    value,
    options,
    onChange,
    onBlur,
    error = false,
    helperText = "",
    disabled = false,
}: SelectFieldProps) => {
    return (
        <FormControl fullWidth error={error}>
            <InputLabel>{label}</InputLabel>

            <Select
                name={name}
                label={label}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                sx={{ borderRadius: 2 }}
            >
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>

            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default SelectField;
