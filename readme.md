# vue-road
>it's a plugin of Vue-router that will allow you to handle middlewares

 [![vue-router](https://img.shields.io/badge/vue-Router-green)](https://router.vuejs.org/) [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger) [![minified](https://badgen.net/bundlephobia/min/vue-road@1.0.0)](https://bundlephobia.com/result?p=vue-road@1.0.0) [![gzip](https://badgen.net/bundlephobia/minzip/vue-road@1.0.0)](https://bundlephobia.com/result?p=vue-road@1.0.0) [![npm](https://img.shields.io/npm/dm/vue-road.svg)](https://npmcharts.com/compare/vue-road) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Merbou/vue-road) [![npm](https://img.shields.io/badge/npm-vue--road-red)](https://www.npmjs.com/package/vue-road)
 
vue-road is a dependency-free, lightweight plugin Vue-router that can be overwritten by yourself.
### How to use?
```bash
npm install vue-road
```


### Example
1/ First create an instance of the road bypassing callback function, inside of callback ,call the route method, route method accepts two parameters, an array of the routes as a first parameter and middlewares as a second parameter
```
/route
import road from "vue-road";

export default new road(function () {

    this.route([
        { path: '*', redirect: '/' },
        { path: '/404', component: () => import('./views/error/404.vue') }
    ], "init")
    
    this.route([
        { path: '/admin', component: () => import('./views/dashboard.vue')}
    ], ["auth"])
    
    this.route([
        { path: '/mail', component: () => import('./views/mail.vue') }
    ], 
    #order is important
    "auth,mail" #or ["auth","mail"]
    )
},
#You can update routes as you want them to be provided
callback(routes){ })

```

2/ Assign all routes of your app in Vue router constructor by calling constant method
then Call middleware method bypassing an object contains Vue Router instance as router and object of middlewares 
```
/router

import Vue from "vue";
import Router from "vue-router";
import route from "./route"
Vue.use(Router);

const opts = {
  routes: route.constant(),
}
const router=new Router(opts);

route.middleware({ router, 
auth:{
    before: function ({to,from}) {
        return new Promise((resolve, reject) => {
            if(isAuth)resolve()
            reject("403")
        })
    }
}
})

export default router 

```
### road class
|    api    |    Description   |   parameter   |	return	|
| -----------------  | ---------------- | :--------: | :----------: |
| constant       | return routes (before treatments) by middlewares passed as the second param if the first param is false it only return routes. |Boolean,[Array,String]| Array |
| get         | return routes (after treatments) by middlewares passed as the second param if the first param is false it only return routes. |Boolean,[Array,String] | Array |
| getMiddlewares  |return all used middlewares  | | Array |

## License
This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
