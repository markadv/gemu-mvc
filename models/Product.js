const Model = require("../system/core/Model");
module.exports = class Product extends Model {
    constructor() {
        super();
    }
    getProducts = async (res) => {
        await this.connectToDatabase();
        const query = await this.qb.select().get("products");
        const [rows, field] = await this.query(res, query);
        return rows;
    };
};
