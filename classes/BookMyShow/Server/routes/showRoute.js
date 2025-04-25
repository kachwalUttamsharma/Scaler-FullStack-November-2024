const {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
} = require("../controllers/showController");

const router = require("express").Router();

router.post("/addShow", addShow);
router.delete("/deleteShow/:showId", deleteShow);
router.patch("/updateShow", updateShow);
router.get("/getAllShowsByTheatre/:theatreId", getAllShowsByTheatre);
router.post("/getAllTheatresByMovie", getAllTheatresByMovie);
router.get("/getShowById/:showId", getShowById);

module.exports = router;
