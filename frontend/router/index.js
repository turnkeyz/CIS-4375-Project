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
    component:() => import('../views/Admin/Login.vue'),
  },
  {
    path: "/cakes",
    name: "Cakes",
    component:() => import('../views/Products/Cakes.vue'),
  },
  {
    path: "/cookies",
    name: "Cookies",
    component:()=>import('../views/Products/Cookies.vue'),
  },
  {
    path: "/breads",
    name: "Breads",
    component:()=>import('../views/Products/Breads.vue'),
  },
  {
    path: "/pastries",
    name: "Pastries",
    component:()=>import('../views/Products/Pastries.vue'),
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component:()=>import('../views/Dashboard.vue')
  // },
  {
    path: "/customers",
    name: "Customers",
    component:() => import('../views/Admin/Customers/Customers.vue'),
  },
  {
    path: "/customer-form",
    name: "Customer-form",
    component:() => import('../views/Admin/Customers/CustomerForm.vue'),
  },
  {
    path: "/customer",
    name: "Customer",
    props:true,
    component:() => import('../views/Admin/Customers/CustomerView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;