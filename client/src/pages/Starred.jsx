import Page from "../components/Page";
import { Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
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
      <DefaultLayout icon={<StarIcon fontSize="large" />} title={"Starred"}>
        <div>hello</div>
      </DefaultLayout>
    </Page>
  );
}
