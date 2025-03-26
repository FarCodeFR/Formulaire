import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <header>
        <Link to="/Login">
          <h1>Formulaire</h1>
        </Link>
      </header>
      <ToastContainer autoClose={1500} />
      <Outlet />
    </>
  );
}

export default App;
