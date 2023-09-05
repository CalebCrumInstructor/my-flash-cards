import Page from "../components/Page";
import EditIcon from "@mui/icons-material/Edit";
import {
  Stack,
  Typography,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_DECKS_FOR_USER_PRIVATE } from "../graphql/queries";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import {
  getDeckEditor,
  setSelectedDeck,
  setDialogOpen,
  setCardSelectedForEdit,
  resetSelectedCardsObj,
} from "../redux/slices/deckEditorSlice";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeckEditorGrid from "../components/grids/DeckEditorGrid";
import { useBreakpoints } from "../hooks";
import DeleteDeckFolderDialog from "../components/Dialogs/DeleteDeckFolderDialog";
import EditFolderDialog from "../components/Dialogs/EditFolderDialog";
import { useNavigate } from "react-router-dom";
import DeleteCardsDialog from "../components/Dialogs/DeleteCardsDialog";

const headContent = (
  <>
    <title>Deck Editor - My-Flash-Cards</title>
    <meta name="description" content="Modify your custom decks here." />
  </>
);

export default function DeckEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const client = useApolloClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedDeck, dialogs, selectedCardsObj } = useSelector(
    getDeckEditor()
  );
  const { isMediumOrUp } = useBreakpoints();
  // ! Will need to eventually add updating of this cache,
  // ! for now make request each time component renders
  const { data, loading, error } = useQuery(GET_ALL_DECKS_FOR_USER_PRIVATE, {
    fetchPolicy: "network-only",
  });

  const moveToCreateCard = () => {
    navigate(`/deck-editor/${selectedDeck._id}/create-card`);
  };

  const moveToEditCard = (card) => {
    dispatch(setCardSelectedForEdit(card));
    navigate(`/deck-editor/${selectedDeck._id}/edit-card/${card._id}`);
  };

  const handleDeckChange = (event, value) => {
    dispatch(setSelectedDeck(value));
  };

  useEffect(() => {
    const deckFolderId = searchParams.get("deckFolderId");
    if (!data?.getAllDecksForUserPrivate || !deckFolderId) return;

    const foundDeck = data?.getAllDecksForUserPrivate.find(
      ({ _id }) => _id === deckFolderId
    );
    setSearchParams("");

    if (!foundDeck) return;

    dispatch(setSelectedDeck(foundDeck));
  }, [data]);

  const openDeleteFolderDialog = () => {
    if (!selectedDeck) return;
    dispatch(
      setDialogOpen({
        open: true,
        dialogName: "deleteDeckFolder",
        parentDeckFolderId: selectedDeck.parentDeckFolder?._id,
        deckFolderId: selectedDeck._id,
        isFolder: false,
      })
    );
  };

  const openEditFolderDialog = () => {
    if (!selectedDeck) return;
    dispatch(
      setDialogOpen({
        open: true,
        dialogName: "editFolderDialog",
        deckFolderId: selectedDeck._id,
      })
    );
  };

  const handleDeleteDeckFolderDialogClose = () => {
    dispatch(
      setDialogOpen({
        open: false,
        dialogName: "deleteDeckFolder",
        parentDeckFolderId: null,
        deckFolderId: null,
        isFolder: false,
      })
    );
  };

  const handleDeleteCardsDialogClose = () => {
    dispatch(
      setDialogOpen({
        open: false,
        dialogName: "deleteCardsDialog",
        deckFolderId: null,
      })
    );
  };

  const handleEditFolderDialogClose = () => {
    dispatch(
      setDialogOpen({
        open: false,
        dialogName: "editFolderDialog",
        deckFolderId: null,
      })
    );
  };

  const alterStateAfterDeletion = ({ deckFolderId }) => {
    dispatch(setSelectedDeck(null));
    client.cache.updateQuery(
      {
        query: GET_ALL_DECKS_FOR_USER_PRIVATE,
      },
      ({ getAllDecksForUserPrivate }) => {
        return {
          getAllDecksForUserPrivate: getAllDecksForUserPrivate.filter(
            ({ _id }) => _id !== deckFolderId
          ),
        };
      }
    );
  };

  const alterStateAfterEdit = ({ deckFolderId, title, isPrivate }) => {
    dispatch(
      setSelectedDeck({
        ...selectedDeck,
        title,
        isPrivate,
      })
    );
    client.cache.updateQuery(
      {
        query: GET_ALL_DECKS_FOR_USER_PRIVATE,
      },
      ({ getAllDecksForUserPrivate }) => {
        return {
          getAllDecksForUserPrivate: getAllDecksForUserPrivate.map((deck) => {
            const { _id } = deck;
            if (_id !== deckFolderId) return deck;
            return {
              ...deck,
              title,
              isPrivate,
            };
          }),
        };
      }
    );
  };

  const alterStateAfterCardDeletion = ({ deckFolderId, cardIdsArr }) => {
    dispatch(resetSelectedCardsObj());
    dispatch(
      setSelectedDeck({
        ...selectedDeck,
        cards: selectedDeck.cards.filter(({ _id }) => {
          console.log(_id);
          console.log(!cardIdsArr.includes(_id));
          return !cardIdsArr.includes(_id);
        }),
      })
    );
  };

  return (
    <Page isProtected={true} headContent={headContent}>
      <DefaultLayout
        icon={<EditIcon fontSize="large" color="inherit" />}
        title={"Deck Editor"}
      >
        <Stack
          direction={isMediumOrUp ? "row" : "column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={2}
        >
          <Autocomplete
            sx={{ minWidth: 300, paddingX: isMediumOrUp ? "" : 2 }}
            id="decks-input"
            loading={loading}
            options={
              data?.getAllDecksForUserPrivate
                ? data.getAllDecksForUserPrivate
                : []
            }
            getOptionLabel={(option) => option.title}
            value={selectedDeck}
            onChange={handleDeckChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Deck" />
            )}
            fullWidth={!isMediumOrUp}
          />
          <Stack
            direction={isMediumOrUp ? "row" : "column-reverse"}
            spacing={isMediumOrUp ? 4 : 2}
          >
            <Button
              sx={{ maxHeight: 40 }}
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              disabled={!Boolean(selectedDeck)}
              color="secondary"
              onClick={moveToCreateCard}
              size={isMediumOrUp ? "" : "large"}
            >
              Add Card
            </Button>
            <Stack direction={"row"} spacing={4}>
              <Button
                sx={{ maxHeight: 40 }}
                startIcon={<EditIcon />}
                variant="outlined"
                disabled={!Boolean(selectedDeck)}
                onClick={openEditFolderDialog}
              >
                Edit Details
              </Button>
              <Button
                sx={{ maxHeight: 40 }}
                color="error"
                startIcon={<DeleteForeverIcon />}
                disabled={!Boolean(selectedDeck)}
                onClick={openDeleteFolderDialog}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {selectedDeck ? (
          <DeckEditorGrid
            selectedDeck={selectedDeck}
            isMediumOrUp={isMediumOrUp}
            moveToEditCard={moveToEditCard}
          />
        ) : (
          <Typography variant="h5" align="center" sx={{ paddingTop: 3 }}>
            Please Select a Deck to Edit
          </Typography>
        )}
      </DefaultLayout>
      <DeleteDeckFolderDialog
        handleClose={handleDeleteDeckFolderDialogClose}
        open={dialogs.deleteDeckFolder.open}
        isFolder={dialogs.deleteDeckFolder.isFolder}
        parentDeckFolderId={dialogs.deleteDeckFolder.parentDeckFolderId}
        deckFolderId={dialogs.deleteDeckFolder.deckFolderId}
        deckFolder={selectedDeck}
        alterStateAfterSuccess={(obj) => alterStateAfterDeletion(obj)}
      />
      <EditFolderDialog
        open={dialogs.editFolderDialog.open}
        deckFolderId={dialogs.editFolderDialog.deckFolderId}
        handleClose={handleEditFolderDialogClose}
        alterStateAfterSuccess={(obj) => alterStateAfterEdit(obj)}
        deckFolder={selectedDeck}
      />
      <DeleteCardsDialog
        handleClose={handleDeleteCardsDialogClose}
        open={dialogs.deleteCardsDialog.open}
        cardIdsArr={Object.values(selectedCardsObj).map(({ _id }) => _id)}
        deckFolderId={dialogs.deleteCardsDialog.deckFolderId}
        alterStateAfterSuccess={(obj) => alterStateAfterCardDeletion(obj)}
      />
    </Page>
  );
}
