import middlewares from "./middlewares"
import route from "./route"

export default class middleware {

    constructor(router) {

        router.beforeEach((to, from, next) => {
            this.standrad({ to, from, next }, "before")
        })

        router.afterEach((to, from) => {
            this.standrad({ to, from }, "after")
        })
    }


    standrad({ to, from, next }, doctrine) {
        let _ro_ms = route.get()
            .filter(e => e.routes.findIndex(e => e.path === to.path) > -1)
            .flatMap(e => e.middlewares)

        _ro_ms.forEach(_ro_m => {
            if (Object.keys(middlewares).indexOf(_ro_m) > -1 && middlewares[_ro_m][doctrine])
                if (doctrine == "before")
                    middlewares[_ro_m][doctrine]({ to, from })
                        .then(res => res ? next(`/${res}`) : next())
                        .catch(code => next(`/${code}`))
                else
                    middlewares[_ro_m][doctrine]({ to, from })

        })
    }


}