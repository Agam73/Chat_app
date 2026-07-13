const express = require('express');
const dbconnect = require('./config/dbconfig');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRoute = require("./routes/routes");
const messageRoute = require("./routes/message_route");
const cors = require("cors");
const userRoute = require("./routes/userroute")
const { app, server } = require('./socket/socket');

app.use(express.json());
app.use(cors());
app.use("/api/v1", authRoute);
app.use("/api/v1", messageRoute);
app.use("/api/v1", userRoute);

dbconnect();

server.listen(PORT,()=>{
     console.log("Server is running");
});