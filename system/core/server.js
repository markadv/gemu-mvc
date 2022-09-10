module.exports = (async () => {
    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");
    const session = require("express-session");
    const config = require("../../config");
    const { routes, sessionConfig, enableProfiler, localPort } = config;
    const { getObjKey } = require("../helper/helper");
    const path = require("path");

    // support parsing of application/json type post data
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session(sessionConfig));
    // setting up ejs and our views folder
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "..", "..", "assets")));

    profiler = (req, res, next) => {
        /* Get class method from the new routes */
        const startTime = performance.now();
        const classMethod = getObjKey(routes, req.url);
        /* Get memory used */
        const used = process.memoryUsage().rss / 1024 / 1024;
        const mbUsed = Math.round(used * 100) / 100;
        res.locals.profiler = {
            getparams: req.params,
            getquery: req.query,
            post: req.body,
            memoryUsage: mbUsed,
            httpHeader: req.headers,
            session: req.session,
            route: { classMethod: classMethod, url: req.url },
            config: config,
        };
        const endTime = performance.now();
        let timeExec = Math.round((endTime - startTime) * 1000) / 1000;
        res.locals.profiler["performance"] = timeExec;
        next();
    };

    if (enableProfiler) {
        app.use(profiler);
    }

    app.use("/", require("./routes"));
    const port = process.env.PORT || localPort;
    // tell the express app to listen on port
    app.listen(port, function () {
        console.log(`listening on port ${port}`);
    });
})();