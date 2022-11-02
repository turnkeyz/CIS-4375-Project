<script>
  import Footer from './components/Footer.vue'
  // const isLoggedIn = ref(false)
  import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"
  // let auth = getAuth()
  export default {
    data(){
      return{
        isLoggedIn:false,
        // authenticated:false
      }
    },
    // register child component
    components: {
      Footer
    },
    mounted(){
      let auth = getAuth();
      onAuthStateChanged(auth, (user)=>{
        if(user){
          this.isLoggedIn = true
          
        }else{
          this.isLoggedIn = false
          
        }
      })
    },
    methods:{
      logOut(){
        let auth = getAuth()
        signOut(auth).then(()=>{
          this.logButton = false
          this.$router.push('/login')
        })
        
      }
    }
  }
</script>

<template>
  	<nav  class="navbar navbar-expand-md navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand d-md-none d-xs-block py-3" href="#">
      <img src="" height="40" alt="Company Logo">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
 
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mx-auto">
        <li v-if="!$route.meta.hideNavbar" class="nav-item">
          <a class="nav-link mx-2 active" aria-current="page" href="/">Home</a>
        </li>
        
        <!-- Dashboard navigation -->
        <li v-if="$route.meta.hideNavbar" class="nav-item">
          <a class="nav-link mx-2 active" aria-current="page" href="/dashboard">DashBoard</a>
        </li>
        <div v-if="$route.meta.hideNavbar" class="dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            Customers
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="/customers">View All</a></li>
            <li><a class="dropdown-item" href="/customer-form">Add</a></li>
          </ul>
        </div>
        <div v-if="$route.meta.hideNavbar" class="dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            Products
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="/products">View All</a></li>
            <li><a class="dropdown-item" href="/product-form">Add</a></li>
          </ul>
        </div>
        <div v-if="$route.meta.hideNavbar" class="dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            Carts
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="/carts">View All</a></li>
            <li><a class="dropdown-item" href="/cart-form">Add</a></li>
          </ul>
        </div>
        <div v-if="$route.meta.hideNavbar" class="dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            Orders
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="/orders">View All</a></li>
            <li><a class="dropdown-item" href="/orders-form">Add</a></li>
          </ul>
        </div>
        <!-- Dashboard Navigation -->


        <div v-if="!$route.meta.hideNavbar" class="dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            Products
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="/cookies">Cookies</a></li>
            <li><a class="dropdown-item" href="/cakes">Cakes</a></li>
            <li><a class="dropdown-item" href="/breads">Breads</a></li>
            <li><a class="dropdown-item" href="/pastries">Pastries</a></li>
            <li><a class="dropdown-item" href="/cakecups">Cake Cups</a></li>
            
          </ul>
        </div>
        <li v-if="!$route.meta.hideNavbar" class="nav-item">
          <a class="nav-link mx-2" href="/about">About</a>
        </li>
        <li v-if="!$route.meta.hideNavbar" class="nav-item">
          <a class="nav-link mx-2" href="/order-form">Order</a>
        </li>
        <li class="nav-item">
          <button @click="logOut()" v-if="isLoggedIn" class="btn btn-danger navbar-btn">Logout</button>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link mx-2 btn rounded-0 btn-danger" href="/login">Login</a>
        </li> -->
      </ul>
    </div>
  </div>
</nav>
<div class="text-center p-3 d-none d-md-block">
  <a href="/">
  <img src="/uploads/owllogo.png" height="50" alt="Company Logo">
</a>
</div>
      <RouterView></RouterView>
    <Footer v-if="!$route.meta.hideNavbar"/>


</template>


<style>
  @font-face {
  font-family: "Caviet";
  src: local("Caviet"), url(/assets/Caveat/static/Caveat-Regular.ttf) format("truetype");
}

h4, p, h5, h3, h2, ul, li, h1{
    font-family: "Caviet", Helvetica, Arial;
    /* font-size:25px */
  }

  p,ul,li{
    font-size: 25px;
  }
  .img-fluid{
    width: 100% !important;
    height: 25vh;
    object-fit: cover;
  }
  .nav-link mx-2 btn rounded-0{
    color:#00cdff
  }

</style>