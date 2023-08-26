import { useMediaQuery } from "@mui/material";

export default function useBreakpoints() {
  const isMediumOrUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return { isMediumOrUp };
};
