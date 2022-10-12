<script>
    import axios from 'axios';
    import {regex} from '../../src/methods/regex'
    import {emailregex} from '../../src/methods/regex'
    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        customers: [],
        customers: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    pay_type:'',
                    notes:''
                },
                errors:[]
      }
    },
    created(){
      
    },
    methods: {
            //create new volunteer and reset values
            handleSubmitForm() {
                this.errors=[]
                //validations for required or formatted fields
                if(!this.customers.firstname){
                    this.errors.push("First Name Required");
                    }

                if(!this.customers.lastname){
                    this.errors.push("Last Name Required");
                    }
                
                if(!emailregex.test(this.customers.email))
                    this.errors.push("Please enter a valid email.");

                if(!this.customers.phone)
                this.errors.push("phone is Required")

                if (!regex.test(this.customers.phone))
                this.errors.push("Please use correct phone number format.");

                if(!this.customers.pay_type){
                    this.errors.push("Payment type  is Required");
                    }
                if(!this.customers.notes){
                    this.errors.push("notes is Required");
                    }

            //only run if no errors
            if(this.errors.length === 0){
                let apiURL = 'http://localhost:3000/Customers/add';
                axios.post(apiURL, this.customers).then(() => {
                this.$router.push('/customers') //goes to customers view
                this.customers = {
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    pay_type:'',
                    notes:'',
                }
                }).catch(error => {
                    console.log(error)
                });
                }
            }
        } 
  }
</script>

<template>
    <div class="container">
    <div>
        <h1 class="text-center">New Customer Form</h1>
        <!-- create volunteer  -->
        <form @submit.prevent="handleSubmitForm" novalidate>
            <!-- display fields for personal information form creation and update with v-model-->
            <fieldset class='form-control mb-5'>
                <legend>Personal Information</legend>
                <div class='row mb-4'>
                    <div class='col-sm-4'>
                        <label for='fName'>*First Name</label>
                        <input type="text" id='fName' class="form-control" v-model="customers.firstname" required>
                    </div>
                    <div class='col-sm-4'>
                        <label>Middle Name</label>
                        <input type="text" class="form-control">
                    </div>    
                    <div class='col-sm-4'>
                        <label>*Last Name</label>
                        <input type="text" class="form-control" v-model="customers.lastname" required>
                        <div class='valid-feedback'></div>
                    </div>
                </div>
                <div class='row mb-4'>
                <div class="col-sm-6">
                    <label>*Phone</label>
                        <input type="text" class="form-control" placeholder="XXX-XXX-XXXX" v-model="customers.phone" required>
                        <small id="phoneHelpBlock" class="form-text text-muted">
                        9 digit phone number should be entered with dashes
                        </small>
                    </div>

                    <div class="col-sm-3">
                        <label>*Email</label>
                        <input type="email" class="form-control" v-model="customers.email" required>
                        <small id="phoneHelpBlock" class="form-text text-muted">
                        example@email.com
                        </small>
                    </div>
                </div>
            </fieldset>
            <fieldset class='form-control mb-5'>
                <legend>Admin</legend>
                <div class='row mb-4'>
                    <div class="col-sm-12">
                        <label class="form-label">Notes</label>
                        <textarea class="form-control" rows="5" v-model="customers.notes"></textarea>
                    </div>
                    
                </div>
                <div class='row mb-4'>
                    <div class="col-sm-3">
                        <label>Payment type</label>
                        <select class='form-select' v-model="customers.pay_type">
                            <option disabled value="">Select option</option>
                            <option>Cash</option>
                            <option>Credit</option>
                            <option>Check</option>
                            <option>Money Order</option>
                            <option>Crypto Currency</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
            </fieldset>

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }} </li>
                </ul>
            </p>
            <button class="btn mb-5 create" >Create</button>
        </form>
        
    </div>
</div>
</template>