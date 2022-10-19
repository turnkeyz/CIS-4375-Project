<script>
  import axios from 'axios'
  import {cakeList} from '../../src/components/split'
  // import {VARIABLES.fetchBaseUrl}  from '../src/config/.env.js'
  export default {
    mounted(){
    //  this.cakeList(this.allproducts, this.rows)
    },
    data() {
      return {
        cakes:[]
      };
    },
    created(){
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/allPastries`;
      axios.get(apiURL).then((res)=>{
        this.allproducts = res.data;
        this.rows = Math.ceil(res.data.length/3)
        this.cakes =cakeList(this.allproducts, this.rows)
        
      }).catch(err=>{
        console.log(err)
      })
      
    },
    methods(){
     
    },
    
  };
</script>
<template>  
  <section style="background-color: #eee;">
     <div class="container py-5">
      <h1 class="text-center mb-5"><strong>Pastries</strong></h1>
      <div v-for="row in cakes" :key="cakes.ProductID" class="row">
          <div v-for="item in row" class="col-lg-4 col-md-6 mb-4">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                <img :src="'../public/uploads/pastries/'+item.Img_url" class="w-100"/>
                
                  <div class="mask" style="background-color: rgba(0, 0, 0, 0.3);">
                  <div class="d-flex justify-content-start align-items-start h-100">
                  <h5><span class="badge bg-light pt-2 ms-3 mt-3 text-dark">{{item.ProductName}} ${{item.Price}}</span></h5>
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
  </section>
</template>

<style>

  .w-100{
      width: 200px;
      height: 300px;
  }
</style>