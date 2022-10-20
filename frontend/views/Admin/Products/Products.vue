<script>
    import axios from 'axios';
    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        Products: [],
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchall`
      axios.get(apiUrl).then((res)=>{
        this.Products=res.data
      })
    },
    methods:{
        newProduct(){
            this.$router.push('/Product-form')
        },
        seeMore(id){
            this.$router.push({
                name:'Product',
                query:{id:id, e:false}
            })
        },
        
        delProduct(id){
            let apiUrl = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/delete/${id}`
            let resetArray = this.Products.findIndex((i)=>i.ProductID ===id)
        
            if(window.confirm("Are you sure you want to delete Product?")){
                axios.delete(apiUrl).then(()=>{
                    this.Products.splice(resetArray, 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        editProduct(id){
            this.$router.push({
                name:'Product',
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
        <h1 class="text-center">All Products</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                
                        <th><button class="btn btn-success btn-sm" @click="newProduct()">Add New Product</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Product in Products" :key="Product.ProductID">
                        <td>{{Product.ProductID}}</td>
                        <td>{{Product.CategoryID}}</td>
                        <td>{{Product.ProductName}}</td>
                        <td>{{Product.Price}}</td>
                        <td>
                            <tr>
                                <!-- <td><router-link :to="{name:'Product', query:{id:Product.ProductID, e:false}}" class="btn btn-light">...</router-link></td> -->
                                <td><button @click="seeMore(Product.ProductID)" class="btn btn-light">...</button></td>
                                <td><button @click="editProduct(Product.ProductID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delProduct(Product.ProductID)">Delete</button></td>
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