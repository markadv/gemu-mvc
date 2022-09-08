const Controller = require("../system/core/Controller");
const User = require("../models/User");

module.exports = class Users extends Controller {
    /* For model, you have to declare this as private to prevent
    it from showing in routes. Replace with protected class
    as soon as available */
    #User;
    constructor() {
        super();
        this.#User = new User();
    }
    index = async (req, res) => {
        this.flashData(req, res);
        if (req.session.data) {
            res.redirect("/success");
        }
        await this.view(res, "Users/index");
    };
    process_registration = async (req, res) => {
        /* Guard clause to prevent direct access from user */
        if (req.body.register !== "Register") {
            res.redirect("/");
            return;
        }
        let result = await this.#User.validateRegister(req.body);
        if (result.type === "error") {
            this.flash(req, result.message);
            res.redirect("/");
        } else {
            this.flash(req, result.message);
            req.session.data = result.data;
            res.redirect("/success");
        }
    };
    process_login = async (req, res) => {
        /* Guard clause to prevent direct access from user */
        if (req.body.login !== "Log in") {
            res.redirect("/");
            return;
        }
        let result = await this.#User.validateLogin(req.body);
        console.log(result);
        if (result.type === "error") {
            this.flash(req, result.message);
            res.redirect("/");
        } else {
            this.flash(req, result.message);
            req.session.data = result.data;
            res.redirect("/success");
        }
    };
    success = async (req, res) => {
        if (!req.session.data) {
            res.redirect("/");
            return;
        }
        console.log(req.session.data);
        await this.view(res, "Users/success", req.session.data);
    };
    logoff = async (req, res) => {
        delete req.session.data;
        res.redirect("/");
    };
};
