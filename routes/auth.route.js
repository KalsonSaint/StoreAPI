const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const auth = require("../middlewares/authjwt");

const { register, login } = AuthController;

router.post("/signup", auth, register);
router.post("/signin", login);

module.exports = router;
