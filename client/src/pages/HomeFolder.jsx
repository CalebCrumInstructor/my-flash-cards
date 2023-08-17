import Page from "../components/Page";
import FolderIcon from "@mui/icons-material/Folder";
import { Stack, Typography } from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useQuery } from "@apollo/client";
import { GET_ROOT_FOLDER } from "../graphql/queries";

const headContent = (
  <>
    <title>Home Folder - My-Flash-Cards</title>
    <meta
      name="description"
      content="View all your folders and card decks here."
    />
  </>
);

export default function HomeFolder() {
  const { loading, data, error } = useQuery(GET_ROOT_FOLDER);

  console.log(data);

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
