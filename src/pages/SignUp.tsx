import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Link,
    Grid,
    Box,
    Container,
    styled,
  } from "@mui/material";
  
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

const SignUp = () => {
  const [companyName, setCompanyName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Company Name:', companyName);
    console.log('User Email:', userEmail);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Page>
    <PageContainer maxWidth="sm">
      <Box sx={{ pb: 2 }}>
        <img width="88px" height="50px" src="images/logo.png" alt="Logo" />
      </Box>
        <form onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Company Name"
                fullWidth
                value={companyName}
                onChange={handleCompanyNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="User Email (Company Emails Only)"
                fullWidth
                value={userEmail}
                onChange={handleUserEmailChange}
              />
            </Grid>
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
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                    Already have an account?  <Link href="/login">Sign In</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
        </PageContainer>
    </Page>
  );
};

export default SignUp;
