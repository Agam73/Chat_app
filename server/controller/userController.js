const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/uploadtocloudinary");
const User = require("../models/user_model");

exports.changeProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete old image if it exists
        if (user.profilePic.publicId) {
            await cloudinary.uploader.destroy(user.profilePic.publicId);
        }

        // Upload new image
        const result = await uploadToCloudinary(req.file.buffer);

        // Update user
        user.profilePic = {
            url: result.secure_url,
            publicId: result.public_id,
        };

        await user.save();

        const updatedUser = await User.findById(req.user.userId).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};