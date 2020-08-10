export default class middleware {

    constructor({router, middlewares,route}) {

        if (!middlewares||!route) return;
        this.middlewares = middlewares
        this.route = route

        router.beforeEach((to, from, next) => {
            this.standrad({ to, from, next }, "before")
        })

        router.afterEach((to, from) => {
            this.standrad({ to, from }, "after")
        })

    }

    standrad({ to, from, next }, doctrine) {
        let _ro_ms = this.route.get(true)
            .filter(e => e.routes.findIndex(e => e.path === to.path.split("/").slice(0, 2).join("/")) > -1)
            .flatMap(e => e.middlewares)

        _ro_ms.forEach(_ro_m => {
            if (Object.keys(this.middlewares).indexOf(_ro_m) > -1 && this.middlewares[_ro_m][doctrine])
                if (doctrine == "before")
                    this.middlewares[_ro_m][doctrine]({ to, from })
                        .then(res => {
                            if (res === to.path) next()
                            else
                                res ? next(res) : next()
                        })
                        .catch(code => {

                            if (res === to.path) next()
                            else
                                next(code)
                        })
                else
                    this.middlewares[_ro_m][doctrine]({ to, from })

        })
    }


}