const Controller = require("../system/core/Controller");
const Product = require("../models/Product");

module.exports = class Products extends Controller {
    /* For model, you have to declare this as private to prevent
    it from showing in routes. Replace with protected class
    as soon as available */
    #Product;
    constructor() {
        super();
        this.#Product = new Product();
    }
    index = async (req, res) => {
        let result = await this.#Product.getProducts(res);
        console.log(result);
        await this._view(req, res, {
            title: "Products",
            content: "Products/dashboard",
            data: { stylesheet: "dashboard.css", user: req.session.data, result: result },
        });
    };
    test = async (req, res) => {
        this._redirect(req, res, "/Products/index");
    };
};
