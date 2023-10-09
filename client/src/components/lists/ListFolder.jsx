import {
  ListItemButton,
  Collapse,
  ListItem,
  IconButton,
  Stack,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getFolderById } from "../../redux/slices/homeFolderSlice";
import { getUser } from "../../redux/slices/userSlice";
import { useMutation } from "@apollo/client";
import { MOVE_DECK_FOLDER } from "../../graphql/mutations";
import { useDispatch } from "react-redux";
import { updateAfterFolderDeckMove } from "../../redux/slices/homeFolderSlice";
import { useDrop } from "react-dnd";
import PanToolIcon from "@mui/icons-material/PanTool";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { checkDeckFolderOwnership } from "../../lib/helperFunctions";

import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ListDeckFolderItem from "./ListDeckFolderItem";
import LoadDeckFolders from "./LoadDeckFolders";
import AddItemToList from "./AddItemToList";
import FolderOptionsMenu from "../Menus/FolderOptionsMenu";

import DraggableItem from "../drag-and-drop/DraggableItem";

export default function ListFolder({
  deckFolder,
  handleListButtonOnClick,
  paddingLeft,
  index,
}) {
  const dispatch = useDispatch();
  const { title, _id, subFolder, parentDeckFolder, createdByUser } = deckFolder;
  const { open } = useSelector(getFolderById(_id));
  const { userData } = useSelector(getUser());
  const { userIsOwner, deckFolderIsMovable } = checkDeckFolderOwnership(
    useSelector(getFolderById(parentDeckFolder?._id)),
    createdByUser,
    userData
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [secondAnchorEl, setSecondAnchorEl] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [
    moveDeckFolder,
    { loading: moveDeckFolderLoading, error: moveDeckFolderError },
  ] = useMutation(MOVE_DECK_FOLDER);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSecondMenu = () => {
    setSecondAnchorEl(null);
  };

  const handleOpenSecondMenu = (event) => {
    setSecondAnchorEl(anchorEl);
    setAnchorEl(null);
  };

  const onGrab = (event) => {
    event.stopPropagation();
  };

  const handleDrop = async (item) => {
    const deckFolderId = item._id;
    const oldParentFolderId = item.parentDeckFolder?._id;

    try {
      const moveDeckData = await moveDeckFolder({
        variables: {
          deckFolderId,
          oldParentFolderId,
          newParentFolderId: _id,
        },
      });

      if (moveDeckFolderError || !moveDeckData.data) {
        console.log(moveDeckFolderError);
        return;
      }

      dispatch(
        updateAfterFolderDeckMove({
          deckFolderId,
          oldParentFolderId,
          newParentFolderId: _id,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [{ canDrop, isOverCurrent }, dropRef] = useDrop({
    accept: "ITEM",
    drop: (item, monitor) => {
      if (
        monitor.didDrop() ||
        item._id === _id ||
        item?.parentDeckFolder?._id === _id
      )
        return;
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOverCurrent: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const isActive = isOverCurrent && canDrop;

  return (
    <Box ref={dropRef} key={_id}>
      <ListItem
        disablePadding
        sx={{
          paddingLeft: paddingLeft,
        }}
        key={_id}
      >
        <ListItemButton
          selected={isActive}
          dense
          onClick={() => handleListButtonOnClick(_id)}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"}>
            <IconButton edge="start" disableRipple>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            <Stack direction="row" alignItems={"center"} spacing={0.5}>
              <FolderIcon color="inherit" />
              {/* <ListItemText>{title}</ListItemText> */}
              <Typography className="line-clamp-1">
                {userIsOwner ? title : `${title} (uneditable)`}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              visibility: !userIsOwner && "hidden",
            }}
          >
            <IconButton onClick={handleOpenMenu} size="small">
              <MoreVertIcon />
            </IconButton>
            <DraggableItem item={deckFolder}>
              <IconButton size="small" onClick={onGrab}>
                <DragIndicatorIcon className="grab-element" />
              </IconButton>
            </DraggableItem>
          </Stack>
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        <div>
          {userIsOwner && (
            <AddItemToList
              paddingLeft={paddingLeft + 4}
              parentDeckFolderId={_id}
              key={index}
            />
          )}
          {/* {subFolder?.length < 1 && (
            )} */}
          {moveDeckFolderLoading && (
            <Skeleton sx={{ marginLeft: paddingLeft + 2, marginRight: 2 }} />
          )}
          {subFolder ? (
            subFolder.map((deckFolder, index) => (
              <ListDeckFolderItem
                deckFolder={deckFolder}
                handleListButtonOnClick={handleListButtonOnClick}
                paddingLeft={paddingLeft + 4}
                index={index}
                key={deckFolder._id}
              />
            ))
          ) : (
            <LoadDeckFolders marginLeft={paddingLeft + 4} _id={_id} />
          )}
        </div>
      </Collapse>
      <FolderOptionsMenu
        handleCloseMenu={handleCloseMenu}
        anchorEl={anchorEl}
        parentDeckFolderId={parentDeckFolder?._id}
        deckFolderId={_id}
        handleOpenSecondMenu={handleOpenSecondMenu}
        secondAnchorEl={secondAnchorEl}
        handleCloseSecondMenu={handleCloseSecondMenu}
        userIsOwner={userIsOwner}
      />
    </Box>
  );
}
