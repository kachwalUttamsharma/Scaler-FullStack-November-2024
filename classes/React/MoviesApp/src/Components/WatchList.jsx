import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import genreids from "../helpers/genreId";

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const watchListData = JSON.parse(localStorage.getItem("watchListedMovies"));
    setWatchList(watchListData);
  }, []);

  const handleAscendingOrderRatings = () => {
    const sortedAscendingData = watchList.sort(
      (movieA, movieB) => movieA?.vote_average - movieB?.vote_average
    );
    setWatchList([...sortedAscendingData]);
  };
  const handleDesendingOrderRatings = () => {
    const sortedDescendingData = watchList.sort(
      (movieA, movieB) => movieB?.vote_average - movieA?.vote_average
    );
    setWatchList([...sortedDescendingData]);
  };
  return (
    <div className="my-10 mx-5">
      <div className="flex justify-center my-10">
        <input
          placeholder="Search by movie name"
          className="h-[3rem] w-[18rem] px-4 outline-none border border-slate-700 rounded-lg bg-gray-300"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th>
              <div className="flex">
                <ArrowUp
                  size={24}
                  strokeWidth={2}
                  onClick={handleAscendingOrderRatings}
                />
                <div>Ratings</div>
                <ArrowDown
                  size={24}
                  strokeWidth={2}
                  onClick={handleDesendingOrderRatings}
                />
              </div>
            </th>
            <th>
              <div className="flex">
                <div>Popularity</div>
              </div>
            </th>
            <th>
              <div className="flex">
                <div>Genre</div>
              </div>
            </th>
            <th>
              <div className="flex">
                <div>Action Button</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {watchList?.length > 0 &&
            watchList
              .filter((movie) => {
                return movie.title
                  .toLowerCase()
                  .trim()
                  .includes(search.toLowerCase());
              })
              .map((movie, idx) => {
                return (
                  <tr key={idx}>
                    <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                      <img
                        className="h-[6rem] w-[10rem] object-cover"
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                        alt="Poster of Movie"
                      />
                      <div className="font-medium text-gray-700 text-sm">
                        {movie?.title}
                      </div>
                    </td>
                    <td className="pl-6 py-4">
                      <div>{movie?.vote_average}</div>
                    </td>
                    <td className="pl-6 py-4">
                      <div>{movie?.popularity}</div>
                    </td>
                    <td className="pl-6 py-4">
                      <div>{genreids[movie?.genre_ids[0]]}</div>
                    </td>
                    <td className="pl-6 py-4">Action</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
