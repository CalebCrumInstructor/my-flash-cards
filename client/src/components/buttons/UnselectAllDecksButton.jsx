import { Button } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useDispatch } from "react-redux";
import { unselectAllDecks } from "../../redux/slices/homeFolderSlice";

export default function UnselectAllDecksButton({ variant = "outlined" }) {
  const dispatch = useDispatch();

  const handleUnselectAll = () => {
    dispatch(unselectAllDecks());
  };

  return (
    <Button
      variant={variant}
      color="warning"
      fullWidth
      startIcon={<RemoveCircleOutlineOutlinedIcon />}
      onClick={handleUnselectAll}
    >
      Unselect all Decks
    </Button>
  );
}
