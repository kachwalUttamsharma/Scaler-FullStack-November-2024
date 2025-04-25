const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
} = require("../controllers/movieController");

const router = require("express").Router();

router.post("/addMovie", addMovie);
router.get("/getAllMovies", getAllMovies);
router.patch("/updateMovie", updateMovie);
router.delete("/deleteMovie/:movieId", deleteMovie);
router.get("/movie/:id", getMovieById);

module.exports = router;
