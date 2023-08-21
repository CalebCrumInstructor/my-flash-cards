import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { getNav } from "../redux/slices/navSlice";
import { navWidth } from "../theme/defaultPalette";

import { Container, Stack, Box } from "@mui/material";

import TopNav from "./nav/TopNav";
import SideNav from "./nav/SideNav";
import BottomNavBar from "./nav/BottomNav";
import SessionTimedOut from "./cards/SessionTimedOut";
import { useBreakpoints } from "../hooks/index";

const defaultHeadContent = (
  <>
    <title>My-Flash-Cards</title>
    <meta
      name="description"
      content="My-Flash-Cards is a simple to use study tool."
    />
  </>
);

export default function Page({
  isProtected = false,
  headContent = defaultHeadContent,
  withSideNav = true,
  withBottomNav = true,
  children,
}) {
  const { isAuthenticated } = useSelector(getUser());
  const { isMediumOrUp } = useBreakpoints();
  const { sideNavOpen } = useSelector(getNav());

  console.log(navWidth);

  return (
    <>
      <Helmet>{headContent}</Helmet>
      <Stack height={"100vh"}>
        <TopNav withSideNav={withSideNav} />
        <Stack flexGrow={1} direction={"row"}>
          {withSideNav && <SideNav />}
          {/* spacer for SideNav */}
          <Box
            sx={{
              minWidth: sideNavOpen
                ? navWidth.drawerWidth
                : navWidth.navClosedDrawerWidth,
              display: {
                xs: "none",
                md: "block",
              },
              height: "100vh",
              // position: "fixed",
              // zIndex: 100,
            }}
          ></Box>
          <Container
            maxWidth="xl"
            sx={{ display: "flex" }}
            disableGutters={!isMediumOrUp}
          >
            {isProtected && !isAuthenticated ? <SessionTimedOut /> : children}
          </Container>
        </Stack>
        <Box
          sx={{
            paddingTop: 6,
            display: {
              xs: "block",
              md: "none",
            },
          }}
        ></Box>
        {withBottomNav && <BottomNavBar />}
      </Stack>
    </>
  );
}
