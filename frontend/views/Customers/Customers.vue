<script>
    // import Dashboard_nav from '../../src/components/Dashboard_nav.vue'
    // import * as filestack from 'filestack-js';
    import axios from 'axios';
    // const client = filestack.init('AFjicuE4KTkQYD5osjrBhz');
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
      let apiUrl="http://localhost:3000/Customers/fetchall"
      axios.get(apiUrl).then((res)=>{
        this.customers=res.data
      })
    },
    methods:{
        newCustomer(){
            this.$router.push('/Customer-form')
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
                        <!-- <th scope="col">Payment</th> -->
                        <!-- <th scope="col">Notes</th> -->
                        <!-- <th scope="col">Add</th>  -->
                        <th><button class="btn btn-success btn-sm" @click="newCustomer()">Add New Customer</button></th>
                        
                        <!-- <th scope="col">Delete</th> -->
                    </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                    <tr  v-for="customer in customers" :key="customer.CustomerID">
                        <td>{{customer.CustomerID}}</td>
                        <td>{{customer.FirstName}}</td>
                        <td>{{customer.LastName}}</td>
                        <td>{{customer.Email}}</td>
                        <td>{{customer.Phone}}</td>
                        <!-- <td>{{customer.PaymentType}}</td> -->
                        <!-- <td>{{customer.Notes}}</td> -->
                        <!-- <td></td> -->
                        <td>
                            <tr>
                                <!-- <td><button class="action"><img src="../public/assets/edit-button.png" /></button></td> -->
                                <td><button class="btn btn-light btn-sm">...</button></td>
                                <td><button class="btn btn-secondary btn-sm">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                            <!-- <ul class="action-list">
                                <li><a href="#" data-tip="edit"><i class="fa fa-edit"></i></a></li>
                                <li><a href="#" data-tip="delete"><i class="fa fa-trash"></i></a></li>
                            </ul> -->
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
        float: right;
        
    }

/* .action-list{
    padding: 0;
    margin: 0;
    list-style: none;
}

.action-list li{
    display: inline-block;
    margin: 0 5px;
}

.action-list li a{
    color: #fff;
    font-size: 15px;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease 0s;
}

.action-list li a:hover{
    text-shadow: 3px 3px 0 rgba(255,255,255,0.3); 
}

.action-list li a::before, .action-list li a:after{
    content: attr(data-tip);
    color: #fff;
    background-color: #111;
    font-size: 12px;
    padding: 5px 7px;
    border-radius: 4px;
    text-transform: capitalize;
    display: none;
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    top: -32px;
    transition: all 0.3s ease 0s;
}

.action-list li a:after{
    content: '';
    height: 15px;
    width: 15px;
    padding: 0;
    border-radius: 0;
    transform: translateX(-50%) rotate(45deg);
    top: -18px;
    z-index: -1;
}

.action-list li a:hover:before, .action-list li a:hover:after{
    display: block;
} */
</style>