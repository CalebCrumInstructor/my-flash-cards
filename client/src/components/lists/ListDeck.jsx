import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  ListItem,
  IconButton,
  Checkbox,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDialogOpen } from "../../redux/slices/homeFolderSlice";
import FolderIcon from "@mui/icons-material/Folder";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CardDeckOptionsMenu from "../Menus/CardDeckOptionsMenu";

export default function ListDeck({ deckFolder, paddingLeft }) {
  const { title, _id, parentDeckFolder } = deckFolder;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction={"row"}>
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
            <IconButton
            // sx={{
            //   "&:hover": {
            //     cursor: "grab",
            //   },
            // }}
            >
              <DragIndicatorIcon />
            </IconButton>
          </Stack>
        }
        disablePadding
        sx={{
          paddingLeft: paddingLeft,
        }}
        key={deckFolder._id}
      >
        <ListItemButton dense>
          <Checkbox edge="start" disableRipple />
          <Stack direction="row" alignItems={"center"} spacing={0.5}>
            <DynamicFeedIcon color="primary" />
            <Typography className="line-clamp-1">{title}</Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <CardDeckOptionsMenu
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        parentDeckFolderId={parentDeckFolder?._id}
        deckFolderId={_id}
      />
    </>
  );
}
