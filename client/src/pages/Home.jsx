import Page from "../components/Page";
import { Typography, Stack, Button } from "@mui/material";
import { useBreakpoints } from "../hooks";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import UnstyledLink from "../components/UnstyledLink";
import FolderIcon from "@mui/icons-material/Folder";

const headContent = (
  <>
    <title>Welcome - My-Flash-Cards</title>
    <meta name="description" content="Welcome to My-Flash-Cards." />
  </>
);

export default function Home() {
  const { isMediumOrUp } = useBreakpoints();
  const { isAuthenticated } = useSelector(getUser());

  return (
    <Page
      isProtected={false}
      headContent={headContent}
      withSideNav={false}
      withBottomNav={false}
    >
      <Stack
        width={"100%"}
        spacing={3}
        paddingTop={isMediumOrUp ? 6 : 4}
        paddingX={2}
      >
        <Typography
          variant={isMediumOrUp ? "h1" : "h3"}
          align="center"
          color={"primary"}
          sx={{
            fontWeight: "bold",
          }}
        >
          My-Flash-Cards
        </Typography>
        <Typography
          align="center"
          variant={isMediumOrUp ? "h3" : "h4"}
          color={"secondary"}
        >
          Powerful and Simple Flash Cards
        </Typography>
        <Typography align="center" variant={isMediumOrUp ? "h5" : "h6"}>
          Organize your decks into a drag and drop folder system.
        </Typography>
        <Typography align="center" variant={isMediumOrUp ? "h5" : "h6"}>
          Create content rich cards with images, tables, and more.
        </Typography>
        {/* <Typography align="center">and</Typography> */}
        <Typography align="center" variant={isMediumOrUp ? "h5" : "h6"}>
          Study multiple decks at once in our dynamic study sessions.
        </Typography>
        <Typography
          align="center"
          variant={isMediumOrUp ? "h5" : "h6"}
          color={"primary"}
        >
          Begin Today!
        </Typography>
        <Stack
          direction={isMediumOrUp ? "row" : "column"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {isAuthenticated ? (
            <UnstyledLink to={"/home-folder"}>
              <Button variant="outlined" color="inherit">
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <FolderIcon fontSize="large" />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Home Folder
                  </Typography>
                </Stack>
              </Button>
            </UnstyledLink>
          ) : (
            <>
              <UnstyledLink to={"/login"}>
                <Button variant="outlined" color="inherit" fullWidth>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Typography>
                </Button>
              </UnstyledLink>
              <Typography>or</Typography>
              <UnstyledLink to={"/signup"}>
                <Button variant="contained" color="secondary" fullWidth>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </Typography>
                </Button>
              </UnstyledLink>
            </>
          )}
        </Stack>
      </Stack>
    </Page>
  );
}
