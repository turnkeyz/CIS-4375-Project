<script>
  import axios from "axios";
  export default {
    components: {
    
},
      //Storing the data being exported in a function
    data() {
      return {
        graph:[['Jan', 32], ['Feb', 46], ['Mar', 28], ['Apr', 39], 
        ['May', 32], ['Jun', 15], ['Jul',40], ['Oct', 5], ['Nov', 24]],
        graph2:[['Cookies', 32], ['Pastries', 46], ['Cakes', 28], ['Breads', 39], 
        ['CakeCups', 32], ['Pies', 15]],
        graph3:[['Chocolate Chip Cookies', 100], ['Eclair', 80], ['CheeseCake', 79], ['French Sourdough', 76], ['Chocolate Cake', 90]],
        cartsNotInOrder:[],
        topSellingProduct:[],
        ordersThisYear:[],
        topFiveSellers:[],
        monthlyRevenue:[]
        
      };
    },
    mounted(){
          
      },
        //created function
    created() {
      let cartApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/CartNotInOrder`
      axios.get(cartApiUrl).then((res)=>{
        this.cartsNotInOrder=res.data
      })
      let productApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/MonthlySellerName`
      axios.get(productApiUrl).then((res2)=>{
        this.topSellingProduct=res2.data
      })
      let ordersApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/OrdersThisYear`
      axios.get(ordersApiUrl).then((res3)=>{
        this.ordersThisYear=res3.data
      })
      let topApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/TopFiveByName`
      axios.get(topApiUrl).then((res4)=>{
        this.topFiveSellers=res4.data
      })
      let monthlyApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/MonthlyRevenue`
      axios.get(monthlyApiUrl).then((res5)=>{
        this.monthlyRevenue=res5.data
      })
    },
    methods: {
      
    },
  };
</script>

<template>
  
  <div class="container mb-5">
  <div>
    <h1 class="text-center mb-2">2022 Reports</h1>
    <div v-show="cartsNotInOrder.length >0" class="p-4 shadow-4 rounded-3 mb-5" style="background-color: hsl(0, 0%, 94%);">
      <h2 class="display-4">Current Carts not Part of an Order</h2>
      <p v-for="cart in cartsNotInOrder" :key="cart">Cart ID:{{cart.CartID}}</p>
    </div>

    <fieldset class='form-control mb-5'>
      <legend>Sales by Month</legend>
    <line-chart :data="graph"></line-chart>
    <p></p>
    </fieldset>
  </div>
  <div>
    
  <fieldset class='form-control mb-5'>
    <legend>Sales by Category</legend>
    <column-chart :data="graph2"></column-chart>
    <p></p>
  </fieldset>

  <fieldset class='form-control mb-5'>
    <legend>Top 5 Sellers</legend>
    <bar-chart :data="graph3"></bar-chart>
    <p></p>
  </fieldset>
  </div>
  <div class="container">
    <div class="d-grid gap-2 d-md-flex justify-content-center">
      <!-- <button @click="customersPage()" class="btn btn-primary me-md-2">Customers</button>
      <button @click="productsPage()" class="btn btn-primary me-md-2">Products</button>
      <button  @click="ordersPage()" class="btn btn-secondary">Orders</button>
      <button  @click="cartsPage()" class="btn btn-primary">Carts</button> -->
    </div>
  </div>

</div>
</template>

<style scoped>


</style>