import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Challenge from "./pages/Challenge";
import ViewChallenges from "./pages/ViewChallenges";
import ViewProgress from "./pages/ViewProgress";
import WallofFame from "./pages/WallofFame";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";

function App() {
  const { user } = useAuthContext();
  const user2 = JSON.parse(window.localStorage.getItem("user"));

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home user={user2} />}>
            {" "}
          </Route>
          <Route path="/about" element={<About />}>
            {" "}
          </Route>
          <Route
            path="/challenge"
            element={user2 ? <Challenge /> : <Navigate to="/" />}
          >
            {" "}
          </Route>

          <Route
            path="/viewChallenges"
            element={user2 ? <ViewChallenges /> : <Navigate to="/" />}
          >
            {" "}
          </Route>

          <Route
            path="/viewProgress"
            element={user2 ? <ViewProgress /> : <Navigate to="/" />}
          >
            {" "}
          </Route>

          <Route
            path="/walloffame"
            element={user2 ? <WallofFame /> : <Navigate to="/" />}
          >
            {" "}
          </Route>

          <Route
            path="/login"
            element={user ? <Navigate to="/challenge" /> : <Login />}
          >
            {" "}
          </Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/challenge" /> : <Signup />}
          >
            {" "}
          </Route>
          <Route path="/logout" element={<Logout />}>
            {" "}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
