import Page from "../components/Page";

const headContent = (
  <>
    <title>Welcome - My-Flash-Cards</title>
    <meta name="description" content="Welcome to My-Flash-Cards." />
  </>
);

export default function Home() {
  return (
    <Page isProtected={false} headContent={headContent} withSideNav={false}>
      <div>Home</div>
    </Page>
  );
}
