import {
  ListItemButton,
  ListItem,
  IconButton,
  Checkbox,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeckSelected,
  getDeckById,
  getFolderById,
} from "../../redux/slices/homeFolderSlice";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import DraggableItem from "../drag-and-drop/DraggableItem";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { checkDeckFolderOwnership } from "../../lib/helperFunctions";
import { getUser } from "../../redux/slices/userSlice";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardDeckOptionsMenu from "../Menus/CardDeckOptionsMenu";

export default function ListDeck({ deckFolder, paddingLeft }) {
  const dispatch = useDispatch();
  const { title, _id, parentDeckFolder, cardCount, createdByUser } = deckFolder;
  const { selected } = useSelector(getDeckById(_id));
  const { userData } = useSelector(getUser());
  const { userIsOwner, deckFolderIsMovable } = checkDeckFolderOwnership(
    useSelector(getFolderById(parentDeckFolder?._id)),
    createdByUser,
    userData
  );

  console.log(deckFolderIsMovable);

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
    <Box key={_id}>
      <ListItem
        disablePadding
        sx={{
          paddingLeft: paddingLeft,
        }}
        key={deckFolder._id}
        onClick={handleToggleSelected}
      >
        <ListItemButton
          dense
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
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
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              className="line-clamp-1"
              variant="subtitle2"
              sx={{
                mr: {
                  md: 2,
                },
              }}
            >
              {cardCount} card{cardCount === 1 ? "" : "s"}
            </Typography>

            <IconButton
              onClick={handleOpenMenu}
              size="small"
              sx={{
                display: !userIsOwner && "none",
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Box
              sx={{
                display: !userIsOwner && "none",
              }}
            >
              <DraggableItem item={deckFolder}>
                <IconButton size="small">
                  <DragIndicatorIcon className="grab-element" />
                </IconButton>
              </DraggableItem>
            </Box>
          </Stack>
        </ListItemButton>
      </ListItem>
      <CardDeckOptionsMenu
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        parentDeckFolderId={parentDeckFolder?._id}
        deckFolderId={_id}
      />
    </Box>
  );
}
