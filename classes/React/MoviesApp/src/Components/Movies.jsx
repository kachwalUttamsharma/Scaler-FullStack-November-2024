import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Spinner from "./Spinner";
import MovieList from "./MovieList";
import MovieInfo from "./MovieInfo";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePrev = () => {
    setPageNo((prevPage) => {
      if (prevPage == 1) {
        return prevPage;
      }
      return prevPage - 1;
    });
  };

  const handleNext = () => {
    setPageNo((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const watchListData = JSON.parse(localStorage.getItem("watchListedMovies"));
    setWatchList(watchListData);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchListedMovies", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    setLoader(true);
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=0fa9d94b072b5c497f3a9720acb86bc2&language=en-US&page=${pageNo}`;
    axios
      .get(url)
      .then((response) => {
        const movieData = response?.data?.results;
        setMovies(movieData);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNo]);

  const checkIfMoviePresent = (movie) => {
    for (let i = 0; i < watchList?.length; i++) {
      if (watchList[i].id === movie.id) {
        return true;
      }
    }
    return false;
  };

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

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setOpenModal(false);
  };

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
            movies={movies}
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
