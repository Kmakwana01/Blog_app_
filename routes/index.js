var express = require('express');
var router = express.Router();
let UserRouter = require("../controller/User")
let CategoryRouter = require("../controller/Category")
let BlogsRouter = require("../controller/Blogs")
let upload = require('../multer/multer');
const { isAuthenticated } = require('../middleware/isAuthentication');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// user routers
router.post("/api/user/signup",UserRouter.signup)
router.post("/api/user/login",UserRouter.login)

// categori routers

router.post("/api/category/add",isAuthenticated,CategoryRouter.add)
router.get("/api/category/show",isAuthenticated,CategoryRouter.show)
router.patch("/api/category/update",isAuthenticated,CategoryRouter.update)
router.delete("/api/category/delete",isAuthenticated,CategoryRouter.delete)

// blogs routers

router.post("/api/blog/add",isAuthenticated,upload.fields([{name:"image",maxCount:1}]),BlogsRouter.add)
router.get("/api/blog/show",isAuthenticated,BlogsRouter.show)
router.patch("/api/blog/update",isAuthenticated,upload.fields([{name:"image",maxCount:1}]),BlogsRouter.update)
router.delete("/api/blog/delete",isAuthenticated,BlogsRouter.delete)

module.exports = router;
