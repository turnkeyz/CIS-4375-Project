<script>

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
        graph3:[['Chocolate Chip Cookies', 100], ['Eclair', 80], ['CheeseCake', 79], ['French Sourdough', 76], ['Chocolate Cake', 90]]
      };
    },
    mounted(){
          
      },
        //created function
    created() {
    
    },
    methods: {
      cartsPage() {
        this.$router.push('/carts')
      },
      customersPage(){
        this.$router.push('/customers')
      },
      productsPage(){
        this.$router.push('/products')
      },
      ordersPage(){
        this.$router.push('/orders')
      },
      
    },
  };
</script>

<template>
  <div>
    <h1 class="text-center mb-5">2022 Reports</h1>
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
  <!-- <div class="container">
    <div class="d-grid gap-2 d-md-flex justify-content-center">
      <button @click="customersPage()" class="btn btn-primary me-md-2">Customers</button>
      <button @click="productsPage()" class="btn btn-primary me-md-2">Products</button>
      <button  @click="ordersPage()" class="btn btn-secondary">Orders</button>
      <button  @click="cartsPage()" class="btn btn-primary">Carts</button>
    </div>
  </div> -->
</template>

<style scoped>


</style>