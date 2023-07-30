import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";
import {
  clearAllErrors,
  validateRegistrationOrLogin,
} from "../lib/helperFunctions";
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
} from "@mui/material";
import Page from "../components/Page";
import AuthService from "../utils/auth";
import UnstyledLink from "../components/UnstyledLink";

const headContent = (
  <>
    <title>Login - My-Flash-Cards</title>
    <meta name="description" content="Login page for My-Flash-Cards." />
  </>
);

export default function Login() {
  const [loginUser, { error, data, loading }] = useMutation(LOGIN_USER);
  const { isAuthenticated } = useSelector(getUser());

  const [displayedErrorText, setDisplayedErrorText] = useState("");

  const [loginCreds, setLoginCreds] = useState({
    email: {
      val: "",
      error: false,
      errorMsg: "Please enter a valid email address.",
      name: "email",
    },
    password: {
      val: "",
      error: false,
      errorMsg:
        "Please Enter a password with a character length between 8 and 25.",
      name: "password",
    },
  });

  const handleChange = (event) => {
    setDisplayedErrorText("");
    clearAllErrors(loginCreds, setLoginCreds);
    const { name, value } = event.target;

    const newObj = {
      ...loginCreds,
    };

    newObj[name].val = value;

    setLoginCreds(newObj);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setDisplayedErrorText("");

    if (!validateRegistrationOrLogin(loginCreds, setLoginCreds, false)) return;

    try {
      const { email, password } = loginCreds;
      const variables = {
        email: email.val,
        password: password.val,
      };

      const { data } = await loginUser({
        variables,
      });

      AuthService.login(data.loginUser.token);
    } catch (e) {
      console.error(e);
      setDisplayedErrorText(e.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Page isProtected={false} headContent={headContent} withSideNav={false}>
      <Box
        flexGrow={1}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Grid container justifyContent={`center`}>
          <Stack spacing={1}>
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
                    <Typography variant="h4">Login</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Let the studying begin!
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
                        error={loginCreds.email.error}
                        helperText={
                          loginCreds.email.error && loginCreds.email.errorMsg
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
                        error={loginCreds.password.error}
                        helperText={
                          loginCreds.password.error &&
                          loginCreds.password.errorMsg
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
                          "Login"
                        )}
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </CardContent>
            </Card>
            <UnstyledLink to={"/signup"}>
              <Typography
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Don't have an account? Sign Up
              </Typography>
            </UnstyledLink>
          </Stack>
        </Grid>
      </Box>
    </Page>
  );
}
