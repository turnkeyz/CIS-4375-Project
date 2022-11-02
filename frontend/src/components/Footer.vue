<script>
    export default {
        
        }
</script>

<template>
<!-- Remove the container if you want to extend the Footer to full width. -->
<div>
  <!-- Footer -->
  <footer
          class="text-center text-lg-start text-white"
          style="background-color: #212529"
          >
    <!-- Grid container -->
    <div class="container p-4 pb-0">
      <!-- Section: Links -->
      <section class="">
        <!--Grid row-->
        <div class="row">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 class="text-uppercase mb-4 font-weight-bold">
              Owl B Baking
            </h6>
            <p>
              OwlBBaking was created in collaboration with Goat Solutions
            </p>
          </div>
          <!-- Grid column -->

          <hr class="w-100 clearfix d-md-none" />

          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 class="text-uppercase mb-4 font-weight-bold">Products</h6>
            <p>
              <a href='/cookies' class="text-white">Cookies</a>
            </p>
            <p>
              <a href="/cakes" class="text-white">Cakes</a>
            </p>
            <p>
              <a href="/cakecups" class="text-white">Cake Cups</a>
            </p>
            <p>
              <a href="/breads" class="text-white">Breads</a>
            </p>
            <p>
              <a href="/pastries" class="text-white">Pastries</a>
            </p>
            <p>
              <a href="/order-form" class="text-white">Orders</a>
            </p>
          </div>
          <!-- Grid column -->

          <hr class="w-100 clearfix d-md-none" />

          <!-- Grid column -->
          <hr class="w-100 clearfix d-md-none" />

          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p><i class="fas fa-home mr-3"></i> Houston, TX 77204, US</p>
            <p><i class="fas fa-envelope mr-3"></i> owlBbaking@gmail.com</p>
            <p><i class="fas fa-phone mr-3"></i>(281) 459-2000</p>
          </div>
          <!-- Grid column -->

         
            <!-- Worker Portal -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 class="text-uppercase mb-4 font-weight-bold">Maintenance</h6>

            <a
                class="btn button btn-primary p-2 btn-floating"
                href="/login"
                role="button"
                >Worker Portal</a>  
             
          </div>
          <!-- Grid column -->
          
        </div>
        <!--Grid row-->
      </section>
      <!-- Section: Links -->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div
         class="text-center p-3"
         style="background-color: rgba(0, 0, 0, 0.2)"
         >
      © 2022 Copyright:
      <a class="text-white" href="#"
         >Owl B Baking LLC.</a
        >
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</div>
<!-- End of .container -->

</template>

<style>
  .button {
  transition-duration: 0.4s;
}

.button:hover {
  background-color: #333333; /* Green */
  color: white;
}
</style>