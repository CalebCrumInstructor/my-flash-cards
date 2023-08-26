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
  updateAfterFolderEdit,
} from "../../redux/slices/homeFolderSlice";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_FOLDER_TITLE } from "../../graphql/mutations";
import { GET_ROOT_FOLDER } from "../../graphql/queries";
import { clearAllErrors } from "../../lib/helperFunctions";
import EditIcon from "@mui/icons-material/Edit";

export default function EditFolderDialog() {
  const dispatch = useDispatch();
  const [editFolderTitle, { loading, error }] = useMutation(EDIT_FOLDER_TITLE);
  const { dialogs, folders } = useSelector(getHomeFolder());

  const { open, deckFolderId } = dialogs.editFolderDialog;

  // console.log(deckFolderId, folders[deckFolderId]?.title);

  const [folderInput, setFolderInput] = useState({
    title: {
      val: "",
      error: false,
      errorMsg: "Please enter a folder name.",
      name: "title",
    },
  });

  useEffect(() => {
    if (!deckFolderId) return;
    const newObj = {
      ...folderInput,
    };

    newObj.title.val = folders[deckFolderId].title;

    setFolderInput(newObj);
  }, [deckFolderId]);

  const handleClose = () => {
    dispatch(
      setDialogOpen({
        open: false,
        dialogName: "editFolderDialog",
        deckFolderId: null,
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
        deckFolderId,
      };

      const { data } = await editFolderTitle({
        variables,
      });

      if (error) {
        console.log(error);
        console.log(data);
        return;
      }

      dispatch(updateAfterFolderEdit(variables));
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
            value={folderInput.title.val}
          />
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
