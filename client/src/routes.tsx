import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const routes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export default routes;
