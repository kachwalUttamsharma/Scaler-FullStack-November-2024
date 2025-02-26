import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Spinner from "./Spinner";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageNo, setPageNo] = useState(1);

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
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <div>
          <div className="text-2xl font-bold text-center m-5">
            Trending Movies
          </div>
          <div className="flex justify-evenly flex-wrap gap-8">
            {movies.length > 0 &&
              movies.map((movie, idx) => {
                return (
                  <div key={idx}>
                    <div
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie["backdrop_path"]})`,
                      }}
                      className="h-[30vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-center"
                    >
                      <div className="text-white w-full text-center text-xl p-2 bg-gray-900/70 rounded-xl">
                        {movie.title}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <Pagination
            pageNo={pageNo}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      )}
    </>
  );
};

export default Movies;
