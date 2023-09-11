import Page from "../components/Page";
import { Box, LinearProgress } from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_CARD } from "../graphql/mutations";
import CardEditors from "../components/Editor/CardEditors";

const headContent = (
  <>
    <title>Create Card - My-Flash-Cards</title>
    <meta name="description" content="Create a card for your deck." />
  </>
);

export default function CreateCard() {
  const { deckFolderId } = useParams();
  const navigate = useNavigate();

  const [createCardMutation, { loading, error }] = useMutation(CREATE_CARD);

  const moveToDeckEditor = () => {
    navigate(`/deck-editor?deckFolderId=${deckFolderId}`);
  };

  const handleSubmit = async (frontContent, backContent, shouldMove) => {
    try {
      const { data } = await createCardMutation({
        variables: {
          frontContent,
          backContent,
          deckFolderId,
        },
      });

      if (!shouldMove) return;
      moveToDeckEditor();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page isProtected={true} headContent={headContent}>
      <DefaultLayout
        icon={<AddCircleOutlineIcon fontSize="large" color="inherit" />}
        title={"Create Card"}
        loading={loading}
      >
        <CardEditors
          moveTo={moveToDeckEditor}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </DefaultLayout>
    </Page>
  );
}
