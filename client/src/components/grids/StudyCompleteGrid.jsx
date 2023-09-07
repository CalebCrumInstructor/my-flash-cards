import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function StudyCompleteGrid({
  handleEndClick,
  handleInitialState,
}) {
  return (
    <Box height={"100%"} sx={{ paddingTop: 4 }}>
      <Grid
        container
        spacing={3}
        sx={{ paddingBottom: 2 }}
        alignItems={"center"}
      >
        <Grid item xs={12} md={9} lg={6}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h4" align="center">
                  You have completed this Study Session!
                </Typography>
                <Button
                  startIcon={<ReplayIcon />}
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleInitialState}
                >
                  Restart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleEndClick}
                >
                  Return
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
