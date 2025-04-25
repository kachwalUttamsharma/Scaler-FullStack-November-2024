const Show = require("../models/showSchema");

const addShow = async (req, res, next) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show has been added!",
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const deleteShow = async (req, res, next) => {
  try {
    const showId = req.params.showId;
    await Show.findByIdAndDelete(showId);
    res.send({
      success: true,
      message: "The show has been deleted!",
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const updateShow = async (req, res, next) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "The show has been updated!",
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const getAllShowsByTheatre = async (req, res, next) => {
  try {
    const theatreId = req.params.theatreId;
    const shows = await Show.find({ theatre: theatreId }).populate("movie");
    res.send({
      success: true,
      message: "All shows are fetched",
      data: shows,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const getAllTheatresByMovie = async (req, res, next) => {
  try {
    const { movie, date } = req.body;
    const shows = await Show.find({ movie, date }).populate("theatre");
    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id === show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    res.send({
      success: true,
      message: "All Theatres are fetched",
      data: uniqueTheatres,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const getShowById = async (req, res, next) => {
  try {
    const shows = await Show.findById(req.params.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "All shows are fetched",
      data: shows,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

module.exports = {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
};
