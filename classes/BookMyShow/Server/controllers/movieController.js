const movieModel = require("../models/movieSchema");

const addMovie = async (req, res, next) => {
  try {
    // duplicate movie handling need to done
    const newMovie = new movieModel(req?.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New Movie has been Added",
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const getAllMovies = async (req, res, next) => {
  try {
    const allMovies = await movieModel.find();
    res.send({
      success: true,
      message: "All movies has been fetched",
      data: allMovies,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.findByIdAndUpdate(
      req?.body?.movieId,
      req.body,
      { new: true }
    );
    res.send({
      success: true,
      message: "The Movie has been Updated",
      data: movie,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    await movieModel.findByIdAndDelete(movieId);
    res.send({
      success: true,
      message: "The Movie has been deleted",
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    res.send({
      success: true,
      message: "The Movie has been deleted",
      data: movie,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
};
