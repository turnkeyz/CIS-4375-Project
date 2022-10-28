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
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
            <img src="/uploads/jumbo1.jpg" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Family Owned</h5>
                  <p>Family recipes Straight out of Mom's Kitchen.</p>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="10000">
              <img src="/uploads/jumbo2.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">s
                  <h5>Custom Orders Available</h5>
                  <p>Send us a picture or design, dairy-free and gluten-free options available.</p>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="10000">
              <img src="/uploads/jumbo3.jpg" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Fresh Ingredients</h5>
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



      <div class="container">
        <h1 class="text-center mb-5"><strong>Our Products</strong></h1>
        <p text-center>Our items our made at home</p>
      </div>

      <div class="container">
      <div class="row row-cols-1 row-cols-md-2 row-cols-md-3">
          <div class="col mt-3">
            <a href="/cookies">
              <img src="/uploads/cookies.jpg" class="img-fluid" alt="image">
            </a>
              <p>Cookies</p>
            <!-- <div class="qty mt-5">
                <span class="minus bg-dark">-</span>
                <input type="number" class="count" name="qty" value="1">
                <span class="plus bg-dark">+</span>
              </div> -->
            <div class="input-group mb-3">
              <!-- <input type="number" style="width:.5em" id="typeNumber" class="form-control" placeholder="" aria-label="" aria-describedby="" > -->
              <!-- <div class="input-group-append">
                <button class="btn btn-info" type="button">Add to cart</button>
              </div> -->
            </div>
          </div>

          <div class="col mt-3">
            <a href="/cakes">
              <img src="/uploads/cakes.jpg" class="img-fluid" alt="image">
            </a>
            <p>Cakes</p>
            <div class="input-group mb-3">
              <!-- <input type="number" id="typeNumber" class="form-control" placeholder="" aria-label="" aria-describedby=""> -->
              <!-- <div class="input-group-append">
                <button class="btn btn-info" type="button">Add to cart</button>
              </div> -->
            </div>
          </div>
          <div class="col mt-3">
            <a href="/breads">
              <img src="/uploads/breads.jpg" class="img-fluid" alt="image">
            </a>
            <p>Breads</p>
            <div class="input-group mb-3">
              <!-- <input type="number" id="typeNumber" class="form-control" placeholder="" aria-label="" aria-describedby=""> -->
              <!-- <div class="input-group-append">
                <button class="btn btn-info" type="button">Add to cart</button>
              </div> -->
            </div>
          </div>
        <div class="col mt-3">
          <a href="/pastries">
            <img src="/uploads/pastries.jpg" class="img-fluid" alt="image">
          </a>
            <p>Pastries</p>
          <div class="input-group mb-3">
              <!-- <input type="number" id="typeNumber" class="form-control" placeholder="" aria-label="" aria-describedby=""> -->
              <!-- <div class="input-group-append">
                <button class="btn btn-info" type="button">Add to cart</button>
              </div> -->
          </div>
        </div>
        <div class="col mt-3">
          <a href="/cakecups">
            <img id="img" src="/uploads/cakecup.jpg" class="contain" alt="image">
          </a>
            <p>Cake Cups</p>
          <div class="input-group mb-3">
              <!-- <input type="number" id="typeNumber" class="form-control" placeholder="" aria-label="" aria-describedby=""> -->
              <!-- <div class="input-group-append">
                <button class="btn btn-info" type="button">Add to cart</button>
              </div> -->
          </div>
        </div>
        <div class="col mt-3">
          <img src="/uploads/baking.jpg" class="img-fluid" alt="image">
          <p>Custom Orders</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
 
.w-100 {
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
/* .col mt-3{
  width: 100% !important;
  height: 75vh;
  object-fit: cover;
} */


</style>