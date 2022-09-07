const Controller = require("../base/Controller");
const Car = require("../models/Car");

module.exports = class Cars extends Controller {
    /* For model, you have to declare this as private to prevent
    it from showing in routes. Replace with protected class
    as soon as available */
    #Car;
    constructor() {
        super();
        this.#Car = new Car();
    }
    index = async (req, res) => {
        let cars = await this.#Car.getAll("cars");
        let data = {};
        data["table"] = cars;
        req.session.count ? req.session.count++ : (req.session.count = 1);
        data["count"] = req.session.count;
        this.view(res, "Cars/index", data);
    };
};
