import { Stack, Typography, useMediaQuery } from "@mui/material";

export default function DefaultLayout({ icon, title, children }) {
  const isMediumOrUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Stack sx={{ marginTop: 2 }}>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {icon}
        <Typography variant={isMediumOrUp ? "h4" : "h5"}>{title}</Typography>
      </Stack>
      {children}
    </Stack>
  );
}
