import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";
import { lightTheme, darkTheme } from "../theme/theme.js";
import { getTheme } from "../redux/slices/themeSlice";
import CompOverrides from "../theme/overrides/index.js";

const CustomThemeProvider = ({ children }) => {
  const { mode } = useSelector(getTheme());
  const isLight = mode === "light";

  const themeOptions = useMemo(
    () => (isLight ? lightTheme : darkTheme),
    [isLight]
  );

  const theme = createTheme(themeOptions);
  theme.components = CompOverrides(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default CustomThemeProvider;
