<script>
    import axios from 'axios';
    export default {
    // register child component
    components: {
    
    },
    data(){
      return{
        Orders: [],
        posts:[''],
        page:1,
        perPage:9,
        pages:[]
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/fetchAll`
      axios.get(apiUrl).then((res)=>{
        this.Orders=res.data
        this.posts=res.data
        // console.log(this.Orders)
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
            console.log(id)
            let apiUrl = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/delete/${id}`
            let resetArray = this.Orders.findIndex((i)=>i.OrderID ===id)
        
            if(window.confirm("Are you sure you want to delete Cart?")){
                axios.delete(apiUrl).then(()=>{
                    this.Orders.splice(resetArray, 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        setPages(){
            let numberOfPages = Math.ceil(this.Orders.length/this.perPage)
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
            return this.paginate(this.Orders)
        }
    },
    watch:{
        posts(){
            console.log('watch')
            this.setPages()
        }
    },
    filters:{
        // trimWords(value){
        //     return value.split(" ").split(0, 20).join(" ")+'...'
        // }
    }
  }
</script>
<template>
    <!-- <div class="container">
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
                                
                                <td><button @click="seeMore(Order.OrderID)" class="btn btn-light">...</button></td>
                                <td><button @click="editOrder(Order.OrderID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delCart(Order.OrderID)">Delete</button></td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
               
            </table>
        </div>
    </div> -->

    <div id="app" class="container">
  <div class="able-responsive-sm">
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
            <tr v-for="order in displayedPosts" :key="order">
                <!-- <td>{{displayedPosts}}</td> -->
                <td>{{order.OrderID}}</td>
                <td>{{order.FirstName}} {{order.LastName}} (#{{order.CustomerID}})</td>
                <td>{{order.CartID}}</td>
                <td>{{order.CalledBackValue}}</td>
                <td>{{order.Status}}</td>
                <td>{{order.PaymentStatus}}</td>
                
                <td>
            <tr>
                        <!-- <td><router-link :to="{name:'Order', query:{id:Order.OrderID, e:false}}" class="btn btn-light">...</router-link></td> -->
                        <td><button @click="seeMore(order.OrderID)" class="btn btn-light">...</button></td>
                        <td><button @click="editOrder(order.OrderID)" class="btn btn-secondary btn-sm">Edit</button></td>
                        <td><button class="btn btn-danger btn-sm" @click.prevent="delCart(order.OrderID)">Delete</button></td>
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