import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setDialogOpen,
  getHomeFolder,
  updateStateWithSubFolderWithNewFolder,
} from "../../redux/slices/homeFolderSlice";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_FOLDER } from "../../graphql/mutations";
import { clearAllErrors } from "../../lib/helperFunctions";

export default function CreateFolderDialog() {
  const dispatch = useDispatch();
  const [createFolder, { loading, error }] = useMutation(CREATE_FOLDER);
  const [folderInput, setFolderInput] = useState({
    title: {
      val: "",
      error: false,
      errorMsg: "Please enter a folder name.",
      name: "title",
    },
  });

  const { dialogs } = useSelector(getHomeFolder());

  const handleClose = () => {
    dispatch(
      setDialogOpen({
        value: false,
        dialogName: "createFolderDialog",
        parentDeckFolderId: null,
      })
    );
  };

  const handleChange = (event) => {
    clearAllErrors(folderInput, setFolderInput);
    const { name, value } = event.target;

    const newObj = {
      ...folderInput,
    };

    newObj[name].val = value;

    setFolderInput(newObj);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!folderInput.title.val) {
      setFolderInput({
        ...folderInput,
        title: {
          ...folderInput.title,
          error: true,
        },
      });
      return;
    }

    try {
      const variables = {
        title: folderInput.title.val,
      };

      if (dialogs.createFolderDialog.parentDeckFolderId) {
        variables.parentDeckFolderId =
          dialogs.createFolderDialog.parentDeckFolderId;
      }

      const { data } = await createFolder({
        variables,
      });

      if (error) {
        console.log(error);
        console.log(data);
        return;
      }

      dispatch(
        updateStateWithSubFolderWithNewFolder({
          parentDeckFolderId: dialogs.createFolderDialog.parentDeckFolderId,
          deckFolder: data.createFolder,
        })
      );
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={dialogs.createFolderDialog.open} onClose={handleClose}>
      <form onSubmit={handleOnSubmit}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
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
            error={folderInput.title.error}
            helperText={folderInput.title.error && folderInput.title.errorMsg}
          />
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
