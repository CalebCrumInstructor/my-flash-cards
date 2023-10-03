import Page from "../components/Page";
import FolderIcon from "@mui/icons-material/Folder";
import { Grid, Box, useTheme, Stack, Snackbar, Alert } from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HomeFolderList from "../components/lists/HomeFolderList";
import StartStudyingButton from "../components/buttons/StartStudyingButton";
import UnselectAllDecksButton from "../components/buttons/UnselectAllDecksButton";
import { useBreakpoints } from "../hooks";
import { getHomeFolder } from "../redux/slices/homeFolderSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react";

const headContent = (
  <>
    <title>Home Folder - My-Flash-Cards</title>
    <meta name="description" content="View all your folders and Decks here." />
  </>
);

const setLocalStorage = () => {
  localStorage.setItem("hasSeenMobileDragAndDropAlert", true);
};

export default function HomeFolder() {
  const theme = useTheme();
  const { isMediumOrUp, isLargeOrUp } = useBreakpoints();
  const { decks } = useSelector(getHomeFolder());
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const selectedDecksArr = Object.values(decks).filter(
    ({ selected }) => selected
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    localStorage.setItem("hasSeenMobileDragAndDropAlert", true);
  };

  useEffect(() => {
    const hasSeenMobileDragAndDropAlert = localStorage.getItem(
      "hasSeenMobileDragAndDropAlert"
    );

    if (hasSeenMobileDragAndDropAlert || !isMobile) return;
    setSnackbarOpen(true);
  }, []);

  return (
    <Page isProtected={true} headContent={headContent}>
      <DefaultLayout
        icon={<FolderIcon fontSize="large" color="inherit" />}
        title={"Home Folder"}
      >
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <HomeFolderList />
            </Grid>
            {isMediumOrUp && selectedDecksArr.length > 0 && (
              <Grid item md={4} lg={3.2}>
                <Stack
                  sx={{ position: "sticky", top: theme.spacing(8) }}
                  spacing={3}
                >
                  <StartStudyingButton
                    selectedDecksArr={selectedDecksArr}
                    isMediumOrUp={isMediumOrUp}
                    isLargeOrUp={isLargeOrUp}
                  />
                  <UnselectAllDecksButton />
                </Stack>
              </Grid>
            )}
          </Grid>
        </Box>
        {!isMediumOrUp && selectedDecksArr.length > 0 && (
          <Stack
            sx={{ position: "sticky", bottom: theme.spacing(8) }}
            spacing={3}
          >
            <StartStudyingButton
              selectedDecksArr={selectedDecksArr}
              isMediumOrUp={isMediumOrUp}
              isLargeOrUp={isLargeOrUp}
            />
            <UnselectAllDecksButton variant="contained" />
          </Stack>
        )}
        <Snackbar open={snackbarOpen}>
          <Alert severity="info" onClose={handleSnackbarClose}>
            Currently, drag and drop features will work better on Desktop.
          </Alert>
        </Snackbar>
      </DefaultLayout>
    </Page>
  );
}
