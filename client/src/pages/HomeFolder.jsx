import Page from "../components/Page";

const headContent = (
  <>
    <title>Change Me! - Home</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

export default function HomeFolder() {
  return (
    <Page isProtected={true} headContent={headContent}>
      <div>HomeFolder</div>
    </Page>
  );
}
