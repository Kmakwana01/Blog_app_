let USER = require("../model/user")
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

exports.signup = async (req, res) => {
    try {
        if(req.body.password) req.body.password = await bcrypt.hash(req.body.password,9)
        
        const {username , email,password} = req.body
        
        if(!username || !email || !password) throw new Error('please enter valid fields')
        
        let user = await USER.create(req.body)
        
        if (!user) {
            throw new Error("please enter valid data")
        }
        
        console.log(process.env.SECRET_KEY,user)
        let token = jwt.sign({id : user.id },process.env.SECRET_KEY)

        console.log(token,user);

        res.status(200).json({
            status: "success",
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message : error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {username , email ,password} = req.body

        let user = await USER.findOne({$or: [{email,username}]})

        if(!user) throw new Error('please enter valid data')

        let checkUser = await bcrypt.compare(password,user.password)

        if(!checkUser) throw new Error('please enter valid password')
        
        let token = jwt.sign({id : user.id },process.env.SECRET_KEY)

        console.log(user);    


        res.status(200).json({
            status: "success",
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message : error.message
        })
    }
}
// exports.update = async (req, res) => {
//     try {
//         if(!req.query.id) throw new Error('please enter id')

//         let data = await USER.findByIdAndUpdate(req.query.id,req.body,{new : true})

//         if (!data) {
//             throw new Error("please enter valid id")
//         }
//         res.status(200).json({
//             status: "success",
//             message : "updated data",
//             data: data
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message : error.message
//         })
//     }
// }

// exports.delete = async (req, res) => {
//     try {

//         if(!req.query.id) throw new Error('please enter id')

//         let data = await USER.findByIdAndDelete(req.query.id)

//         if (!data) {
//             throw new Error("please enter valid id")
//         }
//         res.status(200).json({
//             status: "success",
//             message : 'deleted data',
//             data: data
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message : error.message
//         })
//     }
// }