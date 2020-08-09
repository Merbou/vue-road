# vue-road
>it's a plugin of Vue-router that will allow you to middlewares handler

 [![vue-router](https://img.shields.io/badge/vue-Router-green)](https://router.vuejs.org/) [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger) [![minified](https://badgen.net/bundlephobia/min/vue-road@1.0.0)](https://bundlephobia.com/result?p=vue-road@1.0.0) [![gzip](https://badgen.net/bundlephobia/minzip/vue-road@1.0.0)](https://bundlephobia.com/result?p=vue-road@1.0.0) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Merbou/vue-road) [![npm](https://img.shields.io/npm/v/vue-road.svg)](https://www.npmjs.com/package/vue-road)
 
vue-road is a dependency-free, lightweight plugin Vue-router that can be overwritten by yourself.
### How to use?
```bash
npm install vue-road
```


### Example
1/ First create an instance of the road bypassing callback function, inside of callback call the route function with an array of the routes as a first parameter and middlewares as a second parameter
```
/route
import vueRoad from "vue-road";

export default new vueRoad(function () {

    this.route([
        { path: '*', redirect: '/' },
        { path: '/404', component: () => import('./views/error/404.vue') }
    ], "init")
    
    this.route([
        { path: '/admin', component: () => import('../views/dashboard.vue')}
    ], ["auth"])
    
    this.route([
        { path: '/mail', component: () => import('./views/mail.vue') }
    ], "auth,mail")
}) 
```

2/ Assign all routes of your app in Vue router constructor by calling constant method
```
/router

import Vue from "vue";
import Router from "vue-router";
import route from "./route"
Vue.use(Router);

const opts = {
  routes: route.constant(),
}

export default new Router(opts);

```

3/ Call middleware method bypassing an object contains Vue Router instance as router and object of middlewares 
```
/main.js

import router from './router'

road.middleware({ router, 
auth:{
    before: function () {
        return new Promise((resolve, reject) => {
            if(isAuth)resolve()
            reject("403")
        })
    }
}
})
```
### road class
|    api    |    Description   |   parameter   |	return	|
| -----------------  | ---------------- | :--------: | :----------: |
| constant       | return all routes as array. || Array |
| get         | return routes according to middleware |Array,String | Array |
| getMiddleswares  |return all used middlewares  | | Array |

## License
This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)