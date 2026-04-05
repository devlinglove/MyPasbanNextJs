'use client'
import { InputLabel, InputLabelProps } from "@mui/material";
import * as React from 'react';



export type InputLabelExtendedProps = React.InputHTMLAttributes<HTMLLabelElement> & InputLabelProps & {
    label: string | undefined
}

const MuiLabel = React.forwardRef<HTMLLabelElement, InputLabelExtendedProps>
    (({ label, ...props }, ref) => {
        return (
            <InputLabel
                ref={ref}
                {...props}
            >
                {label}
            </InputLabel>
        )
    });

MuiLabel.displayName = 'MuiLabel';

export { MuiLabel };