import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const tertiary = {
  main: '#fde938', // or #FFEE58
  light: '#ffff8b',
  dark: '#c9bc1f',
  contrastText: 'rgba(0, 0, 0, 0.87)',
};

// A custom theme for this app
// https://mui.com/material-ui/customization/theming/
export const lightTheme = {
  palette: {
    mode: 'light',
    tertiary
  },
};

export const darkTheme = {
  palette: {
    mode: 'dark',
    tertiary
  },
};