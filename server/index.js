require("dotenv").config();
const db = require("./database/db");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;





app.listen(PORT,() => {
    db();
    console.log("Sever is listening on port 5000");
})