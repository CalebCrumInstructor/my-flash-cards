import { Stack, Typography, Fade, LinearProgress, Box } from "@mui/material";
import { useBreakpoints } from "../../hooks";

export default function DefaultLayout({
  icon,
  title,
  children,
  loading = false,
}) {
  const { isMediumOrUp } = useBreakpoints();

  return (
    <Fade in={true}>
      <Stack
        sx={{
          paddingTop: isMediumOrUp ? 1 : 3,
          paddingBottom: 3,
          width: "100%",
          position: "relative",
        }}
        spacing={3}
      >
        <Box sx={{ position: "relative" }}>
          {loading && (
            <LinearProgress
              sx={{ position: "absolute", bottom: -10, width: "100%" }}
            />
          )}
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{ paddingX: isMediumOrUp ? "" : 2 }}
          >
            {icon}
            <Typography variant={isMediumOrUp ? "h4" : "h5"}>
              {title}
            </Typography>
          </Stack>
        </Box>
        {children}
      </Stack>
    </Fade>
  );
}
