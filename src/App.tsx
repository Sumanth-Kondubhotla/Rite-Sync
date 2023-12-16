import { ThemeProvider } from "@mui/system";
import "./App.css";
import customTheme from "./theme/custom-theme";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Root />,
    children: [{path: 'dashboard', element: <Dashboard />}]
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
