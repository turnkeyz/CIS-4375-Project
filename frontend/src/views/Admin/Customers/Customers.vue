<script>
    import axios from 'axios';
    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        customers: [],
        new_entry:false,
        posts:[''],
        page:1,
        perPage:9,
        pages:[]
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/fetchall`
      axios.get(apiUrl).then((res)=>{
        this.customers=res.data
        this.posts = res.data
      })
    },
    methods:{
        newCustomer(){
            this.$router.push('/Customer-form')
        },
        seeMore(id){
            this.$router.push({
                name:'Customer',
                query:{id:id, e:false}
            })
        },
        
        delCustomer(id){
            let apiUrl = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/delete/${id}`
            let resetArray = this.customers.findIndex((i)=>i.CustomerID ===id)
        
            if(window.confirm("Are you sure you want to delete Customer?")){
                axios.delete(apiUrl).then(()=>{
                    this.customers.splice(resetArray, 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        editCustomer(id){
            this.$router.push({
                name:'Customer',
                query:{id:id, e:true}
            })
        },
        setPages(){
            let numberOfPages = Math.ceil(this.customers.length/this.perPage)
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
            return this.paginate(this.customers)
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
        <h1 class="text-center">All Customers</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Customer #</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th><button class="btn btn-success btn-sm" @click="newCustomer()">Add New Customer</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="customer in customers" :key="customer.CustomerID">
                        <td>{{customer.CustomerID}}</td>
                        <td>{{customer.FirstName}}</td>
                        <td>{{customer.LastName}}</td>
                        <td>{{customer.Email}}</td>
                        <td>{{customer.Phone}}</td>
                        <td>
                            <tr>
                                
                                <td><button @click="seeMore(customer.CustomerID)" class="btn btn-light">...</button></td>
                                <td><button @click="editCustomer(customer.CustomerID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delCustomer(customer.CustomerID)">Delete</button></td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> -->


    <div class="container">
        <h1 class="text-center">All Customers</h1>
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Customer #</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th><button class="btn btn-success btn-sm" @click="newCustomer()">Add New Customer</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="customer in displayedPosts" :key="customer.CustomerID">
                        <td>{{customer.CustomerID}}</td>
                        <td>{{customer.FirstName}}</td>
                        <td>{{customer.LastName}}</td>
                        <td>{{customer.Email}}</td>
                        <td>{{customer.Phone}}</td>
                        <td>
                            <tr>
                                <!-- <td><router-link :to="{name:'Customer', query:{id:customer.CustomerID, e:false}}" class="btn btn-light">...</router-link></td> -->
                                <td><button @click="seeMore(customer.CustomerID)" class="btn btn-light">...</button></td>
                                <td><button @click="editCustomer(customer.CustomerID)" class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" @click.prevent="delCustomer(customer.CustomerID)">Delete</button></td>
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