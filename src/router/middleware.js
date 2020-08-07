import middlewares from "./middlewares"
import route from "./route"

export default class middleware {

    constructor(router) {

        let _ro_ms
        router.beforeEach((to, from, next) => {
            _ro_ms = route.get()
                .filter(e => e.routes.findIndex(e => e.path === to.path) > -1)
                .flatMap(e => e.middlewares)

            _ro_ms.forEach(_ro_m => {
                if (Object.keys(middlewares).indexOf(_ro_m) > -1)
                    if (middlewares[_ro_m].before)
                        middlewares[_ro_m].before({ to, from })
                            .then(res => res ? next(`/${res}`) : next())
                            .catch(code => next(`/${code}`))
            })
        })

        router.afterEach((to, from) => {
            if (!_ro_ms)
                _ro_ms = route.get()
                    .filter(e => e.routes.findIndex(e => e.path === to.path) > -1)
                    .flatMap(e => e.middlewares)
            _ro_ms.forEach(_ro_m => {
                if (Object.keys(middlewares).indexOf(_ro_m) > -1)
                    if (middlewares[_ro_m].after)
                        middlewares[_ro_m].after({ to, from })
                            .then(res => res ? next(`/${res}`) : next())
                            .catch(code => next(`/${code}`))
            })

        })

    }


}