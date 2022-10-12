<script>
  import Footer from './components/Footer.vue'
  
  export default {
    data(){
      return{
        a:true
      }
      
    },
    // register child component
    components: {
      Footer
    }
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
            <li><a class="dropdown-item" href="#">Custom Orders</a></li>
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
  <img src="../public/uploads/owl logo.png" height="50" alt="Company Logo">
</a>
</div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
      <RouterView></RouterView>
    <Footer/>
</div>
<div v-if="a===false">

  <div>
    <!--Main Navigation-->
    <header>
    <!-- Sidebar -->
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
        <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
            <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
            >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action py-2 ripple">
            <i class="fas fa-chart-area fa-fw me-3"></i><span>Orders</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action py-2 ripple"
            ><i class="fas fa-lock fa-fw me-3"></i><span>Customers</span></a
            >
            <a href="#" class="list-group-item list-group-item-action py-2 ripple"
            ><i class="fas fa-chart-line fa-fw me-3"></i><span>Products</span></a
            >
        </div>
        </div>
    </nav>
    <!-- Sidebar -->

    <!-- Navbar -->
    <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <!-- Container wrapper -->
        <div class="container-fluid">
        <!-- Toggle button -->
        <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <i class="fas fa-bars"></i>
        </button>

        <!-- Brand -->
        <a class="navbar-brand" href="#">
            <img
            src="../public/uploads/logo.png"
            height="25"
            alt="gs logo"
            loading="lazy"
            />
        </a>
        <!-- Right links -->
        <ul class="navbar-nav ms-auto d-flex flex-row">
            <!-- Avatar -->
            <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                class="rounded-circle"
                height="22"
                alt="Avatar"
                loading="lazy"
                />
            </a>
            <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
            >
                <li>
                <a class="dropdown-item" href="#">My profile</a>
                </li>
                <li>
                <a class="dropdown-item" href="#">Settings</a>
                </li>
                <li>
                <a class="dropdown-item" href="#">Logout</a>
                </li>
            </ul>
            </li>
        </ul>
        </div>
        <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
    </header>
    <!--Main Navigation-->

    <!--Main layout-->
    <main style="margin-top: 58px;">
    <div class="container pt-4"></div>
    </main>
    <!--Main layout-->
</div>
  <RouterView></RouterView>
</div>

</template>


<style>
  
  .img-fluid{
    width: 350px;
    height: 200px;
  }

  /* body {
    background-color: #fbfbfb;
    }*/
     /* @media (min-width: 991.98px) {
    main {
        padding-left: 240px;
    }
    }  */

    /* Sidebar */
    .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 58px 0 0; /* Height of navbar */
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    width: 240px;
    z-index: 600;
    }

    @media (max-width: 991.98px) {
    .sidebar {
        width: 100%;
    }
    }
    .sidebar .active {
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    }

    .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }
</style>