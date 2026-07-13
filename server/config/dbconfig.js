const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() =>{
        console.log("DB connnected");
    })
    .catch((err)=>{
        console.log("DB connection failed",err.message);
        process.exit(1);
    })
}
module.exports = dbconnect;