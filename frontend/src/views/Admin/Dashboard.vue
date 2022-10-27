<script>
  export default {
    components: {
      
    },
      //Storing the data being exported in a function
    data() {
      return {
        
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
  <div class="container">
    <div class="d-grid gap-2 d-md-flex justify-content-center">
      <button @click="customersPage()" class="btn btn-primary me-md-2">Customers</button>
      <button @click="productsPage()" class="btn btn-primary me-md-2">Products</button>
      <button  @click="ordersPage()" class="btn btn-secondary">Orders</button>
      <button  @click="cartsPage()" class="btn btn-primary">Carts</button>
    </div>
  </div>
</template>

<style scoped>


</style>