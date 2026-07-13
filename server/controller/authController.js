const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePass = async (password, hashedPass) => {
    return await bcrypt.compare(password, hashedPass);
};

exports.signUp = async(req, res) =>{
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body;

      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields",
        });
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password doesn't match",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }

      const hashedPass = await hashPass(password);

      const profilePic = {
        url: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff`,
        publicId: "",
      };
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPass,
        profilePic,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        newUser: newUser,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "email already exists",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
}

exports.logIn = async (req, res) => {
    try {
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Fill all the required fields",
            })
        }

        const isUserRegistered = await User.findOne({  email  });
        if(!isUserRegistered){
            return res.status(404).json({
                success : false,
                message : "User not registered"
            })
        }

        const isPassCorrect = await bcrypt.compare(password, isUserRegistered.password);
        if(isPassCorrect){
            
            const payload = {
                email : email,
                userId : isUserRegistered._id,
            }
            const token = jwt.sign(payload,process.env.JWT_secret,{
                expiresIn : "30d",
            })
            
            const userDetails = isUserRegistered.toObject();
            delete userDetails.password;
            return res.status(200).json({
                success : true,
                message : "User logged in",
                token : token,
                userDetails : userDetails
            })
            
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Wrong password"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal server error",
        })
    }
}

exports.getAllusers = async (req, res) => {
    try {
        const userId = req.user.userId;
        if(!userId){
            return res.status(400).json({
                success : false,
                message : "Something went wrong fetching",
            })
        }

        const Allusers = await User.find({_id : {$ne:userId}}).select("-password");

        return res.status(200).json({
            success : true,
            message : "Successfully fetched all users",
            Allusers,
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "internal server error",
        });
    }
}