import { Box, Grid, Typography, Card, CardContent, Stack } from "@mui/material";
import UnstyledLinkedButton from "../UnstyledLinkedButton";

export default function SessionTimedOut() {
  return (
    <Box
      flexGrow={1}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
    >
      <Grid container justifyContent={"center"}>
        <Card
          raised
          sx={{
            minWidth: {
              xs: "100%",
              md: 500,
            },
          }}
        >
          <CardContent>
            <Stack spacing={3}>
              <Stack>
                <Typography variant="h4">
                  Your Session has timed out.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Please return to the Login page.
                </Typography>
              </Stack>
              <UnstyledLinkedButton
                buttonProps={{
                  type: "submit",
                  fullWidth: true,
                  variant: "contained",
                  color: "secondary",
                  size: "large",
                }}
                linkProps={{
                  to: "/login",
                }}
              >
                Login
              </UnstyledLinkedButton>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
