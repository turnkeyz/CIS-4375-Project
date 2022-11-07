<script>
  import axios from 'axios'
  import {cakeList} from '../../components/split'
  import Product from '../../components/product.vue'
  export default {
    
    components:{
      Product
    },
    mounted(){
    
    },
    data() {
      return {
        cakes:[],
        allproducts:[],
        category:'Cookies',
        url:import.meta.env.VITE_FILESTACK_URL,
       
      };
    },
    created(){
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/allCookies`;
      axios.get(apiURL).then((res)=>{
        this.allproducts = res.data;
        // this.rows = Math.ceil(res.data.length/3)
        // this.cakes =cakeList(this.allproducts, this.rows)
        
      }).catch(err=>{
        console.log(err)
      })
      
    },
    methods(){
     
    },
    
  };
</script>
<template>  
  <!-- <section style="background-color: #f8f8ff;">
     <div class="container py-5">
      <h1 class="text-center mb-5"><strong>Cookies</strong></h1>
      <div v-for="row in cakes" :key="row" class="row">
          <div v-for="item in row" :key="item" class="col-lg-4 col-md-6 mb-4">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
               

                <div class="">
                  <img :src="url+item.fileID" id="imgSize" class="w-100"/>
                </div>
                
                  <div class="mask" style="background-color: rgba(242,243,244, 1);">
                  <div class="d-flex justify-content-start align-items-start h-100">
                  <h2><span class="badge bg-light pt-2 ms-3 mt-3 text-dark"><strong>{{item.ProductName}} ${{item.Price}}</strong></span></h2>
                  </div>
                  </div>
                <div class="hover-overlay">
                  <div
                    class="mask"
                    style="background-color: rgba(0, 205, 255 0.15);"
                ></div>
                </div>
              <p> {{item.ProductDescription}}</p>
            </div>
          </div>     
        </div>
      </div>
  </section> -->

  

  <!-- <section style="background-color: #f8f8ff;">
    <div class="container py-5">
      <h1 class="text-center mb-5"><strong>Cookies</strong></h1>
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
  </section> -->

<Product :allproducts='allproducts' :category="category"/>

</template>

