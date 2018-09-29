const express = require("express");
const router = express.Router();
// 引入数据库
const profileModel = require("../../models/profile.js");
const passport = require("passport");


// @route GET api/profiles/test
// @desc 返回请求的JSON数据
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: " profile working"
    });
})

// @route GET api/profiles/add
// @desc 返回请求的JSON数据
// @access private
router.post("/add", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const profileRields = {};
    if (req.body.type) profileRields.type = req.body.type;
    if (req.body.describe) profileRields.describe = req.body.describe;
    if (req.body.income) profileRields.income = req.body.income;
    if (req.body.remark) profileRields.remark = req.body.remark;
    if (req.body.expend) profileRields.expend = req.body.expend;
    if (req.body.cash) profileRields.cash = req.body.cash;
    new profileModel(profileRields).save().then(profile => {
        res.json(profile);
        console.log("profile插入成功！")
    })
})

// @route GET api/profiles
// @desc 返回请求的JSON数据
// @access private
router.get("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    profileModel.find().then(result => {
        if (!result) {
            res.json("内容为空！");
        } else {
            res.json(result)
        }
    }).catch(err => {
        throw err;
    })
})

// @route GET api/profiles/:id
// @desc 返回请求的JSON数据
// @access private
router.get("/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    profileModel.find({
        _id: req.params.id
    }).then(result => {
        if (!result) {
            res.status(404).json("未找到该_id信息")
        }
        res.json({
            id: req.params.id,
            result: result
        })
    }).catch(err => res.status(404).json("未找到该_id信息"))
})


module.exports = router