import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ErrorNotFound from "./pages/ErrorNotFound";
import AdminPage from "./pages/AdminPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "*", // Catch-all route for 404
      element: <ErrorNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
