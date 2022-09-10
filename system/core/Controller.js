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
    _redirect = async (req, res, url) => {
        const temp = this._simpleStringify(res.locals.profiler);
        req.session.profiler = temp;
        await res.redirect(url);
    };
    _targetProfiler = (req, res) => {
        const temp = this._simpleStringify(req.session.profiler);
        res.locals.profiler = temp;
        delete req.session.profiler;
    };
    /* Future implementation for profiler */
    // _ajax = async (req, res) => {
    //     const temp = this._simpleStringify(res.locals.profiler);
    //     req.session.profiler = temp;
    // };
    /* stringify an object, avoiding circular structure by Markad */
    _simpleStringify = (object) => {
        var simpleObject = {};
        for (var prop in object) {
            if (!object.hasOwnProperty(prop)) {
                continue;
            }
            if (typeof object[prop] == "object") {
                continue;
            }
            if (typeof object[prop] == "function") {
                continue;
            }
            simpleObject[prop] = object[prop];
        }
        return JSON.stringify(simpleObject); // returns cleaned up JSON
    };
}

module.exports = Controller;
