const express = require('express');
const mongoose = require('mongoose');
const app = express();

//DB config
const db = require("./config/keys.js").mongoURI;
// connect to mongodb
mongoose.connect(db).then(() => {
    console.log('mongoDB node-vue-project link success!');
}).catch((err) => {
    console.log("mongoDB node-vue-project link failed!");
    console.log(err)
})

// link routes user.js
const users = require("./routes/api/users");

// use routes
app.use("/api/users", users)
app.get('/', (req, res) => {
    res.send('hello !');
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}/` + "\n");
});
//