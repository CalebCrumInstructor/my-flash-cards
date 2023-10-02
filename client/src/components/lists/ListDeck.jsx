import {
  ListItemButton,
  ListItem,
  IconButton,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeckSelected,
  getDeckById,
} from "../../redux/slices/homeFolderSlice";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardDeckOptionsMenu from "../Menus/CardDeckOptionsMenu";

import DraggableItem from "../drag-and-drop/DraggableItem";

export default function ListDeck({ deckFolder, paddingLeft }) {
  const dispatch = useDispatch();
  const { title, _id, parentDeckFolder, cardCount } = deckFolder;
  const { selected } = useSelector(getDeckById(_id));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleToggleSelected = (event) => {
    event.stopPropagation();
    dispatch(toggleDeckSelected(_id));
  };

  return (
    <DraggableItem item={deckFolder}>
      <ListItem
        secondaryAction={
          <Stack direction={"row"}>
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        }
        disablePadding
        sx={{
          paddingLeft: paddingLeft,
        }}
        key={deckFolder._id}
        onClick={handleToggleSelected}
      >
        <ListItemButton dense>
          <Stack
            direction={"row"}
            flexGrow={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"}>
              <Checkbox
                edge="start"
                disableRipple
                checked={selected == null ? false : selected}
              />
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
    </DraggableItem>
  );
}
