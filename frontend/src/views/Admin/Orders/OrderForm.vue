<script>
    import axios from "axios";
    import {yearMonthDay} from '../../../methods/regex'
    export default{
        data(){
            return{
                Orders:{
                    CartID: '',
                    DateTimeOrdered: '',
                    DeliveryDateTime:'',
                    Status: '',
                    PaymentStatus: '',
                },
                errors:[],
                cartIDs:[]
            }
        },

        created(){
            let apiURL=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/getIDs`
            axios.get(apiURL).then((res)=>{
            this.cartIDs = res.data
        // console.log(this.Products)

      })
        },
        methods:{
            handleSubmitForm() {
                this.errors=[]
                //validations for required or formatted fields
                if(!this.Orders.CartID){
                    this.errors.push("CartID Required");
                    return
                    }

                if(!this.Orders.DateTimeOrdered){
                    this.errors.push("Date Ordered Required");
                    }
                if(!yearMonthDay.test(this.Orders.DateTimeOrdered)){
                    this.errors.push("Date Ordered not in correct format")
                }

                if(this.Orders.DeliveryDateTime && !yearMonthDay.test(this.Orders.DateTimeOrdered)){
                    this.errors.push("Delivery Date not in correct format")
                }
                // if(!this.Orders.DeliveryDateTime)
                //     this.errors.push("Please enter a valid email.");
                console.log(typeof(this.Orders.DateTimeOrdered))
                if(!this.Orders.Status)
                this.errors.push("Status is Required")

                if (!this.Orders.PaymentStatus)
                this.errors.push("Payment Status is Required");
                // console.log(this.Orders)
            //only run if no errors
            if(this.errors.length === 0){
                let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/add`;
                axios.post(apiURL, this.Orders).then(() => {
                this.$router.push('/orders') //goes to customers view
                this.Orders = {
                    CartID: '',
                    DateTimeOrdered: '',
                    DeliveryDateTime:'',
                    Status: '',
                    PaymentStatus: '',
                }
                }).catch(error => {
                    console.log(error)
                });
                }
            },

        }
    }
</script>

<template>
     <div class="container">
    <div>
        <h1 class="text-center">New Order Form</h1>
        <!-- create volunteer  -->
        <form @submit.prevent="handleSubmitForm" novalidate>
            <!-- display fields for personal information form creation and update with v-model-->
            <fieldset class='form-control mb-5'>
                <legend></legend>
                <div class='row mb-4'>
                    <div class='col-sm-2'>
                        <label for=''>*Cart ID</label>
                        <select class='form-select' v-model="Orders.CartID">
                            <option disabled value="">Select option</option>
                            <option v-for="cart in cartIDs" :key="cart.CartID" :value="cart.CartID">
                                {{cart.CartID}}
                            </option>
                        </select>

                    </div>
                    <div class='col-sm-4'>
                        <label>*Date Ordered</label>
                        <input type="text" class="form-control" reauired min=1 v-model="Orders.DateTimeOrdered">
                        <small id="phoneHelpBlock" class="form-text text-muted">
                            YYYY-MM--DD
                        </small>
                    </div>    
                    <div class='col-sm-4'>
                        <label>Delivery Date</label>
                        <input type="text" class="form-control" v-model="Orders.DeliveryDateTime">
                        <small id="phoneHelpBlock" class="form-text text-muted">
                            YYYY-MM--DD
                        </small>

                        <div class='valid-feedback'></div>
                    </div>
                </div>
                <div class='row mb-4'>

                    <div class="col-sm-2">
                    <label>Call Back</label>
                    <select class="form-select" v-model="Orders.CalledBackValue" required>
                        <option disabled value="">Select Option</option>
                        <option value=1>Yes</option>
                        <option value=0>No</option>
                    </select>
                </div>
                <div class="col-sm-4">
                    <label>*Status</label>
                    <select class="form-select" v-model="Orders.Status" required>
                        <option disabled value="">Select Option</option>
                        <option>Order Recieved</option>
                        <option>In-Progress</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <label>*Payment</label>
                    <select class="form-select" v-model="Orders.PaymentStatus" required>
                        <option disabled value="">Select Option</option>
                        <option>Awaiting Payment</option>
                        <option>Pending Payment</option>
                        <option>Paid in Full</option>
                        <option>Canceled</option>
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

            <button class="btn btn-success create" >Create</button>

        </form>
        
    </div>
</div>
</template>