// login and register
const express = require("express");
const router = express.Router();
// 引入数据库
const user = require("../../models/user.js")


// @route GET api/users/test
// @desc 返回请求的JSON数据
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: "login working!"
    });
})

// @route GET api/users/register
// @desc 返回请求的JSON数据
// @access public
router.post('/register', (req, res) => {
    console.log(req.body)
    user.findOne({
        name: req.body.email
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                email: "email had been registered !"
            })
        } else {
            const newUser = new user({
                name: req.body.name,
                email: req.body.email,
                // avatar,
                password: req.body.password
            })
        }
    })
})
module.exports = router