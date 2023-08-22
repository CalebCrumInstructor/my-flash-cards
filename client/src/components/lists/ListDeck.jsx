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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export default function ListDeck({ deckFolder, paddingLeft }) {
  const { title } = deckFolder;

  return (
    <ListItem
      secondaryAction={
        <Stack direction={"row"}>
          <IconButton>
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
  );
}
