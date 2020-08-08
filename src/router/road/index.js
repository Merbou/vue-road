import config from "./config"

//_w : way
//_ro : route
//_rs : routes
export default class road {
    constructor($callback, customRouteCase) {
        this.customRouteCase = customRouteCase
        this._ro = [];
        this.ROUTES = [];
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
            this.route(initRoutes[middleware], middleware)
        });
    }

    /**
     * assignment all routes to attribut _ro 
     * 
     * @param {String} middleware 
     * @param {Array} _rs 
     */
    route(_rs, middleware) {
        let middlewares = this.splitMiddleware(middleware)
        this.ROUTES.push({ routes: [..._rs], middlewares })
        _rs = this.customRouteCase ? this.customRouteCase(_rs) : this.routeCase(_rs)
        //assignment a routes with middleware index to _ro array
        this._ro.push({ routes: _rs, middlewares });
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

    get(middleware) {
        console.log(this._ro)
        let routes = !middleware ? this.ROUTES : this.ROUTES.filter(_r => _r.middlewares.indexOf(middleware) > -1).flatMap(_r => _r.routes)
        return routes
    }
}


