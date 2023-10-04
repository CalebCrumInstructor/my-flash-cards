import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  clearAllErrors,
  validateRegistrationOrLogin,
} from "../lib/helperFunctions";
import UnstyledLink from "../components/UnstyledLink";

import Page from "../components/Page";
import AuthService from "../utils/auth";
import { useBreakpoints } from "../hooks";

const headContent = (
  <>
    <title>Sign Up - My-Flash-Cards</title>
    <meta name="description" content="Sign Up page for My-Flash-Cards." />
  </>
);

export default function SignUp() {
  const [addUser, { error, data, loading }] = useMutation(ADD_USER);
  const { isAuthenticated } = useSelector(getUser());
  const { isMediumOrUp } = useBreakpoints();

  const [displayedErrorText, setDisplayedErrorText] = useState("");

  const [registerCreds, setRegisterCreds] = useState({
    email: {
      val: "",
      error: false,
      errorMsg: "Please enter a valid email address.",
      name: "email",
    },
    username: {
      val: "",
      error: false,
      errorMsg: "Please enter a username.",
      name: "username",
    },
    password: {
      val: "",
      error: false,
      errorMsg:
        "Please Enter a password with a character length between 8 and 25.",
      name: "password",
    },
    secondPassword: {
      val: "",
      error: false,
      errorMsg: "Passwords must match.",
      name: "secondPassword",
    },
    includeStarterDecks: {
      val: false,
      error: false,
      errorMsg: "Value Required",
      name: "includeStarterDecks",
    },
  });

  const handleChange = (event) => {
    setDisplayedErrorText("");
    clearAllErrors(registerCreds, setRegisterCreds);
    const { name, value } = event.target;

    const newObj = {
      ...registerCreds,
    };

    newObj[name].val = value;

    setRegisterCreds(newObj);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newObj = {
      ...registerCreds,
    };

    newObj[name].val = checked;

    setRegisterCreds(newObj);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setDisplayedErrorText("");

    if (!validateRegistrationOrLogin(registerCreds, setRegisterCreds, true))
      return;

    try {
      const { email, username, password, includeStarterDecks } = registerCreds;

      const variables = {
        email: email.val,
        username: username.val,
        password: password.val,
        includeStarterDecks: includeStarterDecks.val,
      };

      const { data } = await addUser({
        variables,
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setDisplayedErrorText(e.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Page
      isProtected={false}
      headContent={headContent}
      withSideNav={false}
      withBottomNav={false}
    >
      <Box
        flexGrow={1}
        justifyContent={"center"}
        display={"flex"}
        sx={{
          paddingTop: {
            xs: 4,
            md: 6,
          },
        }}
      >
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} md={8} lg={5}>
            <Stack spacing={1} paddingX={2}>
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
                      <Typography variant="h4">Sign Up</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        Create Your Account Today
                      </Typography>
                    </Stack>
                    <form onSubmit={handleFormSubmit}>
                      <Stack spacing={3}>
                        <TextField
                          onChange={(e) => handleChange(e)}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          error={registerCreds.email.error}
                          helperText={
                            registerCreds.email.error &&
                            registerCreds.email.errorMsg
                          }
                        />
                        <TextField
                          onChange={(e) => handleChange(e)}
                          variant="outlined"
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          autoComplete="username"
                          error={registerCreds.username.error}
                          helperText={
                            registerCreds.username.error &&
                            registerCreds.username.errorMsg
                          }
                        />
                        <TextField
                          onChange={(e) => handleChange(e)}
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          error={registerCreds.password.error}
                          helperText={
                            registerCreds.password.error &&
                            registerCreds.password.errorMsg
                          }
                        />
                        <TextField
                          onChange={(e) => handleChange(e)}
                          variant="outlined"
                          required
                          fullWidth
                          name="secondPassword"
                          label="Re-enter Password"
                          type="password"
                          id="secondPassword"
                          autoComplete="current-password"
                          error={registerCreds.secondPassword.error}
                          helperText={
                            registerCreds.secondPassword.error &&
                            registerCreds.secondPassword.errorMsg
                          }
                        />
                        <FormControlLabel
                          label="Add starter decks to my account."
                          control={
                            <Checkbox
                              name="includeStarterDecks"
                              onChange={handleCheckboxChange}
                              checked={registerCreds.includeStarterDecks.val}
                            />
                          }
                        />
                        {displayedErrorText && (
                          <Typography color={"error"}>
                            {displayedErrorText}
                          </Typography>
                        )}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          size="large"
                        >
                          {loading ? (
                            <CircularProgress color="inherit" />
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </Stack>
                    </form>
                  </Stack>
                </CardContent>
              </Card>
              <UnstyledLink to={"/login"}>
                <Typography
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Already have an account? Login
                </Typography>
              </UnstyledLink>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
