let mongoose = require("mongoose")

let User = new mongoose.Schema({
    username : {
        type : String,
        unique: true
    },
    email :{
        type : String,
        unique : true
    },
    password : String,
})

module.exports = mongoose.model("User",User)