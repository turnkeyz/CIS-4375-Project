<script>
    export default {
      data() {
        return {
          
        };
      },
    };
</script>
    
<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
            <img src="/uploads/jumbo1.jpg" id="carousel" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block" id="carouselColor">

                <h2>Family Owned</h2>
                  <p>Family recipes Straight out of Mom's Kitchen.</p>
                
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="10000">
              <img src="/uploads/jumbo2.jpg" id="carousel"  class="d-block w-100"  alt="...">
                <div class="carousel-caption d-none d-md-block" id="carouselColor">
                  <h2>Custom Orders Available</h2>
                  <p>Send us a picture or design, dairy-free and gluten-free options available.</p>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="10000">
              <img src="/uploads/jumbo3.jpg" id="carousel"  class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block" id="carouselColor">
                <h2>Fresh Ingredients</h2>
                  <p>We support local business so our suppliers operate here, in the heart of Texas</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
      </div>
      </div>
      </div>
    
      
      
      <div class="container mt-5 mb-5">
        <h1 class="text-center mb-3"><strong>Our Products</strong></h1>
        <p class="text-center">Staring two years ago in Mom's kitchen, Owl B Baking Bakery has been making the neighborhoods favorite baked goods from scratch, 
          in small batches, and using the finest ingredients. Custom availables are also available for any item not displayed. Just send 
          us a description and picture and we'll have it made!
        </p>
      </div>
    
    <div class="container mb-5">
      <div class="row ">
          <div class="col-md-4">
            <a href="/cookies">
              <img src="/uploads/cookies.jpg" class="w-100 img-thumbnail" alt="image">
            </a>
              <p>Cookies</p>
            <div class="input-group mb-3">
            </div>
          </div>

          <div class="col-md-4">
            <a href="/cakes">
              <img src="/uploads/cakes.jpg" class="w-100 img-thumbnail" alt="image">
            </a>
            <p>Cakes</p>
            <div class="input-group mb-3">
              
            </div>
          </div>
          <div class="col-md-4">
            <a href="/breads">
              <img src="/uploads/breads.jpg" class="w-100 img-thumbnail" alt="image">
            </a>
            <p>Breads</p>
            <div class="input-group mb-3">
             
            </div>
          </div>

        <div class="row">
          <div class="col-md-4">
          <a href="/pastries">
            <img src="/uploads/pastries.jpg" class="w-100 img-thumbnail" alt="image">
          </a>
            <p>Pastries</p>
          <div class="input-group mb-3">
             
          </div>
        </div>
        <div class="col-md-4">
          <a href="/cakecups">
            <img id="img" src="/uploads/cakecup.jpg" class="w-100 img-thumbnail" alt="image">
          </a>
            <p>Cake Cups</p>
          <div class="input-group mb-3">
             
          </div>
        </div>
        <div class="col-md-4">
          <a href="/order-form">
            <img src="/uploads/baking.jpg" class="w-100 img-thumbnail" alt="image">
          </a>
          <p>Custom Orders</p>
        </div>
      </div>
        </div>
        
    </div>
  
  </main>
</template>

<style scoped>
.w-100 {
  height: 300px;
  object-fit: cover;
}
 
/* .w-100 {
  width: 100% !important;
  height: 75vh;
  object-fit: cover;
}

img {
float: left;
width: 100px;
height: 100px;
object-fit: contain;
} 


.carousel-caption p, h5{

  background-color: aqua;
  backdrop-filter: blur(5px); 
  opacity: .50; 
    filter: alpha(opacity=50); 
    -ms-filter: "alpha(opacity=50)"; 
    -khtml-opacity: .50; 
    -moz-opacity: .50; FF lt 1.5, Netscape

}*/

#carouselColor{
  background:rgba(248,244,255,.1)
}



</style>