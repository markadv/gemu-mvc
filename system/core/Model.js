const QueryBuilder = require("./QueryBuilder.js");
const helper = require("../helper/helper");
module.exports = class Model {
    constructor() {
        this.config = require("./config");
        /* Preload all the database lib to prevent bottlenecks by Markad */
        this.mysql = require("mysql2/promise");
        this.pg = require("pg-promise");
        this.dbdriver;
        this.db = this.config.database1;
        this.db2 = this.config.database2;
        this.connection;
        this.qb = new QueryBuilder();
        this.helper = helper;
        this.bcrypt = require("bcryptjs");
    }
    setDbdriver = async () => {
        if (this.config.dbdriver === "mysql") {
            this.dbdriver = this.mysql;
        } else if (this.config.dbdriver === "pg") {
            const pgp = this.pg();
            this.dbdriver = pgp(this.db);
        }
    };
    createPool = async () => {
        if (this.config.dbdriver === "mysql") {
            return this.dbdriver.createPool(this.db2);
        } else if (this.config.dbdriver === "pg") {
            return this.dbdriver;
        }
    };
    connectToDatabase = async () => {
        try {
            if (this.connection) {
                return;
            }
            await this.setDbdriver();
            let pool = await this.createPool();
            this.connection = pool;
        } catch (error) {
            return console.log(`Could not connect - ${error}`);
        }
    };
    queryFormat = async (query, values) => {
        if (this.config.dbdriver === "mysql") {
            return await this.dbdriver.format(query, values);
        } else if (this.config.dbdriver === "pg") {
            return await this.pg.as.format(query, values);
        }
    };
    profiler = async (res, query) => {
        if (res.locals.profiler !== undefined) {
            res.locals.profiler["query"] === undefined
                ? (res.locals.profiler["query"] = [query])
                : res.locals.profiler["query"].push(query);
        }
    };
    query = async (res, query, values = "") => {
        const queryFormatted = await this.queryFormat(query, values);
        await this.profiler(res, queryFormatted);
        const results = await this.connection.query(query, values);
        return results;
    };
};
