<script>
    import axios from 'axios';
    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        Cart: [],
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/fetchAll`
      axios.get(apiUrl).then((res)=>{
        this.Cart=res.data
      })
    },
    methods:{
        newCart(){
            this.$router.push('/Cart-form')
        },
        seeMore(id){
            this.$router.push({
                name:'Cart',
                query:{id:id}
            })
        },
        
        delCart(id){
            let apiUrl = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/delete/${id}`
            let resetArray = this.Cart.findIndex((i)=>i.CartID ===id)
        
            if(window.confirm("Are you sure you want to delete Cart?")){
                axios.delete(apiUrl).then(()=>{
                    this.Cart.splice(resetArray, 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        editCart(id){
            this.$router.push({
                name:'cart-edit',
                query:{id:id}
            })
        }
    },
    mounted(){
    
    }
  }
</script>

<template>
    <div class="container">
        <h1 class="text-center">All Carts</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Custom</th>
                
                        <th><button class="btn btn-success btn-sm" @click="newCart()">Add New Cart</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Cart in Cart" :key="Cart.CartID">
                        <td>{{Cart.CartID}}</td>
                        <td>{{Cart.CustomerID}}</td>
                        <td>{{Cart.Subtotal}}</td>
                        <td>{{Cart.Customization}}</td>
                        <td>
                            <tr>
                                <!-- <td><router-link :to="{name:'Cart', query:{id:Cart.CartID, e:false}}" class="btn btn-light">...</router-link></td> -->
                                <td><button @click="seeMore(Cart.CartID)" class="btn btn-light">...</button></td>
                                <td><button @click="editCart(Cart.CartID)" class="btn btn-secondary btn-sm">Edit</button></td>
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