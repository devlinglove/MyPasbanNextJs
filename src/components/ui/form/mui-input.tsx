import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { InputBase, InputBaseProps, InputLabel, OutlinedInput, OutlinedInputProps, Stack, TextField, TextFieldProps } from '@mui/material';
import { MuiFormControl } from './form-control=wrapper';
import { Error } from './error';

// export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
//   FieldWrapperPassThroughProps & {
//     className?: string;
//     registration: Partial<UseFormRegisterReturn>;
//   };

type InputBaseExtendedProps = TextFieldProps & FieldWrapperPassThroughProps

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
    InputBaseExtendedProps & {
        registration: Partial<UseFormRegisterReturn>;
    };

const MuiInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, fieldError, registration, ...props }, ref) => {
        return (
            // <MuiFormControl label={label} fieldError={fieldError} size='small' {...props}>
            //     <OutlinedInput
            //         type={type}
            //         ref={ref}
            //         {...registration}
            //         {...props}
            //     />

            // </MuiFormControl>
            <>
            {/* <TextField
                //label={label}
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                ref={ref}
                {...registration}
                {...props}
            /> */}

                <Stack gap={0.5}>
                    <InputLabel htmlFor="my-input" sx={{ display: 'block', position: 'static', transform: 'none' }}>
                        Email
                    </InputLabel>
                    <OutlinedInput size='small' id="my-input" placeholder="Enter email" {...registration} />
                    <Error errorMessage={fieldError?.message} />
                </Stack>


            









            </>
        );
    },
);

MuiInput.displayName = 'MuiInput';

export { MuiInput };