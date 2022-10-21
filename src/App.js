import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Challenge from "./pages/Challenge";
import "./css/App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}> </Route>
          <Route path="/about" element={<About/>}> </Route>
          <Route path="/challenge" element={<Challenge/>}> </Route>
          <Route path="/login" element={<Login/>}> </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
