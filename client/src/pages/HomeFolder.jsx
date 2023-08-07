import Page from "../components/Page";
import FolderIcon from "@mui/icons-material/Folder";
import { Stack, Typography } from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";

const headContent = (
  <>
    <title>Change Me! - Home</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function HomeFolder() {
  return (
    <Page isProtected={true} headContent={headContent}>
      <DefaultLayout
        icon={<FolderIcon fontSize="large" />}
        title={"Home Folder"}
      >
        <div>hello</div>
      </DefaultLayout>
    </Page>
  );
}
