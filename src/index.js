import midd from "./middleware";
//_w : way
//_ro : route
//_rs : routes
//_rs_mds : routes_middleswares
export default class {
    constructor($callback, customRouteCase) {
        this.customRouteCase = customRouteCase
        this._rs_mds = [];
        this.ROUTES = [];
        //callback with this object
        $callback.call(this);
    }


    middleware({ router, middlewares }) {
        new midd({ router, middlewares, route: this })
        return this
    }
    /**
     * assignment all routes to attribut _ro 
     * 
     * @param {Array} _rs 
     * @param {String} middleware 
     */
    route(_rs, middleware) {
        let middlewares = this.splitMiddleware(middleware)
        //assignment a routes with middlewares index to ROUTES array
        this.ROUTES.push({ routes: _rs, middlewares })

        //Handle each route customRouteCase is callback 
        let _rs_temp = this.customRouteCase ? this.customRouteCase(_rs.map(_r => { return { ..._r } })) : _rs
        //assignment a routes with middlewares index to _ro array
        this._rs_mds.push({ routes: _rs_temp, middlewares });
        return _rs_temp
    }

    splitMiddleware(middleware) {
        try {
            if (Array.isArray(middleware)) return middleware
            if (typeof middleware === "string") return middleware.split(",")
            throw "middleware not valid"
        } catch (error) {
            return ["init"]
        }

    }

    /**
     * get middleswars from routes
     */
    getMiddlewares() {
        return [...new Set(this.ROUTES.flatMap(_rs => _rs.middlewares))]
    }

    /**
     *
     * @param {Boolean} with_midd 
     * @param {String|Array} middlewares 
     * return routes after treatments according to middleware
     */
    get(with_midd, middlewares) {
        return this.fiflater(this._rs_mds, with_midd, middlewares)
    }

    /**
     *
     * @param {Boolean} with_midd 
     * @param {String|Array} middlewares 
     * return routes before treatments according to middleware
     */

    constant(with_midd, middlewares) {
        return this.fiflater(this.ROUTES, with_midd, middlewares)
    }



    fiflater(routes, with_midd, middlewares) {

        let res
        if (!middlewares) res = routes

        else {
            middlewares = Array.isArray(middlewares) ? middlewares : [middlewares]
            res = routes && routes.
                filter(_r => _r.middlewares.filter(_m => middlewares.indexOf(_m) > -1).length)
        }
        if (!with_midd) return res && res.flatMap(_r => _r.routes) || []
        return res
    }
}


