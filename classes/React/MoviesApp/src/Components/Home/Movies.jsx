import React, { useState, useEffect, useContext } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Spinner from "../Spinner";
import MovieList from "./MovieList";
import MovieInfo from "./MovieInfo";
import { MovieContext } from "../../MovieContextWrapper";
import { useCallback } from "react";
import useFetchData from "../../customHooks/useFetchData";

const Movies = () => {
  const [pageNo, setPageNo] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { watchList, addToWatchList, removeFromWatchList } =
    useContext(MovieContext);
  const {
    data: movies,
    loading: loader,
    error,
  } = useFetchData(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=0fa9d94b072b5c497f3a9720acb86bc2&language=en-US&page=${pageNo}`
  );
  const handlePrev = useCallback(() => {
    setPageNo((prevPage) => {
      if (prevPage == 1) {
        return prevPage;
      }
      return prevPage - 1;
    });
  }, []);

  const handleNext = useCallback(() => {
    setPageNo((prevPage) => prevPage + 1);
  }, []);

  const checkIfMoviePresent = useCallback(
    (movie) => {
      for (let i = 0; i < watchList?.length; i++) {
        if (watchList[i].id === movie.id) {
          return true;
        }
      }
      return false;
    },
    [watchList]
  );

  const handleOpenModal = useCallback((movie) => {
    setSelectedMovie(movie);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
    setOpenModal(false);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <div>
          <div className="text-2xl font-bold text-center m-5">
            Trending Movies
          </div>
          <MovieList
            movies={movies?.results || []}
            addToWatchList={addToWatchList}
            removeFromWatchList={removeFromWatchList}
            checkIfMoviePresent={checkIfMoviePresent}
            handleOpenModal={handleOpenModal}
          />
          <Pagination
            pageNo={pageNo}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
          {openModal && selectedMovie && (
            <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/50 flex justify-center items-center h-screen">
              <MovieInfo
                handleCloseModal={handleCloseModal}
                movie={selectedMovie}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Movies;
