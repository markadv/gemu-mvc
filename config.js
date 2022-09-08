module.exports = {
    /* Developer defined routes */
    routes: {
        "/Users/index": "/",
        "/Users/process_registration": "/process/register",
        "/Users/process_login": "/process/login",
        "/Users/success": "/success",
        "/Users/logoff": "/logoff",
    },
    /* Database credentials (to be exported to .env) */
    database: { host: "localhost", port: 3308, user: "root", password: "", database: "gemu_mvc" },
    /* Session information */
    session: { secret: "gemu_mvc", resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } },
};
