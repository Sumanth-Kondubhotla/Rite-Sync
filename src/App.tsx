import "./App.css";
import Button from "./Shared-Components/Button/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Styles/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary">Primary Button</Button>
    </ThemeProvider>
  );
}

export default App;
