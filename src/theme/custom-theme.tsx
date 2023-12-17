import { createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006AA2',
      contrastText: 'white',
    },
    secondary: {
      main: '#2B2B2B',
      contrastText: '#2B2B2B'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none'
        },
        sizeMedium: {
          paddingTop: '8px',
          paddingBottom: '8px',
        },
        sizeLarge: {
          paddingTop: '12px',
          paddingBottom: '12px',
        }
      }
    }
  },
  spacing: 12
});

export default theme;