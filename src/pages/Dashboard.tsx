import { styled } from "@mui/material/styles";
import { Grid, Box, Typography, Button } from "@mui/material";

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  height:'100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const Dashboard = () => {
  return (
    <>
      <Typography color="text.primary">Breadcrumbs</Typography>
      <ContentBox>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Welcome to Rite Sync
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              No Connections to show, Start adding connections/Users.
            </Typography>
          </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="secondary">
                User
              </Button>
              <Button variant="contained" color="primary" sx={{ ml: 2}}>
                Connections
              </Button>
            </Grid>
        </Grid>
      </ContentBox>
    </>
  );
};

export default Dashboard;
