import { Stack, Typography, Fade } from "@mui/material";
import { useBreakpoints } from "../../hooks";

export default function DefaultLayout({ icon, title, children }) {
  const { isMediumOrUp } = useBreakpoints();

  return (
    <Fade in={true}>
      <Stack
        sx={{
          paddingTop: isMediumOrUp ? 1 : 3,
          paddingBottom: 3,
          width: "100%",
        }}
        spacing={3}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          sx={{ paddingX: isMediumOrUp ? "" : 2 }}
        >
          {icon}
          <Typography variant={isMediumOrUp ? "h4" : "h5"}>{title}</Typography>
        </Stack>
        {children}
      </Stack>
    </Fade>
  );
}
