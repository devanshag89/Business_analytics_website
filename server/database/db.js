const mongoose = require("mongoose");

const db = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/DataVision");
        console.log("Mongo DB connected successfully");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = db