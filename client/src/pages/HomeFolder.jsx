import Page from "../components/Page";
import FolderIcon from "@mui/icons-material/Folder";
import { Stack, Typography, Grid } from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HomeFolderList from "../components/lists/HomeFolderList";

const headContent = (
  <>
    <title>Home Folder - My-Flash-Cards</title>
    <meta name="description" content="View all your folders and Decks here." />
  </>
);

export default function HomeFolder() {
  return (
    <Page isProtected={true} headContent={headContent}>
      <DefaultLayout
        icon={<FolderIcon fontSize="large" color="inherit" />}
        title={"Home Folder"}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <HomeFolderList />
          </Grid>
        </Grid>
      </DefaultLayout>
    </Page>
  );
}
