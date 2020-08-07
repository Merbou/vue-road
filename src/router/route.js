import { road } from "./road";


export default new road(function () {

    /**
     * auth using for private path authentification required
     * open using for public path
     */

    this.route("open", [
        { path: '/', view: 'Welcome' },
        { path: '/about', view: 'About' },
        { path: '/home', view: 'Home' },
    ])
    this.route("open,auth", [
        { path: '/dashboard', view: 'dashboard' },
    ])

}) 