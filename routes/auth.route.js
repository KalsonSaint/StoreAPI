const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

const { register, login } = AuthController;

router.post("/signup", register);
router.post("/signin", login);

module.exports = router;
