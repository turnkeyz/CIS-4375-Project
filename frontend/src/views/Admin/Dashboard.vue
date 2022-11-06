<script>
  import axios from "axios";
  
  export default {
    components: {
    
},
      //Storing the data being exported in a function
    data() {
      return {
        // graph:[['Jan', 32], ['Feb', 46], ['Mar', 28], ['Apr', 39], 
        // ['May', 32], ['Jun', 15], ['Jul',40], ['Oct', 5], ['Nov', 24]],
        graph:{},
        graph2:{},
        // graph2:[['Cookies', 32], ['Pastries', 46], ['Cakes', 28], ['Breads', 39], 
        // ['CakeCups', 32], ['Pies', 15]],
        graph3:[['Chocolate Chip Cookies', 100], ['Eclair', 80], ['CheeseCake', 79], ['French Sourdough', 76], ['Chocolate Cake', 90]],
        cartsNotInOrder:[],
        topSellingProduct:[],
        ordersThisYear:{},
        topFiveSellers:{},
        monthlyRevenue:{},
        loaded1:false,
        loaded2:false,
        loaded3:false,
        loaded4:false
        
      };
    },
    mounted(){
      console.log('mounted')
      // this.setGraph()
    },
    computed(){
      console.log('computed')
      // this.setGraph()
    },
    updated(){
      // this.setGraph()
      console.log('updated')
    },
    
        //created function
    created() {
      
      console.log('created')
      let cartApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/CartNotInOrder`
      axios.get(cartApiUrl).then((res)=>{
        this.cartsNotInOrder=res.data
      })

      let productApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/MonthlySellerName`
      axios.get(productApiUrl).then((res2)=>{
        

        for(let x=0;x<res2.data.length;x++){
            let month = this.checkMonth(res2.data[x].Month)
            const productName = res2.data[x].ProductName
            let count = res2.data[x].ProdCount
            
            this.topSellingProduct.push({name:month, data:{[productName]:count}})
          }
          console.log(this.topSellingProduct)
          this.loaded4=true
        
        // console.log('topSellingProduct',this.topSellingProduct)
      })
      let ordersApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/OrdersThisYear`
      axios.get(ordersApiUrl).then((res3)=>{
        for(let x=0;x<res3.data.length;x++){
            let month = this.checkMonth(res3.data[x].Month)
             this.ordersThisYear[month] = res3.data[x].NumberofOrders
          }
          this.loaded2=true

        // console.log(this.graph2)
        // console.log('ordersThisYear', this.ordersThisYear)
      })
      let topApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/TopFiveByName`
      axios.get(topApiUrl).then((res4)=>{
        for(let x=0;x<res4.data.length;x++){
             this.topFiveSellers[res4.data[x].ProductName] = res4.data[x].ProdCount
          }
          this.loaded3=true
        // console.log('topFiveSellers', this.topFiveSellers)
      })
      let monthlyApiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Graphs/MonthlyRevenue`
      axios.get(monthlyApiUrl).then((res5)=>{
        for(let x=0;x<res5.data.length;x++){
            let month = this.checkMonth(res5.data[x].Month)
             this.monthlyRevenue[month] = res5.data[x].Revenue
          }
          this.loaded1=true
      })

      
    },
    methods: {
      setGraph(){
        console.log('method')
        // this.monthValues(this.monthlyRevenue, this.graph)
        // this.monthOrders(this.ordersThisYear, this.graph2).then(()=>{})
        // this.loaded=true
      },

      checkMonth(month){
          switch(month){
            case 1:
              return 'Jan'
            case 2:
              return 'Feb'
            case 3:
              return 'Mar'
            case 4:
              return 'Apr'
            case 5:
              return 'May'
            case 6:
              return 'Jun'
            case 7:
              return 'Jul'
            case 8:
              return 'Aug'
            case 9:
              return 'Sep'
            case 10:
              return 'Oct'
            case 11:
              return 'Nov'
            case 12:
              return 'Dec'
          }
        },
        monthValues(){
          for(let x=0;x<monthlyRevenue.length;x++){
            let month = this.checkMonth(data[x].Month)
             graph[month] = data[x].Revenue
          }
        },
        monthOrders(){
          for(let x=0;x<data.length;x++){
            let month = this.checkMonth(data[x].Month)
             graph[month] = data[x].NumberofOrders
          }
        }

      
    },
    watch(){
      
    }
    
  };
</script>

<template>
  <div class="container mb-5">
    <h1 class="text-center mb-2">2022 Reports</h1>
    <div v-show="cartsNotInOrder.length >0" class="p-4 shadow-4 rounded-3 mb-5" style="background-color: hsl(0, 0%, 94%);">
      <h2 class="display-4">Current Carts not Part of an Order</h2>
      <p v-for="cart in cartsNotInOrder" :key="cart">Cart ID:{{cart.CartID}}</p>
    </div>

    <fieldset class='form-control mb-5'>
      <legend>Sales by Month</legend>
    <line-chart v-if="loaded1" :data="monthlyRevenue"></line-chart>
    <p></p>
    </fieldset>
    
    <fieldset class='form-control mb-5'>
      <legend>Orders by Month</legend>
    <line-chart v-if="loaded2" :data="ordersThisYear"></line-chart>
    <p></p>
    </fieldset>
  
    
  <fieldset class='form-control mb-5'>
    <legend>Monthly Top Seller</legend>
    <line-chart v-if="loaded4" :data="topSellingProduct"></line-chart>
    <p></p>
  </fieldset>

  <fieldset class='form-control mb-5'>
    <legend>Top 5 Sellers</legend>
    <bar-chart v-if="loaded3" :data="topFiveSellers"></bar-chart>
  </fieldset>
  
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