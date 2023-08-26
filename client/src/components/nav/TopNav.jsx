import { useState } from "react";
import AuthServices from "../../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideNav } from "../../redux/slices/navSlice";
import { toggleTheme, getTheme } from "../../redux/slices/themeSlice";
import { getUser } from "../../redux/slices/userSlice";
import UnstyledLink from "../UnstyledLink";
import { useLocation } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const routesWithHomeButtonArr = ["/"];

export default function TopNav({ withSideNav }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isMediumOrUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { isAuthenticated } = useSelector(getUser());
  const { mode } = useSelector(getTheme());

  const handleLogout = (e) => {
    handleCloseUserMenu(null);
    AuthServices.logout();
  };

  const handleToggleTheme = () => {
    handleCloseUserMenu(null);
    localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
    dispatch(toggleTheme());
  };

  const handleNavIconClick = () => {
    dispatch(toggleSideNav());
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container maxWidth={false} disableGutters sx={{ px: 2 }}>
        <Toolbar disableGutters>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexGrow={1}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              {withSideNav && isMediumOrUp && (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleNavIconClick}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              )}
              <UnstyledLink to={isAuthenticated ? "/home-folder" : "/"}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    fontWeight: 700,
                    color: "inherit",
                  }}
                >
                  My-Flash-Cards
                </Typography>
              </UnstyledLink>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              {isAuthenticated ? (
                <Stack direction={"row"} spacing={2}>
                  {routesWithHomeButtonArr.includes(pathname) &&
                    isMediumOrUp && (
                      <UnstyledLink to={"/home-folder"}>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<FolderIcon />}
                        >
                          Home Folder
                        </Button>
                      </UnstyledLink>
                    )}
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                      color="inherit"
                      size="large"
                    >
                      <AccountCircleIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleToggleTheme}>
                      <Typography textAlign="center">
                        {mode === "light" ? "dark mode" : "light mode"}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Stack>
              ) : (
                <Stack direction={"row"} spacing={2}>
                  <UnstyledLink to={"/login"}>
                    <Button variant="outlined" color="inherit">
                      Login
                    </Button>
                  </UnstyledLink>
                  <UnstyledLink to={"/signup"}>
                    <Button variant="contained" color="secondary">
                      Sign Up
                    </Button>
                  </UnstyledLink>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
