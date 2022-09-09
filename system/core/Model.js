const QueryBuilder = require("./QueryBuilder.js");
const helper = require("../helper/helper");
module.exports = class Model {
    constructor() {
        this.mysql = require("mysql2/promise");
        this.db = require("../../config").database;
        this.pool = require("../../config").pool;
        this.connection;
        this.qb = new QueryBuilder();
        this.helper = helper;
        this.bcrypt = require("bcryptjs");
    }
    connectToDatabase = async () => {
        try {
            this.connection = await this.mysql.createConnection(this.db);
        } catch (error) {
            return console.log(`Could not connect - ${error}`);
        }
    };
    connectToPool = async () => {
        try {
            if (this.connection) {
                return;
            }
            let pool = this.mysql.createPool(this.pool);
            this.connection = pool;
        } catch (error) {
            return console.log(`Could not connect - ${error}`);
        }
    };
    queryFormat = (query, values = "") => {
        return this.mysql.format(query, values);
    };
    profiler = async (res, query) => {
        if (res.locals.profiler !== undefined) {
            console.log("test");
            res.locals.profiler["query"] === undefined
                ? (res.locals.profiler["query"] = [query])
                : res.locals.profiler["query"].push(query);
            console.log(res.locals.profiler["query"]);
        }
    };
    query = async (res, query, values = [""]) => {
        const sql = this.queryFormat(query, values);
        this.profiler(res, sql);
        const results = await this.connection.query(sql);
        return results;
    };
};
