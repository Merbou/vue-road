import midd from "./middleware";
//_w : way
//_ro : route
//_rs : routes
//_rs_mds : routes_middleswares
export default class road {
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
     * @param {String} middleware 
     * @param {Array} _rs 
     */
    route(_rs, middleware) {
        let middlewares = this.splitMiddleware(middleware)
        //assignment a routes with middlewares index to ROUTES array
        this.ROUTES.push({ routes: [..._rs], middlewares })

        //Handle each route customRouteCase is callback 
        _rs = this.customRouteCase ? this.customRouteCase(_rs) : this.routeCase(_rs)
        //assignment a routes with middlewares index to _ro array
        this._rs_mds.push({ routes: _rs, middlewares });
        return _rs
    }

    /**
    * create objects of route vueRouter form simple object
    * 
    * @param {Array} routes
    */
    routeCase(routes) {
        return routes.map(_ro => {
            let { children, ..._ro_params } = _ro
            let route = {
                ..._ro_params,
                children: children && this.routeCase(children)
            }
            return route
        })
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
    getMiddleswares() {
        return [...new Set(this.ROUTES.flatMap(_rs => _rs.middlewares))]
    }

    /**
     * 
     * return all routes as array of vue Router object(route)
     */
    constant() {
        return (this._rs_mds && this._rs_mds.map(e => e.routes).flatMap(e => e)) || []
    }

    /**
     * 
     * @param {String|Array} middlewares 
     * return routes according to middleware
     */
    get(middlewares) {
        if (!middlewares) return this.ROUTES
        middlewares = Array.isArray(middlewares) ? middlewares : [middlewares]
        return this.ROUTES.
            filter(_r => _r.middlewares.filter(_m => middlewares.indexOf(_m) > -1).length)
            .flatMap(_r => _r.routes)
    }
}


