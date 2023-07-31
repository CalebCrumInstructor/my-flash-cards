import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useLocation } from "react-router-dom";

const setPageValue = (pathname) => {
  switch (pathname) {
    case "/home-folder":
      return 0;
    case "/starred":
      return 1;
    default:
      return null;
  }
};

export default function BottomNavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleReroute = (path) => {
    navigate(path);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        display: {
          md: "none",
        },
      }}
      elevation={1}
    >
      <BottomNavigation showLabels value={setPageValue(pathname)}>
        <BottomNavigationAction
          onClick={() => handleReroute("/home-folder")}
          label="Home Folder"
          icon={<FolderIcon />}
        />
        <BottomNavigationAction
          onClick={() => handleReroute("/starred")}
          label="Starred"
          icon={<StarIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
