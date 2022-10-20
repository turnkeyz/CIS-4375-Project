//sources used as reference:
//https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/#starting-from-scratch

import { createWebHistory, createRouter } from "vue-router";
import Home from "../src/views/Home.vue";
import About from "../src/views/About.vue";

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

  //PRODUCT PAGES===========================
  {
    path: "/cakes",
    name: "Cakes",
    component:() => import('../src/views/ProductPages/Cakes.vue'),
  },
  {
    path: "/cookies",
    name: "Cookies",
    component:()=>import('../src/views/ProductPages/Cookies.vue'),
  },
  {
    path: "/breads",
    name: "Breads",
    component:()=>import('../src/views/ProductPages/Breads.vue'),
  },
  {
    path: "/pastries",
    name: "Pastries",
    component:()=>import('../src/views/ProductPages/Pastries.vue'),
  },
  {
    path: "/custom",
    name: "Custom",
    component:() => import('../src/views/ProductPages/Custom.vue'),
  },

    //ADMIN ===================================================
  {
    path: "/login",
    name: "Login",
    component:() => import('../src/views/Admin/Login.vue'),
  },
  {
    path:"/dashboard",
    name:"Dashboard",
    component:()=> import("../src/views/Admin/Dashboard.vue")
  },
  //CUSTOMERS =========
  {
    path: "/customers",
    name: "Customers",
    component:() => import('../src/views/Admin/Customers/Customers.vue'),
  },
  {
    path: "/customer-form",
    name: "Customer-form",
    component:() => import('../src/views/Admin/Customers/CustomerForm.vue'),
  },
  {
    path: "/customer",
    name: "Customer",
    props:true,
    component:() => import('../src/views/Admin/Customers/CustomerView.vue'),
  },
  
  //PRODUCTS=========
  {
    path: "/product",
    name: "Product",
    component:() => import('../src/views/Admin/Products/ProductView.vue')
  },
  {
    path:"/products",
    name:"Products",
    component:()=> import('../src/views/Admin/Products/Products.vue')
  },
  {
    path:"/product-form",
    name:"/Product-form",
    component:()=> import('../src/views/Admin/Products/ProductForm.vue')
  },

  {
    path: "/cart",
    name: "Cart",
    component:() => import('../src/views/Admin/Cart/CartView.vue')
  },
  {
    path:"/carts",
    name:"Carts",
    component:()=> import('../src/views/Admin/Cart/Carts.vue')
  },
  {
    path:"/cart-form",
    name:"/Cart-form",
    component:()=> import('../src/views/Admin/Cart/CartForm.vue')
  },

  //=========================================================ADMIN
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;