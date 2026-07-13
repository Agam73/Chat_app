const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    members : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        }
    ],
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message",
            default : [],
        }
    ]
},{timestamps : true});

module.exports = mongoose.model("Chats", chatSchema);