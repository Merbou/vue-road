import Vue from "vue";
import Router from "vue-router";
import route from "./route"
console.log(route.get())

Vue.use(Router);

const opts = {
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: route.constant(),
}

export default new Router(opts);

