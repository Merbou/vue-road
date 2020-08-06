import { resolve } from "core-js/fn/promise"

export default function (path) {

        const middlewares = {}
        const files = require.context("./middlewares", true, /\.js$/).keys()
        const validFiles = /\.\/\w*\.middleware[\.\w]*\.js$/i
        const matchFileName = /^\w*\./i

        files
            .filter(f => validFiles.test(f))
            .map(f => f.substring(2))
            .forEach(f => {
                import(`${path}/${f}`).then(_m => {
                    let fileOriginName = f.match(matchFileName).join("")
                    middlewares[fileOriginName.substring(0, fileOriginName.length - 1)] = _m
                })
            })


        return middlewares
}
