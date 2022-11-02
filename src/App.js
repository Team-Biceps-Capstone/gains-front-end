import { Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import ConfirmPassword from "./components/ConfirmPassword";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Challenge from "./pages/Challenge";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout"



function App() {
  const { user } = useAuthContext()
  return (
    <Router>
      <div className="App">
        <Navbar/>
        
        <Routes>
          <Route path="/" element={<Home/>}> </Route>
          <Route path="/about" element={<About/>}> </Route>
          <Route path="/challenge" element={user ? <Challenge/> : <Navigate to="/"/>}> </Route>
          <Route path="/login" element={user ? <Navigate to="/challenge"/> : <Login/>}> </Route>
          <Route path="/signup" element={user ? <Navigate to="/challenge"/> : <Signup/>}> </Route>
          <Route path="/logout" element={<Logout/>}> </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
