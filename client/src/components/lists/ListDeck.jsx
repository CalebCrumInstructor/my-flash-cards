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

import { Draggable } from "react-beautiful-dnd";

const handleDragStart = (event, deckFolderId, oldParentFolderId) => {
  event.stopPropagation();
  event.dataTransfer.clearData();

  const dragPreview = document.createElement("div");
  event.dataTransfer.setDragImage(dragPreview, 0, 0);

  const obj = {
    deckFolderId,
    oldParentFolderId,
  };

  event.dataTransfer.setData("text/plain", JSON.stringify(obj));
};

export default function ListDeck({ deckFolder, paddingLeft }) {
  const { title, _id, parentDeckFolder, cardCount } = deckFolder;

  const [anchorEl, setAnchorEl] = useState(null);
  const [isPressing, setIsPressing] = useState(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div
      onDragStart={(event) =>
        handleDragStart(event, _id, parentDeckFolder?._id)
      }
      draggable
    >
      <ListItem
        secondaryAction={
          <Stack direction={"row"}>
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
            {/* <IconButton>
              <DragIndicatorIcon />
            </IconButton> */}
          </Stack>
        }
        disablePadding
        sx={{
          paddingLeft: paddingLeft,
        }}
        key={deckFolder._id}
      >
        <ListItemButton dense>
          <Stack
            direction={"row"}
            flexGrow={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"}>
              <Checkbox edge="start" disableRipple />
              <Stack direction="row" alignItems={"center"} spacing={0.5}>
                <DynamicFeedIcon color="primary" />
                <Typography className="line-clamp-1">{title}</Typography>
              </Stack>
            </Stack>
            <Typography
              className="line-clamp-1"
              variant="subtitle2"
              sx={{ mr: 1 }}
            >
              {cardCount} card{cardCount === 1 ? "" : "s"}
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <CardDeckOptionsMenu
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        parentDeckFolderId={parentDeckFolder?._id}
        deckFolderId={_id}
      />
    </div>
  );
}
