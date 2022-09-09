class Controller {
    constructor() {}
    _view = async (res, view = {}) => {
        res.render("default.ejs", view);
    };
    _flashData = async (req, res) => {
        res.locals.sessionFlash = req.session.sessionFlash;
        delete req.session.sessionFlash;
    };
    _flash = async (req, message) => {
        req.session.sessionFlash = message;
    };
}

module.exports = Controller;
