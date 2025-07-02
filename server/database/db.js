const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI

const db = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Mongo DB connected successfully");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {db}