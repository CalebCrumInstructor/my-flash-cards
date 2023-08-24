import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setDialogOpen,
  getHomeFolder,
  removeDeckFolder,
} from "../../redux/slices/homeFolderSlice";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_FOLDER } from "../../graphql/mutations";
import { clearAllErrors } from "../../lib/helperFunctions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DeleteDeckFolderDialog() {
  const dispatch = useDispatch();
  const [deleteFolder, { loading, error }] = useMutation(DELETE_FOLDER);
  const [deckFolderInput, setDeckFolderInput] = useState({
    title: {
      val: "",
      error: false,
      errorMsg: "Please enter the name of the folder.",
      name: "title",
    },
  });

  const handleChange = (event) => {
    clearAllErrors(deckFolderInput, setDeckFolderInput);
    const { name, value } = event.target;

    const newObj = {
      ...deckFolderInput,
    };

    newObj[name].val = value;

    setDeckFolderInput(newObj);
  };

  const { dialogs, folders, decks } = useSelector(getHomeFolder());
  const { open, isFolder, parentDeckFolderId, deckFolderId } =
    dialogs.deleteDeckFolder;

  const deckFolder = isFolder ? folders[deckFolderId] : decks[deckFolderId];

  const handleClose = () => {
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

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (deckFolderInput.title.val !== deckFolder?.title) {
      setDeckFolderInput({
        ...deckFolderInput,
        title: {
          ...deckFolderInput.title,
          error: true,
          errorMsg: `Please enter the name of the ${
            isFolder ? "folder" : "card deck"
          } to be deleted.`,
        },
      });
      return;
    }

    try {
      const variables = {
        deckFolderId,
      };

      if (parentDeckFolderId) {
        variables.parentDeckFolderId = parentDeckFolderId;
      }

      const { data } = await deleteFolder({
        variables,
      });

      if (error) {
        console.log(error);
        return;
      }

      dispatch(removeDeckFolder({ ...variables, isFolder }));
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleOnSubmit}>
        <DialogTitle color={"error"}>
          Delete {isFolder ? "Folder" : "Card Deck"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography>
              Are you Sure you want to delete this{" "}
              {isFolder ? "folder" : "card deck"}?
            </Typography>
            {isFolder ? (
              <Typography sx={{ fontWeight: "bold", fontStyle: "italic" }}>
                You will loose all nested folders and card decks!
              </Typography>
            ) : (
              <Typography sx={{ fontWeight: "bold", fontStyle: "italic" }}>
                You will loose all {deckFolder?.cardCount} cards in this deck!
              </Typography>
            )}
            <TextField
              sx={{
                marginTop: 1,
              }}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              required
              fullWidth
              id="title"
              label={`Type "${deckFolder?.title}" to delete this ${
                isFolder ? "folder" : "card deck"
              }`}
              name="title"
              autoComplete="title"
              error={deckFolderInput.title.error}
              helperText={
                deckFolderInput.title.error && deckFolderInput.title.errorMsg
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                startIcon={<DeleteForeverIcon />}
                disabled={deckFolderInput.title.val !== deckFolder?.title}
              >
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
