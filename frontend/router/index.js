//sources used as reference:
//https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/#starting-from-scratch

import { createWebHistory, createRouter } from "vue-router";
import Home from "../src/views/Home.vue";
import About from "../src/views/About.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth"

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
    component:()=> import("../src/views/Admin/Dashboard.vue"),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }

  },
  //CUSTOMERS =========
  {
    path: "/customers",
    name: "Customers",
    component:() => import('../src/views/Admin/Customers/Customers.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path: "/customer-form",
    name: "Customer-form",
    component:() => import('../src/views/Admin/Customers/CustomerForm.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path: "/customer",
    name: "Customer",
    props:true,
    component:() => import('../src/views/Admin/Customers/CustomerView.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  
  //PRODUCTS=========
  {
    path: "/product",
    name: "Product",
    component:() => import('../src/views/Admin/Products/ProductView.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path:"/products",
    name:"Products",
    component:()=> import('../src/views/Admin/Products/Products.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path:"/product-form",
    name:"/Product-form",
    component:()=> import('../src/views/Admin/Products/ProductForm.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },

  {
    path: "/cart",
    name: "Cart",
    component:() => import('../src/views/Admin/Cart/CartView.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path:"/carts",
    name:"Carts",
    component:()=> import('../src/views/Admin/Cart/Carts.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path:"/cart-form",
    name:"/Cart-form",
    component:()=> import('../src/views/Admin/Cart/CartForm.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path:"/cart-edit",
    name:"cart-edit",
    component:()=> import('../src/views/Admin/Cart/CartEdit.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }

  },

  //======ORDERS
  {
    path:"/orders",
    name:"Orders",
    component:()=> import('../src/views/Admin/Orders/Orders.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path: "/orders-view",
    name: "Orders-View",
    component:() => import('../src/views/Admin/Orders/OrderView.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path: "/orders-edit",
    name:"orders-edit",
    component:() => import('../src/views/Admin/Orders/OrderEdit.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  },
  {
    path: "/orders-form",
    name:"orders-form",
    component:() => import('../src/views/Admin/Orders/OrderForm.vue'),
    meta:{
      requiresAuth:true,
      hideNavbar:true
    }
  }
  //=========================================================ADMIN
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser=()=>{
  return new Promise((resolve,reject)=>{
    const removeListener= onAuthStateChanged(
      getAuth(),
      (user)=>{
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next)=>{
  if(to.matched.some((record)=>record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    }else{
      alert("You don't have access!")
      next("/login")
    }
  }else{
    next()
  }
})

export default router;