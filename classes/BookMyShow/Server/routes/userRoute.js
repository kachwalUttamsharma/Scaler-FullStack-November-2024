const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/UserController");
const { validateJWTToken } = require("../middlewares/authorizationMiddleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getCurrentUser", validateJWTToken, currentUser);

module.exports = router;
