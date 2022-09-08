const QueryBuilder = require("./QueryBuilder.js");
const helper = require("../helper/helper");

module.exports = class Model {
    constructor() {
        this.mysql = require("mysql2/promise");
        this.db = require("../../config").database;
        this.connection;
        this.qb = new QueryBuilder();
        this.helper = helper;
        this.bcrypt = require("bcryptjs");
    }
    getAll = async (table) => {
        await this.connectToDatabase();
        const [rows, fields] = await this.connection.execute(this.qb.select().get(table));
        return rows;
    };
    connectToDatabase = async () => {
        this.connection = await this.mysql.createConnection(this.db);
    };
};
