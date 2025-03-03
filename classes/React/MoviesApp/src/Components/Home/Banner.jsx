import React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?api_key=0fa9d94b072b5c497f3a9720acb86bc2&language=en-US";
    axios
      .get(url)
      .then((response) => {
        const movieData = response?.data?.results.slice(0, 5);
        setMovies(
          movieData.map((movie) => ({
            title: movie?.title,
            bannerImage: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
          }))
        );
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevState) => (prevState + 1) % movies.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevState) =>
      prevState === 0 ? movies.length - 1 : prevState - 1
    );
  };
  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        movies?.length > 0 && (
          <div className="relative h-[50vh]">
            <div
              className="h-full bg-cover bg-center flex items-end transition-all duration-500"
              style={{
                backgroundImage: `url(${movies[currentIndex]?.bannerImage})`,
              }}
            >
              <div className="text-white w-full text-center text-2xl p-4 bg-black/50">
                {movies[currentIndex]?.title}
              </div>
            </div>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Banner;
