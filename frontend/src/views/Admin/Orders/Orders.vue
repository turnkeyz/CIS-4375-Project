<script>
    import axios from 'axios';
    export default {
    // register child component
    components: {
    
    },
    data(){
      return{
        Orders: [],
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/fetchAll`
      axios.get(apiUrl).then((res)=>{
        this.Orders=res.data
        console.log(this.Orders)
      })
    },
    methods:{
        newOrder(){
            this.$router.push('/orders-form')
        },
        seeMore(id){
            this.$router.push({
                name:'Orders-View',
                query:{id:id}
            })
        },
        
        editOrder(id){
            this.$router.push({
                name:'orders-edit',
                query:{id:id}
            })
        },
        delCart(id){
            let apiUrl = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/delete/${id}`
            let resetArray = this.Orders.findIndex((i)=>i.CartID ===id)
        
            if(window.confirm("Are you sure you want to delete Cart?")){
                axios.delete(apiUrl).then(()=>{
                    this.Orders.splice(resetArray, 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
    },
    mounted(){
    }
  }
</script>
<template>
    <div class="container">
        <h1 class="text-center">All Orders</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Order #</th>
                        <th scope="col">Customer</th>
                        <th scope ="col">Cart ID</th>
                        <th scope="col">Call Back</th>
                        <th scope="col">Status</th>
                        <th scope="col">Payment Status</th>
                        <th><button class="btn btn-success btn-sm" @click="newOrder()">Add New Order</button></th>
                
                        <!-- <th><button class="btn btn-success btn-sm" @click="newOrder()">Add New Order</button></th> -->
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Order in Orders" :key="Order.OrderID">
                        <td>{{Order.OrderID}}</td>
                        <td>{{Order.FirstName}} {{Order.LastName}} (#{{Order.CustomerID}})</td>
                        <td>{{Order.CartID}}</td>
                        <td>{{Order.CalledBackValue}}</td>
                        <td>{{Order.Status}}</td>
                        <td>{{Order.PaymentStatus}}</td>
                        
                        <td>
                    <tr>
                                <!-- <td><router-link :to="{name:'Order', query:{id:Order.OrderID, e:false}}" class="btn btn-light">...</router-link></td> -->
                                <td><button @click="seeMore(Order.OrderID)" class="btn btn-light">...</button></td>
                                <td><button @click="editOrder(Order.OrderID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delCart(Cart.CartID)">Delete</button></td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
               
            </table>
        </div>
    </div>
</template>

<style>
    thead {
    top: 0;
    position: sticky;
    }
    .action img{
        width: 24px;
        height: 24px;
        
    }
    .pull-right{
        float: right
    }
</style>