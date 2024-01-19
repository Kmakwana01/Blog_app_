let USER = require('../model/user')
let jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
  try {
    // console.log(req.headers)

    const {token} = req?.headers
    // console.log(token)

    if (!token) throw new Error('Please atteched Token')
    // console.log('enter')
   
    let user = await jwt.verify(token, process.env.SECRET_KEY);

    if(!user) throw new Error('Not Valid Token')

    let validUser = await USER.findById(user.id)

    if(!validUser) throw new Error('nott valid user')

    next()

  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Not Valid Token'
    })
  }
}