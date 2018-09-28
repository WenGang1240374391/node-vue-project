// login and register
const express = require("express");
const router = express.Router();
// 引入数据库
const userModel = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const gavatar = require("gravatar");


// @route GET api/users/test
// @desc 返回请求的JSON数据
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: " test"
    });
})

// @route GET api/users/register
// @desc 返回请求的JSON数据
// @access public
router.post('/register', (req, res) => {
    userModel.findOne({
        email: req.body.email
    }).then((result) => {
        if (result) {
            return res.status(400).json({
                email: "email had been registered !"
            })
        } else {
            var newUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                // avatar,
                password: req.body.password
            })
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    // Store hash in your password DB. 
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then((newUser) => {
                        res.json(newUser);
                        console.log("插入数据库成功")
                    }).catch((err) => {
                        throw err;
                    })
                });
            });
        }
    })
})
module.exports = router