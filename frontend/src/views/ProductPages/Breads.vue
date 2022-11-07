<script>
  import axios from 'axios'
  import {cakeList} from '../../components/split'
  import Product from '../../components/product.vue'

  export default {
    components:{
      Product
    },
    mounted(){
    //  this.cakeList(this.allproducts, this.rows)
    },
    data() {
      return {
        cakes:[],
        allproducts:[],
        category:'Breads',
        url:import.meta.env.VITE_FILESTACK_URL
      };
    },
    created(){
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/allBreads`
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
      <h1 class="text-center mb-5"><strong>Breads</strong></h1>
      <div v-for="row in cakes" :key="row" class="row">
          <div v-for="item in row" :key="item" class="col-lg-4 col-md-6 mb-4">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                
                <img :src="url+item.fileID" id="imgSize" class="w-100"/>
                  <div class="mask" style="background-color: rgba(242,243,244, 1);">
                  <div class="d-flex justify-content-start align-items-start h-100">
                  <h2><span class="badge bg-light pt-2 ms-3 mt-3 text-dark">{{item.ProductName}} ${{item.Price}}</span></h2>
                  </div>
                  </div>
                <div class="hover-overlay">
                  <div
                    class="mask"
                    style="background-color: rgba(253, 253, 253, 0.15);"
                ></div>
                </div>
              
              <p> {{item.ProductDescription}}</p>
            </div>
          </div>     
        </div>
      </div>
  </section> -->

  <Product :allproducts='allproducts' :category="category"/>
</template>

