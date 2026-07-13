const jwt = require("jsonwebtoken");

exports.checkAuth = async (req, res, next)=>{
    try {
        const token = req.headers.authorization;

        if(!token || !token.startsWith("Bearer ")){
            res.status(401).json({
                success : false,
                message : "Token missing or malformed"
            })
        }
        // space splits into two 0th index is bearer and 1 is token;
        const actualToken = token.split(" ")[1];
        const decoded = jwt.verify(actualToken, process.env.JWT_secret);
        req.user = decoded;
        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : "Invalid or expired token",
        })
    }
}
