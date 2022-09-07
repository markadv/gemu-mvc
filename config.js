module.exports = {
    /* Developer defined routes */
    routes: { "/Cars/index": "/" },
    /* Database credentials (to be exported to .env) */
    connection: { host: "localhost", port: 3308, user: "root", password: "", database: "gemu_mvc" },
    /* Session information */
    session: { secret: "gemu_mvc", resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } },
};
