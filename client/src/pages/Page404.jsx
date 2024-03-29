import Page from "../components/Page";

const headContent = (
  <>
    <title>404 - My-Flash=Cards</title>
    <meta name="description" content="404 Error, page not found." />
  </>
);

export default function Page404() {
  return (
    <Page isProtected={false} headContent={headContent}>
      <div>404 Page Not Found</div>
    </Page>
  );
}
