//sources used as reference:
//https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/#starting-from-scratch

import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },/*
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/cookies",
    name: "Cookies",
    component: Cookies,
  },
  {
    path: "/cakes",
    name: "Cakes",
    component: Cakes,
  },
  {
    path: "/brownies",
    name: "Brownies",
    component: Brownies,
  },
  {
    path: "/cupcakes",
    name: "Cupcakes",
    component: Cupcakes,
  },*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;