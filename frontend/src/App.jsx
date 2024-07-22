import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Movies from "../pages/Movie";
import TvSeries from "../pages/Tvseries";
import Bookmark from "../pages/Bookmark";
import Dashboard from "../pages/Dashboard";
import TVSeriesDetails from "../pages/Details/TVSeriesDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/TvSeries" element={<TvSeries />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tvseries/:id" element={<TVSeriesDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
