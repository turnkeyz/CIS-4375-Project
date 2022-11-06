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
                query:{id:id}
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
                name:'Customer-edit',
                query:{id:id}
            })
        },
        setPages(){
            let numberOfPages = Math.ceil(this.customers.length/this.perPage)
            
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
            
        }
    },
    computed:{
        displayedPosts(){
            return this.paginate(this.customers)
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
                        <th colspan="2"><button id="buttonWidth" class="btn btn-success btn-sm" @click="newCustomer()">Add New Customer</button></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr v-for="customer in displayedPosts" :key="customer.CustomerID">
                        <td>{{customer.CustomerID}}</td>
                        <td>{{customer.FirstName}}</td>
                        <td>{{customer.LastName}}</td>
                        <td>{{customer.Email}}</td>
                        <td>{{customer.Phone}}</td>
                        <!-- <td> -->
                            <!-- <tr >
                                
                                <td><button @click="seeMore(customer.CustomerID)" class="btn btn-outline-secondary btn-block">More</button></td>
                                <td><button @click="editCustomer(customer.CustomerID)" class="btn btn-secondary btn-block">Edit</button></td>
                                
                            </tr> -->

                        <!-- </td> -->
                        <td><button id="buttonWidth" @click="seeMore(customer.CustomerID)" class="btn btn-outline-secondary btn-sm">More</button></td>
                        <td><button id="buttonWidth"  @click="editCustomer(customer.CustomerID)" class="btn btn-secondary btn-sm">Edit</button></td>
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