import { Box, Grid } from "@mui/material";
import FlipperCard from "../cards/FlipperCard";

export default function DeckEditorGrid({ selectedDeck, isMediumOrUp }) {
  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Grid container spacing={3}>
        {selectedDeck.cards.map((card) => (
          <Grid item xs={12} md={6} lg={3}>
            <FlipperCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
