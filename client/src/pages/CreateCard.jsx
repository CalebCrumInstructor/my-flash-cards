import Page from "../components/Page";
import {
  Stack,
  Typography,
  Grid,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import Editor from "../components/Editor";
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CARD } from "../graphql/mutations";
import FlipperCard from "../components/cards/FlipperCard";
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
      >
        <Box position="relative">
          {loading && (
            <LinearProgress
              sx={{ position: "absolute", top: -12, width: "100%" }}
            />
          )}
          <CardEditors
            moveTo={moveToDeckEditor}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </Box>
      </DefaultLayout>
    </Page>
  );
}
