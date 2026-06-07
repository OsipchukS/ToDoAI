import { createTheme, type Theme } from '@mui/material/styles';
import type { ThemeMode } from './theme-slice';

export function buildTheme(mode: ThemeMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      background:
        mode === 'dark'
          ? { default: '#0f1419', paper: '#1a1f24' }
          : { default: '#f5f7fa', paper: '#ffffff' },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
    },
  });
}
