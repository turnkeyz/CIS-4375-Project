<script>
    import axios from 'axios';
    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        Orders: [],
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/fetchall`
      axios.get(apiUrl).then((res)=>{
        this.Orders=res.data
      })
    },
    methods:{
        newOrder(){
            this.$router.push('/Product-form')
        },
        seeMore(id){
            this.$router.push({
                name:'Order',
                query:{id:id, e:false}
            })
        },
        
        delProduct(id){
            let apiUrl = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/delete/${id}`
            let resetArray = this.Orders.findIndex((i)=>i.OrderID ===id)
        
            if(window.confirm("Are you sure you want to delete Order?")){
                axios.delete(apiUrl).then(()=>{
                    this.Orders.splice(resetArray, 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        editProduct(id){
            this.$router.push({
                name:'Order',
                query:{id:id, e:true}
            })
        }
    },
    mounted(){
        if(!this.$parent.authenticated){
            this.$router.replace({name:"Login"})
        }
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
                        <th scope="col">#</th>
                        <th scope="col">CustomerID</th>
                        <th scope = "col">CartID</th>
                        <th scope="col">Contents</th>
                        <th scope="col">Status</th>
                
                        <th><button class="btn btn-success btn-sm" @click="newOrder()">Add New Order</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Order in Orders" :key="Order.OrderID">
                        <td>{{Order.OrderID}}</td>
                        <td>{{Order.CustomerID}}</td>
                        <td>{{Order.CartID}}</td>
                        <td>{{Order.Contents}}</td>
                        <td>{{Order.Status}}</td>
                        <td>
                            <tr>
                                <!-- <td><router-link :to="{name:'Order', query:{id:Order.OrderID, e:false}}" class="btn btn-light">...</router-link></td> -->
                                <td><button @click="seeMore(Order.OrderID)" class="btn btn-light">...</button></td>
                                <td><button @click="editProduct(Order.OrderID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delProduct(Order.OrderID)">Delete</button></td>
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