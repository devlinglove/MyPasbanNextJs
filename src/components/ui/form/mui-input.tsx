import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { OutlinedInput, OutlinedInputProps, TextFieldProps } from '@mui/material';
import { FormControlWrapperPassThroughProps, MuiFormControlWrapper } from './form-control-wrapper';


type InputBaseExtendedProps = OutlinedInputProps & FormControlWrapperPassThroughProps

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
    InputBaseExtendedProps & {
        registration: Partial<UseFormRegisterReturn>;
    };

const MuiInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, fieldError, registration, ...props }, ref) => {
        const labelInputId = React.useId()
        return (
            <MuiFormControlWrapper label={label} fieldError={fieldError} labelInputId={labelInputId}>
                <OutlinedInput size='small' id={labelInputId} placeholder="Enter email" {...registration} />
            </MuiFormControlWrapper>
        );
    },
);

MuiInput.displayName = 'MuiInput';

export { MuiInput };