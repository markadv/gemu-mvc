const QueryBuilder = require("../base/QueryBuilder.js");

module.exports = class Model {
    constructor() {
        this.mysql = require("mysql2/promise");
        this.db = require("../config").connection;
        this.connection;
        this.qb = new QueryBuilder();
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
