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
        posts:[''],
        page:1,
        perPage:9,
        pages:[]
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/fetchAll`
      axios.get(apiUrl).then((res)=>{
        this.Cart=res.data
        this.posts=res.data
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
        },
        setPages(){
            let numberOfPages = Math.ceil(this.Cart.length/this.perPage)
            console.log('number of pages', numberOfPages)
            for(let index = 1;index<=numberOfPages;index++){
                this.pages.push(index)
            }
            console.log('pages', this.pages)
        },
        paginate(posts){
            let page = this.page
            let perPage = this.perPage
            let from = (page*perPage)-perPage
            let to = (page*perPage)
            return posts.slice(from, to)
            
        }
    },
    computed:{
        displayedPosts(){
            return this.paginate(this.Cart)
        }
    },
    watch:{
        posts(){
            console.log('watch')
            this.setPages()
        }
    },
  }
</script>

<template>
    <!-- <div class="container">
        <h1 class="text-center">All Carts</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Cart #</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Custom</th>
                
                        <th><button class="btn btn-success btn-sm" @click="newCart()">Add New Cart</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Cart in Cart" :key="Cart.CartID">
                        <td>{{Cart.CartID}} </td>
                        <td>(#{{Cart.CustomerID}}) {{Cart.FirstName}} {{Cart.LastName}}</td>
                        <td>${{Cart.Subtotal}}</td>
                        <td>{{Cart.Customization}}</td>
                        <td>
                            <tr>
                                
                                <td><button @click="seeMore(Cart.CartID)" class="btn btn-light">...</button></td>
                                <td><button @click="editCart(Cart.CartID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delCart(Cart.CartID)">Delete</button></td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> -->


    <div class="container">
        <h1 class="text-center">All Carts</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Cart #</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Custom</th>
                
                        <th><button class="btn btn-success btn-sm" @click="newCart()">Add New Cart</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="Cart in displayedPosts" :key="Cart.CartID">
                        <td>{{Cart.CartID}} </td>
                        <td>(#{{Cart.CustomerID}}) {{Cart.FirstName}} {{Cart.LastName}}</td>
                        <td>${{Cart.Subtotal}}</td>
                        <td class="table-info" v-if="Cart.Customization==true">{{Cart.Customization}}</td>
                        <td v-if="Cart.Customization==false">{{Cart.Customization}}</td>
                        <td>
                            <tr>
                                <!-- <td><router-link :to="{name:'Cart', query:{id:Cart.CartID, e:false}}" class="btn btn-light">...</router-link></td> -->
                                <td><button @click="seeMore(Cart.CartID)" class="btn btn-light">...</button></td>
                                <td><button @click="editCart(Cart.CartID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <!-- <td><button class="btn btn-danger btn-sm" @click.prevent="delCart(Cart.CartID)">Delete</button></td> -->
                            </tr>
                        </td>
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