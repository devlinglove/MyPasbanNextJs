'use client'
import { InputLabel } from "@mui/material";
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = React.forwardRef<
  React.ElementRef<typeof InputLabel>,
  React.ComponentPropsWithoutRef<typeof InputLabel> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <InputLabel
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));


Label.displayName = 'Label';

export { Label };