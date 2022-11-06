<script>
    import axios from 'axios';

    import {regex, emailregex} from '../../../methods/regex'


    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        // customers: [],
        customers: {
                    FirstName: '',
                    LastName: '',
                    Email: '',
                    Phone: '',
                    PaymentType:'',
                    Notes:''

                },
                errors:[]
      }
    },
    created(){
      
    },
    mounted(){
        
    },

    methods: {
            //create new volunteer and reset values
        handleSubmitForm() {
            let myAlert = document.getElementById('submitToast')
            let submitAlert = new bootstrap.Toast(myAlert)
            this.errors=[]
            //validations for required or formatted fields
            if(!this.customers.FirstName){
                this.errors.push("First Name Required");
                }

            if(!this.customers.LastName){
                this.errors.push("Last Name Required");
                }
            
            if(!emailregex.test(this.customers.Email))
                this.errors.push("Please enter a valid email.");

            if(!this.customers.Phone)
            this.errors.push("phone is Required")

            if (!regex.test(this.customers.Phone))
            this.errors.push("Please use correct phone number format.");

            if(!this.customers.PaymentType){
                this.errors.push("Payment type  is Required");
                }
            

        //only run if no errors
        if(this.errors.length === 0){
            let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/add`;
            axios.post(apiURL, this.customers).then(() => {
            submitAlert.show()
            this.$router.push('/customers') //goes to customers view
            this.reset()
            }).catch(error => {
                console.log(error)
            });
            }
        },
        reset(){
            this.customers = {
                FirstName: '',
                LastName: '',
                Email: '',
                Phone: '',
                PaymentType:'',
                Notes:'',

            }
        }
        } 
  }
</script>

<template>
    <div class="container-sm">
    <div>
        <h1 class="text-center">New Customer Form</h1>

        <div class="toast align-items-center text-white bg-primary border-0" id="submitToast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                Hello, world! This is a toast message.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>

        
        <form @submit.prevent="handleSubmitForm" novalidate>
            <!-- display fields for personal information form creation and update with v-model-->
            <fieldset class='form-control mb-5'>
                <legend>Personal Information</legend>
                <div class='row mb-4'>
                    <div class='col-sm-4'>
                        <label for='fName'>*First Name</label>

                        <input type="text" id='fName' class="form-control" v-model="customers.FirstName" required>

                    </div>
                    <!-- <div class='col-sm-4'>
                        <label>Middle Name</label>
                        <input type="text" class="form-control">
                    </div>     -->
                    <div class='col-sm-4'>
                        <label>*Last Name</label>

                        <input type="text" class="form-control" v-model="customers.LastName" required>

                        <div class='valid-feedback'></div>
                    </div>
                </div>
                <div class='row mb-4'>
                <div class="col-sm-4">
                    <label>*Phone</label>

                        <input type="text" class="form-control" placeholder="XXX-XXX-XXXX" v-model="customers.Phone" required>

                        <small id="phoneHelpBlock" class="form-text text-muted">
                            xxx-xxx-xxxx **dashes required
                        </small>
                    </div>

                    <div class="col-sm-4">
                        <label>*Email</label>
                        <input type="email" class="form-control" v-model="customers.Email" required>
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
                        <textarea class="form-control" rows="5" v-model="customers.Notes"></textarea>
                    </div>
                    
                </div>
                <div class='row mb-4'>
                    <div class="col-sm-3">
                        <label>*Payment type</label>

                        <select class='form-select' v-model="customers.PaymentType">
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
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
                <button  class="btn btn-success create" >Create</button>
                <button type="button" @click="reset" class="btn btn-secondary create" >Clear</button>
            </div>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }} </li>
                </ul>
            </p>

            

        </form>
        
    </div>
</div>
</template>