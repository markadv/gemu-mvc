module.exports = {
    enableProfiler: true,
    localPort: 8888,
    /* Developer defined routes */
    routes: {
        "/Athletes/index": "/",
        "/Athletes/index_html": "/process",
    },
    /* Database credentials (to be exported to .env)
    MYSQL */
    database: { host: "localhost", port: 3308, user: "root", password: "", database: "sports_players_db" },
    pool: {
        host: "localhost",
        port: 3308,
        user: "root",
        password: "",
        database: "sports_players_db",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    },
    /* Session information */
    sessionConfig: { secret: "gemu_mvc", resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } },
};
