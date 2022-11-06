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
        posts:[''],
        page:1,
        perPage:9,
        pages:[]
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchall`
      axios.get(apiUrl).then((res)=>{
        this.Products=res.data
        this.posts = res.data
        console.log(this.Products)
      })
    },
    methods:{
        newProduct(){
            this.$router.push('/Product-form')
        },
        seeMore(id){
            this.$router.push({
                name:'Product',
                query:{id:id}
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
                path:'product-edit',
                query:{id:id}
            })
        },
        setPages(){
            let numberOfPages = Math.ceil(this.Products.length/this.perPage)
            
            for(let index = 1;index<=numberOfPages;index++){
                this.pages.push(index)
            }
            
        },
        paginate(posts){
            let page = this.page
            let perPage = this.perPage
            let from = (page*perPage)-perPage
            let to = (page*perPage)
            return posts.slice(from, to)
            
        },
        customOptions(){
            this.$router.push({
                path:'custom-options'
            })
        }
    },
    computed:{
        displayedPosts(){
            return this.paginate(this.Products)
        }
    },
    watch:{
        posts(){
            
            this.setPages()
        }
    },
    
  }
  
</script>

<template>
    <!-- <div class="container">
        <h1 class="text-center">All Products</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Product #</th>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                
                        <th><button class="btn btn-success btn-sm" @click="newProduct()">Add New Product</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Product in Products" :key="Product">
                        <td>{{Product.ProductID}}</td>
                        <td>{{Product.CategoryName}}</td>
                        <td>{{Product.ProductName}}</td>
                        <td>${{Product.Price}}</td>
                        
                        <td>
                            <tr>
                               
                                <td><button @click="seeMore(Product.ProductID)" class="btn btn-light">...</button></td>
                                <td><button @click="editProduct(Product.ProductID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delProduct(Product.ProductID)">Delete</button></td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> -->


    <div class="container">
        <h1 class="text-center mb-3">All Products</h1>
        <button class="btn btn-success btn-sm mb-3" @click="customOptions()">Custom Options</button>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Product #</th>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Active</th>
                        <th colspan="3"><button id="buttonWidth" class="btn btn-success btn-sm" @click="newProduct()">Add New Product</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Product in displayedPosts" :key="Product">
                        <td>{{Product.ProductID}}</td>
                        <td>{{Product.CategoryName}}</td>
                        <td>{{Product.ProductName}}</td>
                        <td>${{Product.Price}}</td>
                        <td>{{Product.Active}}</td>
                        <td><button id="buttonWidth" @click="seeMore(Product.ProductID)" class="btn btn-outline-secondary btn-sm">More</button></td>
                        <td><button id="buttonWidth" @click="editProduct(Product.ProductID)" class="btn btn-secondary btn-sm">Edit</button></td>
                        <td><button id="buttonWidth" class="btn btn-danger btn-sm" @click.prevent="delProduct(Product.ProductID)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul class="pagination mb-5">
            <li class="page-item" v-if="page != 1" @click="page--">
                <button type="button" class="page-link">Previous</button>
            </li>
            <li class="page-item">
                <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+4)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
            </li>
            

            <li class="page-item">
                <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
            </li> 
        </ul>
    </div>

</template>

<style>
#buttonWidth{
        width:100%;
    }
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

    /* pagination */
    button.page-link {
	display: inline-block;
    }
    button.page-link {
        font-size: 20px;
        color: #29b3ed;
        font-weight: 500;
    }
    .offset{
    width: 500px !important;
    margin: 20px auto;  
    }
</style>