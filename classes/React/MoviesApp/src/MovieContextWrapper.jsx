import React, { useEffect, useState } from "react";

// 1 . create a context object
export const MovieContext = React.createContext();

const MovieContextWrapper = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const watchListData = JSON.parse(localStorage.getItem("watchListedMovies"));
    setWatchList(watchListData);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchListedMovies", JSON.stringify(watchList));
  }, [watchList]);

  const addToWatchList = (movie) => {
    setWatchList((prevState) => {
      const updatedWatchList = prevState ? [...prevState, movie] : [movie];
      return updatedWatchList;
    });
  };

  const removeFromWatchList = (movie) => {
    setWatchList((prevState) => {
      const filteredWatchList = prevState.filter((m) => {
        return m?.id != movie?.id;
      });
      return filteredWatchList;
    });
  };

  // 2. create a provider where you will add state and functions infomation
  return (
    <MovieContext.Provider
      value={{ watchList, setWatchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextWrapper;
