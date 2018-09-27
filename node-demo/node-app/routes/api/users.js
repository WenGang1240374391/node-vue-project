// login and register
const express = require("express");
const router = express.Router();
router.get('/test', (req, res) => {
    res.json({
        msg: "login working!"
    })
})
module.exports = router