// login and register
const express = require("express");
const router = express.Router();
// 引入数据库
const userModel = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jsonWebToken = require("jsonwebtoken");
const passport = require("passport");



// @route GET api/users/test
// @desc 返回请求的JSON数据
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: " test"
    });
})

// @route POST api/users/register
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
            var avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                avatar,
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

// @route POST api/users/register
// @desc 返回请求的token jwt passport
// @access public
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.findOne({
        email
    }).then(result => {
        if (!result) {
            return res.status(404).json({
                email: "用户不存在！"
            })
        }

        // 密码匹配
        bcrypt.compare(password, result.password).then(compareResult => {
            if (compareResult) {
                // jsonWebToken.sign("规则", "加密名字", "过期时间", "箭头函数")
                const rule = {
                    id: result.id,
                    name: result.name
                }
                jsonWebToken.sign(rule, "secret", {
                    expiresIn: 3600
                }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        msg: "success",
                        token: token
                    })
                })
            } else {
                return res.status(400).json({
                    password: "密码错误"
                })
            }
        })

    })
})

// @route get api/users/current
// @desc return current user
// @access private
// router.get('/current', passport.authenticate("jwt", {
//     session: false
// }), (req, res) => {
//     res.json({
//         mas: "success"
//     })
// })



module.exports = router