import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";

// Temporary placeholder components
const Login = () => <div>Login Page</div>;
const Dashboard = () => <div>Dashboard</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
