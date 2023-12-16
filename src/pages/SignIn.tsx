import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

// Create a styled component for Container with a background color
const Page = styled("div")({
  backgroundColor: "#004AAC", // Set your desired background color here
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PageContainer = styled(Container)({
  borderRadius: "8px",
  background: "#FFF",
  boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.10)",
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Terms checked:", termsChecked);
  };

  return (
    <Page>
      <PageContainer maxWidth="sm">
        <Box sx={{ pb: 2 }}>
          <img width="88px" height="50px" src="images/logo.png" alt="Logo" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="User Name"
                  fullWidth
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Password"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsChecked}
                      onChange={handleTermsChange}
                      color="primary"
                    />
                  }
                  label="I Agree to the Terms and Conditions"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={!termsChecked && !username && !password}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body2" align="center" gutterBottom>
                  Don't have an account? <Link href="/register"> Register</Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  <Link href="/forgot-password">Forgot password?</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PageContainer>
    </Page>
  );
};

export default SignIn;
