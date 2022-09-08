const { application } = require("express");

class Controller {
    constructor() {}
    async view(res, route, data = {}) {
        res.render(route, data);
    }
    flashData = (req, res) => {
        res.locals.sessionFlash = req.session.sessionFlash;
        delete req.session.sessionFlash;
    };
    flash = (req, message) => {
        req.session.sessionFlash = message;
    };
}

module.exports = Controller;
