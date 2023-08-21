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
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ListDeck({ deckFolder, paddingLeft }) {
  const { title } = deckFolder;

  return (
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
      key={deckFolder._id}
    >
      <ListItemButton dense>
        <Checkbox edge="start" disableRipple />
        <Stack direction="row" alignItems={"center"} spacing={0.5}>
          <DynamicFeedIcon color="primary" />
          {/* <ListItemText className="line-clamp-1">{title}</ListItemText> */}
          <Typography className="line-clamp-1">{title}</Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
