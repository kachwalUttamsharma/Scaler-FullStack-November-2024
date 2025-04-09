const { registerUser, loginUser } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
