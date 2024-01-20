let BLOG = require("../model/blogs")

exports.add = async (req, res) => {
    try {
        if (req.files.image[0]?.filename) {
            req.body.image = req.files.image[0].filename
        }

        if(!req.body.title || !req.body.image || !req.body.description || !req.body.category || !req.body.user){
            throw new Error("please enter valid data")
        }

        let data = await BLOG.create(req.body)

        if(!data) {
            throw new Error("please enter valid data")
        }
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message : error.message
        })
    }
}

exports.show = async (req, res) => {
    try {
        let data = await BLOG.find().populate("category").populate("user")
        if (!data) {
            throw new Error("please enter valid id")
        }
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message : error.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        if (req.files.image[0].filename) {
            req.body.image = req.files.image[0].filename
        }
        let data = await BLOG.findByIdAndUpdate(req.query.id,req.body,{new : true})

        if (!data) {
            throw new Error("please enter valid id")
        }
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message : error.message
        })
    }
}

exports.delete = async (req, res) => {
    try {
        if(!req.query.id) throw new Error('please enter id')

        let data = await BLOG.findByIdAndDelete(req.query.id)

        if (!data) {
            throw new Error("please enter valid id")
        }
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message : error.message
        })
    }
}