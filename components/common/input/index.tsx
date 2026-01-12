"use client";
import { InputFieldProps } from "@/utils/type";
import { Box, FormHelperText, FormLabel, TextField } from "@mui/material";
import React from "react";

const Input: React.FC<InputFieldProps> = (props) => {
    const {
        changeHandler,
        label,
        name,
        value,
        placeHolder,
        error,
        errormessage,
        touched,
        type,
    } = props;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: 1,
            }}
        >
            <FormLabel
                htmlFor={name}
                sx={{
                    fontWeight: 600,
                    lineHeight: "25px",
                    fontSize: "16px",
                }}
            >
                {label}
                {props.required && <span className="text-error">*</span>}
            </FormLabel>
            <TextField
                sx={{}
                }
                fullWidth
                size="small"
                value={value}
                placeholder={placeHolder}
                name={name}
                onChange={changeHandler}
                onBlur={props.onBlur}
                type={type}
                error={Boolean(error) && Boolean(touched)}
                autoComplete="on"
            />

            {Boolean(error) && Boolean(touched) && (
                <FormHelperText sx={{ color: "error.main" }} className="email-error">
                    {errormessage || error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default React.memo(Input);