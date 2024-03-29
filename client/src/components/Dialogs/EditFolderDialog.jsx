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
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_DECK_FOLDER } from "../../graphql/mutations";
import { GET_ROOT_FOLDER } from "../../graphql/queries";
import { clearAllErrors } from "../../lib/helperFunctions";
import EditIcon from "@mui/icons-material/Edit";

export default function EditFolderDialog({
  handleClose,
  alterStateAfterSuccess,
  open,
  deckFolderId,
  deckFolder,
}) {
  const [editDeckFolder, { loading, error }] = useMutation(EDIT_DECK_FOLDER);
  const [deckFolderInput, setDeckFolderInput] = useState({
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

  useEffect(() => {
    if (!deckFolderId) return;
    const newObj = {
      ...deckFolderInput,
    };

    newObj.title.val = deckFolder.title;
    newObj.isPrivate.val = deckFolder.isPrivate;

    setDeckFolderInput(newObj);
  }, [deckFolderId]);

  const handleChange = (event) => {
    clearAllErrors(deckFolderInput, setDeckFolderInput);
    const { name, value } = event.target;

    const newObj = {
      ...deckFolderInput,
    };

    newObj[name].val = value;

    setDeckFolderInput(newObj);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newObj = {
      ...deckFolderInput,
    };

    newObj[name].val = checked;

    setDeckFolderInput(newObj);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!deckFolderInput.title.val) {
      setDeckFolderInput({
        ...deckFolderInput,
        title: {
          ...deckFolderInput.title,
          error: true,
        },
      });
      return;
    }

    try {
      const variables = {
        title: deckFolderInput.title.val,
        deckFolderId,
        isPrivate: deckFolderInput.isPrivate.val,
      };

      const { data } = await editDeckFolder({
        variables,
      });

      if (error) {
        console.log(error);
        console.log(data);
        return;
      }

      alterStateAfterSuccess(variables);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleOnSubmit}>
        <DialogTitle>Edit Folder</DialogTitle>
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
              label="Folder Name"
              name="title"
              autoComplete="title"
              error={deckFolderInput.title.error}
              helperText={
                deckFolderInput.title.error && deckFolderInput.title.errorMsg
              }
              value={deckFolderInput.title.val}
            />
            <FormControlLabel
              label="Private"
              control={
                <Checkbox
                  name="isPrivate"
                  onChange={handleCheckboxChange}
                  checked={deckFolderInput.isPrivate.val}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
