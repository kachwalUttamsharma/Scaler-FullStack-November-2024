import React, { useMemo } from "react";
import Spinner from "../Spinner";
import useFetchData from "../../customHooks/useFetchData";

const MovieInfo = React.memo(({ handleCloseModal, movie }) => {
  const { id, title, overview, poster_path, release_date, vote_average } =
    movie;

  const trailerUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0fa9d94b072b5c497f3a9720acb86bc2`,
    [id]
  );

  const { data, loading: loader, error } = useFetchData(trailerUrl);

  const trailer = data?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const trailerEmbedUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : "";

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-[35vw] max-h-[90vh]">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row gap-6">
            {poster_path ? (
              <img
                className="w-1/3 rounded-lg object-cover h-80"
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={`${title} poster`}
              />
            ) : (
              <div className="w-1/3 rounded-lg h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-blue-500 mb-3">{title}</h2>
              <p className="text-gray-500 mb-2">
                <strong>Release Date:</strong> {release_date || "N/A"}
              </p>
              <p className="text-gray-500 mb-4">
                <strong>Average Vote:</strong>
                {vote_average ? vote_average.toFixed(1) : "N/A"}
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                {overview || "No overview available."}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-500 mb-3">
              Trailer
            </h3>
            <div className="w-full h-64">
              {trailerEmbedUrl ? (
                <iframe
                  title={`${title} trailer`}
                  className="w-full h-full rounded-lg"
                  src={trailerEmbedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-gray-500 text-center">
                  Trailer not available.
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </>
      )}
      <></>
    </div>
  );
});

export default MovieInfo;
