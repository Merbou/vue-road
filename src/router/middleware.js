// import middlewares from "./middlewares/index"
import factory from "./middlewareFactory"
import route from "./route"

export default class middleware {

    constructor(router) {

        router.beforeEach((to, from, next) => {
            const middlewares = factory("./middlewares")
            console.log(middlewares)
            // let _ro_ms = route.get()
            //     .filter(e => e.routes.findIndex(e => e.path === to.path) > -1)
            //     .flatMap(e => e.middlewares)

            // _ro_ms.forEach(_ro_m => {
            //     middlewares[_ro_m](to, from)
            //         .then(res => res ? next(`/${res}`) : next())
            //         .catch(code => next(`/${code}`))
            // })
        })
    }


}