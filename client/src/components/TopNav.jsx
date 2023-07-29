import { useState } from "react";
import AuthServices from "../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideNav } from "../redux/slices/navSlice";
import { getUser } from "../redux/slices/userSlice";
import UnstyledLink from "./UnstyledLink";

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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function TopNav() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(getUser());

  const handleLogout = (e) => {
    handleCloseUserMenu(null);
    AuthServices.logout();
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
    <AppBar position="sticky">
      <Container maxWidth={false} disableGutters sx={{ px: 2 }}>
        <Toolbar disableGutters>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexGrow={1}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleNavIconClick}
                color="inherit"
                sx={{
                  display: {
                    xs: "none",
                    md: "inline-flex",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <UnstyledLink to={"/"}>
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
                <>
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
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
