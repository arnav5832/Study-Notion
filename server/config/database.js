const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("db connect successfull"))
    .catch((error) =>{
        console.log("db connection failure");
        console.error(error);
        process.exit(1);
    })
}