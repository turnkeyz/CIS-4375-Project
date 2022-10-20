<script>
  import Footer from './components/Footer.vue'
  
  export default {
    data(){
      return{
        a:true,
        authenticated:false
      }
    },
    // register child component
    components: {
      Footer
    },
    
  }
  </script>

<template>
  <div v-if="a===true">
  	<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand d-md-none d-xs-block py-3" href="#">
      <img src="/static_files/images/logos/beer_white.png" height="40" alt="Company Logo">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
 
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <a class="nav-link mx-2 active" aria-current="page" href="/">Home</a>
        </li>
        
        
        <!-- <li class="nav-item">
          <a class="nav-link mx-2" href="#">Catering</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="#">Reserve</a>
        </li> -->
        
        <div class="dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            Products
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="/cookies">Cookies</a></li>
            <li><a class="dropdown-item" href="/cakes">Cakes</a></li>
            <li><a class="dropdown-item" href="/breads">Breads</a></li>
            <li><a class="dropdown-item" href="/pastries">Pastries</a></li>
            <li><a class="dropdown-item" href="/custom">Custom Orders</a></li>
          </ul>
        </div>
        <li class="nav-item">
          <a class="nav-link mx-2" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="#">Cart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2 btn rounded-0 btn-danger" href="/login">Login</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
<div class="text-center p-3 d-none d-md-block">
  <a href="/">
  <img src="/uploads/owl logo.png" height="50" alt="Company Logo">
</a>
</div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
      <RouterView></RouterView>
    <Footer/>
</div>

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