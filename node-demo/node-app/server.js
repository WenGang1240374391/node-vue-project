const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
// require("./config/passport.js")(passport);

// link routes user.js
const users = require("./routes/api/users");
const app = express();

//DB config
const db = require("./config/keys.js").mongoURI;
// connect to mongodb
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log('\nmongoDB node-vue-project link success!\n');
}).catch((err) => {
    console.log("\nmongoDB node-vue-project link failed!\n");
})

// passport初始化
app.use(passport.initialize())



// use bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// use routes
app.use("/api/users", users)
app.get('/', (req, res) => {
    res.send('hello !');
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}/` + "\n");
});
//