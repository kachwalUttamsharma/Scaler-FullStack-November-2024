import React from "react";

const MovieList = React.memo(
  ({
    movies,
    checkIfMoviePresent,
    addToWatchList,
    removeFromWatchList,
    handleOpenModal,
  }) => {
    return (
      <div className="flex justify-evenly flex-wrap gap-8">
        {movies.length > 0 &&
          movies.map((movie, idx) => {
            return (
              <div key={idx}>
                <div
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie["backdrop_path"]})`,
                  }}
                  className="h-[30vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
                >
                  {!checkIfMoviePresent(movie) ? (
                    <div
                      className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
                      onClick={() => addToWatchList(movie)}
                    >
                      &#128525;
                    </div>
                  ) : (
                    <div
                      className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
                      onClick={() => removeFromWatchList(movie)}
                    >
                      &#10060;
                    </div>
                  )}
                  <div
                    className="text-white w-full text-center text-xl p-2 bg-gray-900/70 rounded-xl"
                    onClick={() => handleOpenModal(movie)}
                  >
                    {movie.title}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
);

export default MovieList;
