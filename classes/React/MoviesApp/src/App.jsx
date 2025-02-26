import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import WatchList from "./Components/WatchList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="text-3xl font-bold underline">MoviesAPP</div>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/watchList" element={<WatchList />}></Route>
      </Routes>
    </>
  );
}

export default App;
