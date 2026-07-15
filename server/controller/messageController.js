const Message = require("../models/message_model");
const Chat = require("../models/conversation_model");
const User = require("../models/user_model");
const { getreceiverSocketId, io } = require("../socket/socket");

//create a new message
exports.SendMessage = async (req, res) => {
    try {
        const {receiverId, message, clientSentAt} = req.body;
        const senderId = req.user.userId;

        if(!receiverId || !message || !senderId){
            return res.status(400).json({
                success : false,
                message : "Couldn't fetch data properly",
            })
        }

        let chat = await Chat.findOne({ 
            members : {$all : [senderId, receiverId]}
        });

        if(!chat){
            chat = await Chat.create({
                members : [senderId, receiverId]
            })
        }
        
        const newMessage = new Message({
             senderId : senderId,
             receiverId : receiverId,
             message,
        });

        if(newMessage){
            chat.messages.push(newMessage._id);
        }
        await Promise.all([chat.save(), newMessage.save()]);

        const receiverSocketId = getreceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("new-message", {
                ...newMessage.toObject(),
                clientSentAt: req.body.clientSentAt
            });
        }
        
        return res.status(201).json({
            success : true,
            message : "Message sent successfully",
            newMessage,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal system error"
        })
        
    }
}
exports.getAllMessages = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        const chatUserId = req.params.chatUserId;

        if(!chatUserId || !currentUserId){
            return res.status(400).json({
                success: false,
                message : "Couldn't fetch user id"
            });
        }

        const chatUserDetails = await User.findById(chatUserId);

        if(!chatUserDetails){
            return res.status(404).json({
                success: true,
                message : "User not found",
            })
        };

        const allMessages = await Chat.findOne({
            members : {$all : [currentUserId, chatUserId]},
        }).populate("messages").populate("members", "-password").exec();

        return res.status(200).json({
            success : true,
            message : "Successfully fetched messages",
            allMessages : allMessages ? allMessages.messages : [],
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        });
        
    }
}