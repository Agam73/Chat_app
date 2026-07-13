const express = require("express");
const router = express.Router();

const {  checkAuth  } = require("../middleware/auth");
const {SendMessage, getAllMessages} = require("../controller/messageController");

router.post("/send-Message", checkAuth, SendMessage);
router.get("/get-all-messages/:chatUserId", checkAuth, getAllMessages);


module.exports = router;
