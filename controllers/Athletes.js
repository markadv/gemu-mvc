const Controller = require("../system/core/Controller");
const Athlete = require("../models/Athlete");

module.exports = class Athletes extends Controller {
    /* For model, you have to declare this as private to prevent
    it from showing in routes. Replace with protected class
    as soon as available */
    #Athlete;
    constructor() {
        super();
        this.#Athlete = new Athlete();
    }
    index = async (req, res) => {
        await this._view(res, { title: "Athletes", content: "Athletes/index", data: {} });
    };
    index_html = async (req, res) => {
        if (!req.body) {
            res.redirect("/");
            return;
        }
        let params = { name: req.body.name, gender: [], sports: [] };
        if (req.body.male === "on") {
            params.gender.push("male");
        }
        if (req.body.female === "on") {
            params.gender.push("female");
        }
        if (req.body.basketball === "on") {
            params.sports.push("basketball");
        }
        if (req.body.volleyball === "on") {
            params.sports.push("volleyball");
        }
        if (req.body.baseball === "on") {
            params.sports.push("baseball");
        }
        if (req.body.football === "on") {
            params.sports.push("football");
        }
        if (req.body.american_football === "on") {
            params.sports.push("american_football");
        }
        if (req.body.lacrosse === "on") {
            params.sports.push("lacrosse");
        }
        if (req.body.golf === "on") {
            params.sports.push("golf");
        }
        if (req.body.track_and_field === "on") {
            params.sports.push("track_and_field");
        }
        let results = await this.#Athlete.getAthletesByParameter(res, params);
        await res.render("Athletes/index_html", { data: results });
    };
};
