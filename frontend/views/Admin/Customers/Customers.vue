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
        new_entry:false
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/fetchall`
      axios.get(apiUrl).then((res)=>{
        this.customers=res.data
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
        <div class="table-responsive-sm">
            <table class="table table-hover table-responsive table-bordered">
                <thead class="table-light">
                    <tr>
                        <th scope="col">#</th>
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