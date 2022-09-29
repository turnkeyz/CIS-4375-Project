<script>
  import Footer from './components/Footer.vue'
  
  export default {
    // register child component
    components: {
      Footer
    }
  }
  </script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" aria-label="Dark offcanvas navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Owl B Baking</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarDarkLabel">Offcanvas</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class=nav-link to="/about">About</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="/products">Products</router-link></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><router-link class="dropdown-item" to="/brownies">Brownies</router-link></li>
                  <li><router-link class="dropdown-item" to="/cakes">Cakes</router-link></li>
                  <li><router-link class="dropdown-item" to="/cupcakes">Cupcakes</router-link></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex mt-3" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
      <RouterView></RouterView>
    <Footer/>
</template>


<style>
  .container-fluid{
    /* background-color: #F3E5F5 */
    background-color: #DDA0DD;
  }
  .img-fluid{
    width: 350px;
    height: 200px;
  }

</style>