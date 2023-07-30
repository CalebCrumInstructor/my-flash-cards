import AuthService from "../utils/auth";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setThemeMode } from "../redux/slices/themeSlice";
import { setAuthenticatedUser } from "../redux/slices/userSlice";

export default function Auth({ children }) {
  const dispatch = useDispatch();
  const browserPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const setInitialTheme = () => {
    const themeMode =
      localStorage.getItem("themeMode") ||
      (browserPrefersDark ? "dark" : "light");
    dispatch(setThemeMode(themeMode));
  };

  const handleSetAuthenticatedUser = () => {
    if (!AuthService.loggedIn()) return;

    dispatch(setAuthenticatedUser(AuthService.getProfile()));
  };

  handleSetAuthenticatedUser();

  useEffect(() => {
    handleSetAuthenticatedUser();
    setInitialTheme();
  }, []);

  return children;
}
