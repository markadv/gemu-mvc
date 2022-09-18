class Controller {
    constructor() {}
    _view = async (req, res, view = {}) => {
        res.render("default.ejs", view);
    };
    _flashData = (req, res) => {
        res.locals.sessionFlash = req.session.sessionFlash;
        delete req.session.sessionFlash;
    };
    _flash = (req, data) => {
        req.session.sessionFlash = data;
    };
    _redirect = async (req, res, url) => {
        if (typeof res.locals.profiler !== undefined) {
            const temp = JSON.stringify(res.locals.profiler);
            req.session.profiler = temp;
        }
        await res.redirect(url);
    };
    /* Future implementation for profiler */
    // _ajax = async (req, res) => {
    //     const temp = this._simpleStringify(res.locals.profiler);
    //     req.session.profiler = temp;
    // };
    /* stringify an object, avoiding circular structure by Markad */
}

module.exports = Controller;
