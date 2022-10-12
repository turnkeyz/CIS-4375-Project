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
  },
  {
    path: "/login",
    name: "Login",
    component:() => import('../views/Login.vue'),
  },
  {
    path: "/cakes",
    name: "Cakes",
    component:() => import('../views/Cakes.vue'),
  },
  // {
  //   path: "/products",
  //   name: "Products",
  //   component: Products,
  // },
  {
    path: "/cookies",
    name: "Cookies",
    component:()=>import('../views/Cookies.vue'),
  },
  {
    path: "/breads",
    name: "Breads",
    component:()=>import('../views/Breads.vue'),
  },
  {
    path: "/pastries",
    name: "Pastries",
    component:()=>import('../views/Pastries.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;