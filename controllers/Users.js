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
        this._flashData(req, res);
        if (req.session.data) {
            res.redirect("/success");
        }
        // await this.view(res, "Users/index");
        await this._view(req, res, { title: "Login/Register", content: "Users/index", data: {} });
    };
    process_registration = async (req, res) => {
        /* Guard clause to prevent direct access from user */
        if (req.body.register !== "Register") {
            this._redirect(req, res, "/");
            return;
        }
        let result = await this.#User.validateRegister(req.body, res);
        if (result.type === "error") {
            this._flash(req, result.message);
            await this._redirect(req, res, "/");
        } else {
            this._flash(req, result.message);
            req.session.data = result.data;
            await this._redirect(req, res, "/success");
        }
    };
    process_login = async (req, res) => {
        /* Guard clause to prevent direct access from user */
        if (req.body.login !== "Log in") {
            this._redirect(req, res, "/");
            return;
        }
        let result = await this.#User.validateLogin(req.body, res);
        if (result.type === "error") {
            this._flash(req, result.message);
            await this._redirect(req, res, "/");
        } else {
            this._flash(req, result.message);
            req.session.data = result.data;
            await this._redirect(req, res, "/success");
        }
    };
    success = async (req, res) => {
        if (!req.session.data) {
            this._redirect(req, res, "/");
            return;
        }
        await this._view(req, res, { title: "Success", content: "Users/success", data: req.session.data });
        // await this._view(res, "Users/success", req.session.data);
    };
    logoff = async (req, res) => {
        delete req.session.data;
        this._redirect(req, res, "/");
    };
};
