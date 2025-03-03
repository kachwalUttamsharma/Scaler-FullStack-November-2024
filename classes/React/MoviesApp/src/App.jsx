import "./App.css";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar";
import WatchList from "./Components/WatchList/WatchList";
import { Routes, Route } from "react-router-dom";
import MovieContextWrapper from "./MovieContextWrapper";

function App() {
  return (
    <>
      {/* <div className="text-3xl font-bold underline">MoviesAPP</div> */}
      <MovieContextWrapper>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/watchList" element={<WatchList />}></Route>
        </Routes>
      </MovieContextWrapper>
    </>
  );
}

export default App;
