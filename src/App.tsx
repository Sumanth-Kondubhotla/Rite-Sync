import { ThemeProvider } from "@mui/system";
import "./App.css";
import customTheme from "./theme/custom-theme";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
       <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
