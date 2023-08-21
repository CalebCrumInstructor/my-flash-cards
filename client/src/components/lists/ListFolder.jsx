import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItem,
  IconButton,
  Stack,
  ListItemText,
  Typography,
  Skeleton,
} from "@mui/material";

import { useSelector } from "react-redux";
import { getFolderById } from "../../redux/slices/homeFolderSlice";

import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ListDeckFolderItem from "./ListDeckFolderItem";
import LoadDeckFolders from "./LoadDeckFolders";

export default function ListFolder({
  deckFolder,
  handleListButtonOnClick,
  paddingLeft,
}) {
  const { title, _id, subFolder } = deckFolder;
  const { open } = useSelector(getFolderById(_id));

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <MoreVertIcon />
          </IconButton>
        }
        disablePadding
        sx={{
          paddingLeft: paddingLeft,
        }}
        key={_id}
      >
        <ListItemButton dense onClick={() => handleListButtonOnClick(_id)}>
          <IconButton edge="start" disableRipple>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
          <Stack direction="row" alignItems={"center"} spacing={0.5}>
            <FolderIcon color="inherit" />
            {/* <ListItemText>{title}</ListItemText> */}
            <Typography className="line-clamp-1">{title}</Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        {subFolder ? (
          subFolder.map((deckFolder) => (
            <ListDeckFolderItem
              deckFolder={deckFolder}
              handleListButtonOnClick={handleListButtonOnClick}
              paddingLeft={paddingLeft + 4}
            />
          ))
        ) : (
          <LoadDeckFolders marginLeft={paddingLeft + 4} _id={_id} />
        )}
      </Collapse>
    </>
  );
}
