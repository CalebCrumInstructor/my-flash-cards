import Page from "../components/Page";
import { Box, LinearProgress } from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { EDIT_CARD } from "../graphql/mutations";
import { GET_CARD_BY_ID } from "../graphql/queries";
import CardEditors from "../components/Editor/CardEditors";
import { useDispatch, useSelector } from "react-redux";
import {
  setCardSelectedForEdit,
  getDeckEditor,
} from "../redux/slices/deckEditorSlice";
import EditIcon from "@mui/icons-material/Edit";

const headContent = (
  <>
    <title>Edit Card - My-Flash-Cards</title>
    <meta name="description" content="Edit a card from your deck." />
  </>
);

export default function EditCard() {
  const { deckFolderId, cardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cardSelectedForEdit } = useSelector(getDeckEditor());

  const [editCardMutation, { loading, error }] = useMutation(EDIT_CARD);
  const [getCardByIdQuery, { loading: getCardLoading }] =
    useLazyQuery(GET_CARD_BY_ID);

  const moveToDeckEditor = () => {
    dispatch(setCardSelectedForEdit(null));
    navigate(`/deck-editor?deckFolderId=${deckFolderId}`);
  };

  const handleSubmit = async (frontContent, backContent) => {
    try {
      const { data } = await editCardMutation({
        variables: {
          frontContent,
          backContent,
          deckFolderId,
          cardId,
        },
      });

      moveToDeckEditor();
    } catch (err) {
      console.log(err);
    }
  };

  const getCard = async () => {
    try {
      const { data } = await getCardByIdQuery({
        variables: {
          cardId,
          deckFolderId,
        },
      });

      dispatch(setCardSelectedForEdit(data.getCardById));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!cardSelectedForEdit || cardSelectedForEdit._id !== cardId) {
      getCard();
    }
  }, []);

  console.log("edit card page");

  return (
    <Page isProtected={true} headContent={headContent}>
      <DefaultLayout
        icon={<EditIcon fontSize="large" color="inherit" />}
        title={"Edit Card"}
      >
        <Box position="relative">
          {(loading || getCardLoading) && (
            <LinearProgress
              sx={{ position: "absolute", top: -12, width: "100%" }}
            />
          )}
          <CardEditors
            moveTo={moveToDeckEditor}
            handleSubmit={handleSubmit}
            loading={loading}
            isEdit={true}
            initialFrontContent={
              cardSelectedForEdit ? cardSelectedForEdit.frontContent : ""
            }
            initialBackContent={
              cardSelectedForEdit ? cardSelectedForEdit.backContent : ""
            }
          />
        </Box>
      </DefaultLayout>
    </Page>
  );
}
