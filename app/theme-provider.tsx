'use client';

import { ThemeProvider } from '@mui/material/styles';
import theme from '@/utils/theme';
// import CssBaseline from '@mui/material/CssBaseline';

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            {children}
        </ThemeProvider>
    );
}
