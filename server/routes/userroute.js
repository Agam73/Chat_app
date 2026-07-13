const express = require("express");
const router = express.Router();
const {  checkAuth  } = require("../middleware/auth");

const { changeProfilePic } = require("../controller/userController");
const upload = require("../middleware/multer");

router.post("/change-profile-pic", checkAuth, upload.single("profilePic"), changeProfilePic)

module.exports = router;