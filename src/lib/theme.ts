
'use client';
import { PaletteOptions } from "@mui/material";
import { createTheme } from '@mui/material/styles';

export const palette: PaletteOptions = {
  common: {
    white: "#fff",
    black: "#000",
  },
  primary: {
    main: "#33A3FF"
  },
};

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  cssVariables: true
});

