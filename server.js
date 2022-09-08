/* Gemu MVC server by Markad */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./config").session;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig));

// setting up ejs and our views folder
app.set("view engine", "ejs");
app.use("/", require("./routes"));

const port = process.env.PORT || 8888;
// tell the express app to listen on port
app.listen(port, function () {
    console.log(`listening on port ${port}`);
});
