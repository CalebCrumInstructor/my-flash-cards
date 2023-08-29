import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FolderIcon from "@mui/icons-material/Folder";

export default function AddDeckOrFolderMenu({
  anchorEl,
  handleCloseMenu,
  openCreateFolderDialog,
  openCreateDeckDialog,
}) {
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
      <MenuItem onClick={openCreateDeckDialog}>
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
  );
}
