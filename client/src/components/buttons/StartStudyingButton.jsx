import { Typography, Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

export default function StartStudyingButton({
  isMediumOrUp,
  selectedDecksArr,
}) {
  const navigate = useNavigate();

  const totalCards = selectedDecksArr.reduce(
    (total, { cardCount }) => total + cardCount,
    0
  );

  const handleStudyButtonClick = () => {
    const deckIdsArr = selectedDecksArr.map(({ _id }) => _id);
    const arrStr = encodeURIComponent(JSON.stringify(deckIdsArr));

    navigate(`/study?deckIdsArr=${arrStr}`);
  };

  return (
    <Button
      onClick={handleStudyButtonClick}
      variant="contained"
      sx={{ textTransform: "none" }}
      fullWidth
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: "100%",
        }}
        spacing={3}
      >
        <SendIcon fontSize="large" />
        <Stack>
          <Typography
            align="center"
            variant={isMediumOrUp ? "h5" : "h6"}
            color={"inherit"}
          >
            Start Study Session
          </Typography>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography align="center" color={"inherit"}>
              {selectedDecksArr.length} deck
              {selectedDecksArr.length !== 1 ? "s" : ""}
            </Typography>
            <Typography align="center" color={"inherit"}>
              {totalCards} card{totalCards !== 1 ? "s" : ""}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
}
