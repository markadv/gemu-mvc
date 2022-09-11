const Controller = require("../system/core/Controller");
const Template = require("../models/Template");

module.exports = class Templates extends Controller {
    /* For model, you have to declare this as private to prevent
    it from showing in routes. Replace with protected class
    as soon as available */
    #Template;
    constructor() {
        super();
        this.#Template = new Template();
    }
    index = async (req, res) => {
        await this._view(req, res, { title: "Templates", content: "", data: {} });
    };
    test = async (req, res) => {
        this._redirect(req, res, "/Templates/index");
    };
};
