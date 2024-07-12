import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
// import Background from "../pages/Background";
import Sidebar from '../component/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/background" element={<Background />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/s" element = {<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
