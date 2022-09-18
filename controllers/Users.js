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
        // if (typeof req.session.user !== undefined) {
        //     this._redirect("/register");
        // } else
        this._redirect(req, res, "/signin");
    };
    signin = async (req, res) => {
        this._flashData(req, res);
        await this._view(req, res, {
            title: "Signin",
            content: "Users/signin",
            data: { stylesheet: "signin.css" },
        });
    };
    register = async (req, res) => {
        this._flashData(req, res);
        await this._view(req, res, {
            title: "Register",
            content: "Users/register",
            data: { stylesheet: "register.css" },
        });
    };
    process_registration = async (req, res) => {
        /* Guard clause to prevent direct access from user */
        if (Object.keys(req.body).length <= 0) {
            this._redirect(req, res, "/register");
            return;
        }
        let result = await this.#User.validateRegister(req.body, res);
        if (result.type === "error") {
            this._flash(req, result);
            await this._redirect(req, res, "/register");
        } else {
            this._flash(req, result);
            req.session.data = result.data;
            await this._redirect(req, res, "/success");
        }
    };
    process_signin = async (req, res) => {
        /* Guard clause to prevent direct access from user */
        if (Object.keys(req.body).length <= 0) {
            this._redirect(req, res, "/");
            return;
        }
        let result = await this.#User.validateSignin(req.body, res);
        if (result.type === "error") {
            this._flash(req, result);
            // await this._redirect(req, res, "/");
        } else {
            this._flash(req, result);
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
    };
    logoff = async (req, res) => {
        delete req.session.data;
        this._redirect(req, res, "/");
    };
};
