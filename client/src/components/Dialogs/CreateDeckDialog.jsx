import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setDialogOpen,
  getHomeFolder,
  updateStateWithSubFolderWithNewFolder,
} from "../../redux/slices/homeFolderSlice";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DECK } from "../../graphql/mutations";
import { GET_ROOT_FOLDER } from "../../graphql/queries";
import { clearAllErrors } from "../../lib/helperFunctions";
import { redirect, useNavigate } from "react-router-dom";

export default function CreateDeckDialog({
  open,
  parentDeckFolderId,
  handleClose,
}) {
  const dispatch = useDispatch();
  const [createDeck, { loading, error }] = useMutation(CREATE_DECK);
  const navigate = useNavigate();
  const [deckInput, setDeckInput] = useState({
    title: {
      val: "",
      error: false,
      errorMsg: "Please enter a folder name.",
      name: "title",
    },
    isPrivate: {
      val: false,
      error: false,
      errorMsg: "",
      name: "isPrivate",
    },
  });

  const handleChange = (event) => {
    clearAllErrors(deckInput, setDeckInput);
    const { name, value } = event.target;

    const newObj = {
      ...deckInput,
    };

    newObj[name].val = value;

    setDeckInput(newObj);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newObj = {
      ...deckInput,
    };

    newObj[name].val = checked;

    setDeckInput(newObj);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!deckInput.title.val) {
      setDeckInput({
        ...deckInput,
        title: {
          ...deckInput.title,
          error: true,
        },
      });
      return;
    }

    try {
      const variables = {
        title: deckInput.title.val,
        isPrivate: deckInput.isPrivate.val,
      };

      if (parentDeckFolderId) {
        variables.parentDeckFolderId = parentDeckFolderId;
      }

      const { data } = await createDeck({
        variables,
      });

      if (error) {
        console.log(error);
        console.log(data);
        return;
      }

      dispatch(
        updateStateWithSubFolderWithNewFolder({
          parentDeckFolderId: parentDeckFolderId,
          deckFolder: data.createDeck,
        })
      );
      handleClose();
      navigate(`/deck-editor?deckFolderId=${data.createDeck._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleOnSubmit}>
        <DialogTitle>New Deck</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              sx={{
                marginTop: 1,
              }}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              required
              fullWidth
              id="title"
              label="Deck Name"
              name="title"
              autoComplete="title"
              error={deckInput.title.error}
              helperText={deckInput.title.error && deckInput.title.errorMsg}
              autoFocus
            />
            <FormControlLabel
              label="Private"
              control={
                <Checkbox
                  name="isPrivate"
                  onChange={handleCheckboxChange}
                  checked={deckInput.isPrivate.val}
                />
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
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
