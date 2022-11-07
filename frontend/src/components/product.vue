<script>
export default {
  props: {
    allproducts: {
      type:[Array],
      required:true
    },
    category:{
      type:String,
      required:true
    }
    
  },
  data(){
    return{
      url:import.meta.env.VITE_FILESTACK_URL,
    }
  }
}
</script>

<template>
     <section style="background-color: #f8f8ff;">
    <div class="container py-5">
      <h1 class="text-center mb-5"><strong>{{category}}</strong></h1>
      <div class="row">
        <div v-for="item in allproducts" :key="item" class="col-md-4">
          <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
            <img :src="url+item.fileID" id="imgSize" class="w-100"/>
            <div class="mask" style="background-color: rgba(242,243,244, 1);">
              <div class="d-flex justify-content-start align-items-start h-100">
                <h2><span class="badge bg-light pt-2 ms-3 mt-3 text-dark"><strong>{{item.ProductName}} ${{item.Price}}</strong></span></h2>
              </div>
            </div>
            <div class="hover-overlay">
              <div class="mask" style="background-color: rgba(0, 205, 255 0.15);">
              </div>
              <p> {{item.ProductDescription}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  #imgSize{
    height:300px;
    object-fit: cover;
  }
</style>

<!-- <style> 

 #imgSize{
    width:100vh;
    height:20vh;
    object-fit: cover;
  } 
 
</style> -->