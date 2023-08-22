import {
  ListItem,
  ListItemButton,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FolderIcon from "@mui/icons-material/Folder";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDialogOpen } from "../../redux/slices/homeFolderSlice";

export default function AddItemToList({
  parentDeckFolderId = null,
  paddingLeft,
}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openCreateFolderDialog = () => {
    handleCloseMenu();
    dispatch(
      setDialogOpen({
        value: true,
        dialogName: "createFolderDialog",
        parentDeckFolderId,
      })
    );
  };

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          paddingLeft: paddingLeft,
        }}
        key={parentDeckFolderId}
      >
        <ListItemButton dense onClick={handleOpenMenu}>
          <IconButton edge="start" disableRipple>
            <AddCircleOutlineIcon color="inherit" />
          </IconButton>
          <Typography className="line-clamp-1">Add</Typography>
          {/* <Stack direction="row" alignItems={"center"} spacing={0.5}>
        </Stack> */}
        </ListItemButton>
      </ListItem>
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
        <MenuItem>
          <ListItemIcon>
            <DynamicFeedIcon />
          </ListItemIcon>
          <ListItemText>Card Deck</ListItemText>
        </MenuItem>
        <MenuItem onClick={openCreateFolderDialog}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText>Folder</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
