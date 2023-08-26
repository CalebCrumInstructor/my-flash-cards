import { useTheme } from '@mui/material';

export default function useThemeMode() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return { isDarkTheme };
};