let mongoose = require("mongoose")

let category = new mongoose.Schema({
    name : String,
    colorcode : String
})

module.exports = mongoose.model("Category",category)