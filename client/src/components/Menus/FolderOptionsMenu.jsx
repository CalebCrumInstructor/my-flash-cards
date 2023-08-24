import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { setDialogOpen } from "../../redux/slices/homeFolderSlice";

export default function FolderOptionsMenu({
  anchorEl,
  handleCloseMenu,
  parentDeckFolderId,
  deckFolderId,
}) {
  const dispatch = useDispatch();

  const openCreateFolderDialog = () => {
    handleCloseMenu();
    dispatch(
      setDialogOpen({
        open: true,
        dialogName: "createFolderDialog",
        parentDeckFolderId: deckFolderId,
      })
    );
  };

  const openDeleteFolderDialog = () => {
    handleCloseMenu();
    dispatch(
      setDialogOpen({
        open: true,
        dialogName: "deleteDeckFolder",
        parentDeckFolderId,
        deckFolderId,
        isFolder: true,
      })
    );
  };

  const openEditFolderDialog = () => {
    handleCloseMenu();
    dispatch(
      setDialogOpen({
        open: true,
        dialogName: "editFolderDialog",
        deckFolderId,
      })
    );
  };

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={openCreateFolderDialog}>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText sx={{ marginRight: 0.5 }}>Add</ListItemText>
      </MenuItem>
      <MenuItem onClick={openEditFolderDialog}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText sx={{ marginRight: 0.5 }}>Edit</ListItemText>
      </MenuItem>
      <MenuItem onClick={openDeleteFolderDialog}>
        <ListItemIcon>
          <DeleteForeverIcon color="error" />
        </ListItemIcon>
        <ListItemText sx={{ marginRight: 0.5 }}>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
}
