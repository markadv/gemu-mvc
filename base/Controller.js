class Controller {
    constructor() {}
    async view(res, route, data = {}) {
        res.render(route, data);
    }
}

module.exports = Controller;
