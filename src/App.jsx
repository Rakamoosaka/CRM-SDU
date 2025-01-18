import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ErrorNotFound from "./pages/ErrorNotFound";
import AdminPage from "./pages/AdminPage";
import SubmissionPage from "./pages/SubmissionPage";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/submit",
      element: <SubmissionPage />,
    },
    {
      path: "*", // Catch-all route for 404
      element: <ErrorNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
