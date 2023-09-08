import { Box, Checkbox, IconButton } from "@mui/material";
import FlipperCard from "./FlipperCard";
import EditIcon from "@mui/icons-material/Edit";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";

export default function FlipperCardWithOverlay({
  card,
  moveToEditCard,
  handleCheckboxChange,
  checked,
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={() => moveToEditCard(card)}
        sx={{
          position: "absolute",
          top: 1,
          right: 1,
          zIndex: 1,
        }}
      >
        <EditIcon />
      </IconButton>
      <Checkbox
        sx={{
          position: "absolute",
          top: 1,
          left: 1,
          zIndex: 1,
        }}
        onChange={(event) => handleCheckboxChange(event, card)}
        checked={checked}
        icon={<CropSquareIcon />}
        checkedIcon={<SquareRoundedIcon />}
      />
      <FlipperCard card={card} />
    </Box>
  );
}
