import config from "./config"
// import middlewares from "../middlewares"

//_w : way
//_ro : route
//_rs : routes
export class road {
    constructor($callback) {
        this._ro = [];
        this.init();
        //callback with this object
        $callback.call(this);
    }

    /**
     * upload route of confing file
     */
    init() {
        let initRoutes = config && config.routes
        Object.keys(initRoutes).forEach(middleware => {
            this.route(middleware, initRoutes[middleware])
        });
    }

    /**
     * assignment all routes to attribut _ro 
     * 
     * @param {String} middleware 
     * @param {Array} _rs 
     */
    route(middleware, _rs) {
        // if (Object.keys(middlewares).indexOf(middleware) === -1) return;
        _rs = this.routeCase(_rs)

        //assignment a routes with middleware index to _ro array
        let _w = { routes: _rs, middlewares: this.splitMiddleware(middleware) }
        // _w[middleware] = _rs
        this._ro.push(_w);
        return _rs
    }

    /**
    * create objects of route vueRouter form simple object
    * 
    * @param {Array} _rs 
    */
    routeCase(routes) {
        return routes.map(_ro => {

            let { view, children, ..._ro_params } = _ro
            let route = {
                ..._ro_params,
                children: children && this.routeCase(children)
            }
            if (route && view)
                route.component = () => import(`../../views/${view}.vue`)
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
     * 
     * return all routes as array of vue Router object(route)
     */
    constant() {
        return (this._ro && this._ro.map(e => e.routes).flatMap(e => e)) || []
    }

    get() {
        return this._ro
    }
}


