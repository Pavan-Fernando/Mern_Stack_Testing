const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// const dbURL = process.env.MONGODB_URL;
const dbURL = "mongodb+srv://vhg:vhg@mernstack.m4exv8d.mongodb.net/MernStack?retryWrites=true&w=majority";

mongoose.connect(dbURL, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
});
 
const connction = mongoose.connection;
connction.once("open", () => {
    console.log("MongoDB Connected!");
});

const studentRouter = require("./routes/Students.js");
app.use("/student", studentRouter);

app.listen(PORT, ()=>{
    console.log(`Server is stated at http://localhost:${PORT}`);
});
