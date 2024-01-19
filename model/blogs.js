let mongoose = require("mongoose")

let User = new mongoose.Schema({
    title : String,
    image : String,
    description : String,
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

module.exports = mongoose.model("Blogs",User)