import React, { useContext, useEffect, useState } from "react";
import { getMovieRecommendations } from "../../config/gemini";
import { MovieContext } from "../../MovieContextWrapper";

const MovieRecommendations = ({ setShowModal }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loader, setLoader] = useState(false);
  const { watchList } = useContext(MovieContext);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (watchList?.length <= 2) {
        return;
      }
      try {
        setLoader(true);
        const result = await getMovieRecommendations(watchList);
        setRecommendations(result?.recommendations);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchRecommendations();
  }, []);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black/50 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 overflow-auto relative">
        <h2 className="text-2xl font-bold mb-4">AI Recommended Movies</h2>
        {loader ? (
          <div className="flex justify-center items-center py-8">
            <div className="loader"></div>
            <span className="ml-2">
              Getting your personalized recommendations...
            </span>
          </div>
        ) : (
          <>
            <button
              className="absolute top-4 right-4 text-red-500 text-lg"
              onClick={() => setShowModal((prevState) => !prevState)}
            >
              ✖
            </button>
            {watchList?.length <= 2 ? (
              <div className="p-4 text-center">
                <p className="text-gray-600">
                  Add at least 2 movies to your watchList to get personalized
                  recommendations
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {recommendations.map((movie, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold">{movie.title}</h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        {movie.confidence}% Match
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{movie.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendations;
