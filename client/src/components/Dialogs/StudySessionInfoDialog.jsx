import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { isMobile } from "react-device-detect";

export default function StudySessionInfoDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>How Study Sessions Work</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography>
            Study Sessions begin by randomly shuffling cards from your selected
            decks. These cards are each given an equal weight. The weight of a
            card determines the likelihood of seeing the card.
          </Typography>
          <Typography>
            To flip the card and see the opposite side,{" "}
            {isMobile
              ? "touch the card"
              : "click on the card, press enter, or press space bar"}
            . When you are finished viewing the card, select your comprehension
            level of the card content.
          </Typography>
          <Typography>
            Here is what happens when you select each comprehension level.
          </Typography>
          <Stack spacing={1}>
            <Typography variant="h6" color={"secondary"}>
              Comprehension Levels
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              <Typography
                color={"error"}
                sx={{ display: "inline", fontWeight: "bold" }}
              >
                1
              </Typography>{" "}
              - Card will be returned to the study session and heavily weighted.{" "}
              {!isMobile && (
                <Typography variant="caption" sx={{ display: "inline" }}>
                  keyboard shortcut: 1 or a
                </Typography>
              )}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              <Typography
                color={"warning.main"}
                sx={{ display: "inline", fontWeight: "bold" }}
              >
                2
              </Typography>{" "}
              - Card will be returned to the study session and weighted.{" "}
              {!isMobile && (
                <Typography variant="caption" sx={{ display: "inline" }}>
                  keyboard shortcut: 2 or s
                </Typography>
              )}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              <Typography
                color={"tertiary.main"}
                sx={{ display: "inline", fontWeight: "bold" }}
              >
                3
              </Typography>{" "}
              - Card will be returned to the study session.{" "}
              {!isMobile && (
                <Typography variant="caption" sx={{ display: "inline" }}>
                  keyboard shortcut: 3 or d
                </Typography>
              )}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              <Typography
                color={"success.main"}
                sx={{ display: "inline", fontWeight: "bold" }}
              >
                4
              </Typography>{" "}
              - Card will be removed from the study session.{" "}
              {!isMobile && (
                <Typography variant="caption" sx={{ display: "inline" }}>
                  keyboard shortcut: 4 or f
                </Typography>
              )}
            </Typography>
          </Stack>
          <Typography sx={{ pt: 1 }}>
            Options 1 and 2 will add additional weight to the card and return it
            to the study session. You will see this card again and more often.
            Option 3 will return the card to the study session to be seen again.
            And Option 4, will remove the card from the study session.
          </Typography>
          <Typography>
            Your study session will be complete when you have a comprehension
            level of 4 for each card.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
