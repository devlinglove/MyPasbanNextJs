import * as React from 'react';
import { type FieldError } from 'react-hook-form';
import { FormControlProps, Stack } from '@mui/material';
import { Error } from './error';
import { MuiLabel } from './mui-label';


type FieldWrapperProps = {
    label?: string;
    className?: string;
    children: React.ReactNode;
    fieldError?: FieldError | undefined;
    labelInputId: string
};


type FormControlExtendedProps = FormControlProps & FieldWrapperProps

export type FormControlWrapperPassThroughProps = Omit<
    FieldWrapperProps,
    'className' | 'children' | 'labelInputId'
>;


const MuiFormControlWrapper = React.forwardRef<HTMLDivElement, FormControlExtendedProps>(
    ({ label, fieldError, children, labelInputId, ...props }, ref) => {
        return (
            <Stack gap={0.5}>
                <MuiLabel label={label} htmlFor={labelInputId} />
                {children}
                <Error errorMessage={fieldError?.message} />
            </Stack>
        );
    },
);

MuiFormControlWrapper.displayName = 'MuiFormControl';

export { MuiFormControlWrapper };