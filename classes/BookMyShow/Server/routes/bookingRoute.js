const { makePayment, bookShow } = require("../controllers/bookingController");

const router = require("express").Router();

router.post("/makePayment", makePayment);
router.post("/bookShow", bookShow);

module.exports = router;
