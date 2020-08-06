export default {
    routes: {
        init: [
            { path: '*', redirect: '/' },
            { path: '/404', view: 'error/404', name: "404" },
            { path: '/403', view: 'error/403', name: "403" },
        ],
    },

}