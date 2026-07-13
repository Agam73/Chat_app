
const express = require("express");
const router = express.Router();
const {  checkAuth  } = require("../middleware/auth")
const {signUp, logIn, getAllusers} = require("../controller/authController");

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.get("/getAllusers",checkAuth, getAllusers);

module.exports = router