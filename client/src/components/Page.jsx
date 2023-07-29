import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";

import { Container, Stack } from "@mui/material";

import TopNav from "./TopNav";
import SideNav from "./SideNav";

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
  children,
}) {
  const { isAuthenticated } = useSelector(getUser());

  return (
    <>
      <Helmet>{headContent}</Helmet>
      <Stack height={"100vh"}>
        <TopNav />
        <Stack flexGrow={1} direction={"row"}>
          {withSideNav && <SideNav />}
          <Container maxWidth="xl" sx={{ display: "flex" }}>
            {isProtected && !isAuthenticated ? (
              <div>Unauthorized</div>
            ) : (
              children
            )}
          </Container>
        </Stack>
      </Stack>
    </>
  );
}
