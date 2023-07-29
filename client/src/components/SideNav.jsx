import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getNav } from "../redux/slices/navSlice";
import UnstyledLink from "./UnstyledLink";
import { navWidth } from "../theme/defaultPalette";
import FolderIcon from "@mui/icons-material/Folder";
import StarIcon from "@mui/icons-material/Star";

function VerticalNavListItem({
  sideNavOpen,
  icon,
  primaryText = "",
  href = "/",
  viewable = false,
}) {
  if (!viewable) return null;
  return (
    <UnstyledLink to={href}>
      <Box
        sx={{
          px: 2,
          my: 0.5,
        }}
      >
        <Tooltip
          disableFocusListener={sideNavOpen}
          disableHoverListener={sideNavOpen}
          disableTouchListener={sideNavOpen}
          title={primaryText}
          placement="right"
        >
          <ListItemButton
            sx={{
              borderRadius: 2,
              px: sideNavOpen ? 2 : 1.5,
              transition: (theme) =>
                theme.transitions.create("padding", {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primaryText} className="line-clamp-1" />
          </ListItemButton>
        </Tooltip>
      </Box>
    </UnstyledLink>
  );
}

export default function SideNav() {
  const { sideNavOpen } = useSelector(getNav());

  return (
    <Paper
      square
      elevation={1}
      sx={{
        width: sideNavOpen
          ? navWidth.drawerWidth
          : navWidth.navClosedDrawerWidth,
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <List>
        <VerticalNavListItem
          icon={<FolderIcon />}
          sideNavOpen={sideNavOpen}
          primaryText={"Home Folder"}
          viewable={true}
        />
        <VerticalNavListItem
          icon={<StarIcon />}
          sideNavOpen={sideNavOpen}
          primaryText={"Starred"}
          viewable={true}
        />
      </List>
    </Paper>
  );
}
