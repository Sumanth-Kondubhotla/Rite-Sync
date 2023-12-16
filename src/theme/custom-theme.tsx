import { createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006AA2',
      contrastText: 'white',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          textTransform: 'none'
        }
      }
    }
  },
  spacing: 12
});

export default theme;