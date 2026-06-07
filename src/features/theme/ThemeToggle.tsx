import { IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectThemeMode, toggleMode } from './theme-slice';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);
  const next = mode === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${next} mode`;

  return (
    <Tooltip title={label}>
      <IconButton
        color="inherit"
        onClick={() => dispatch(toggleMode())}
        aria-label={label}
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
