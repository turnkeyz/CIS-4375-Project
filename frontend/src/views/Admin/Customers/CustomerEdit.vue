<script>
import axios from "axios";

import {regex, emailregex} from '../../../methods/regex'


export default {
  components: {
    
  },
    //Storing the data being exported in a function
  data() {
    return {
      customers: {},
      errors:[],
      edit:""
    };
  },
  mounted(){
        
    },

      //created function
  created() {
    let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customer/${this.$route.query.id}`;
    axios.get(apiURL).then((res) => {
        this.customers = res.data[0];
        if(this.$route.query.e === true || this.$route.query.e === 'true'){
          this.edit=true
        }else{
          this.edit=false
        }
      })
      .catch((error) => {
        console.log(error);
      })

  },
  methods: {
    delCustomer(id) {
      
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/customers/delete/${id}`;
      if (window.confirm("Are you sure you want to delete?")) {
        axios.delete(apiURL).then(() => {
            this.$router.push("/customers");  //changes view to all customers view
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    addCustomer(){
      this.$router.push('/customer-form')
    },
    cancelEdit(id){
      this.$router.push({
        name:'Customer',
        query:{id:id}
      })
    },
    goBack(){
      this.$router.go(-1)
    },
    handleSubmitForm(id){
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
                if(!this.customers.Notes){
                    this.errors.push("notes is Required");
                    }

            //only run if no errors
            if(this.errors.length === 0){
                let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/update/${id}`;
                axios.put(apiURL, this.customers).then(() => {
                this.$router.push({
                  path:'customer',
                  query:{id:id}
                })
                }).catch(error => {
                    console.log(error)
                });
                }
    }
  },
};
</script>

<template>
    <div class="container mb-5">
      <h1 class="mb-5">Edit Customer ID#{{customers.CustomerID}}</h1>
    <div class="wrapper m-5"></div>
      <div class="table1">
        <form @submit.prevent="handleSubmitForm(customers.CustomerID)" novalidate>
        <table class="table table-light caption-top">
          <caption>
            <strong>Customer Information</strong>
          </caption>
          <tbody>
          <tr>
            <th>Customer ID</th>
            <td>{{ customers.CustomerID }}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td><input type="text" id='fName' class="form-control" v-model="customers.FirstName" required></td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td><input type="text" class="form-control" v-model="customers.LastName" required></td>
          </tr>
          <tr>
            <th>Email</th>
            <td><input type="email" class="form-control" v-model="customers.Email" required>
              <small id="phoneHelpBlock" class="form-text text-muted">
              example@email.com
              </small></td>
          </tr>
          <tr>
            <th>Phone</th>
            <td><input type="text" class="form-control" placeholder="XXX-XXX-XXXX" v-model="customers.Phone" required>
              <small id="phoneHelpBlock" class="form-text text-muted">
              9 digit phone number should be entered with dashes
              </small></td>
          </tr>
          <tr>
            <th>Payment Type</th>
            <td><select class='form-select' v-model="customers.PaymentType">
                  <option disabled value="">Select option</option>
                  <option>Cash</option>
                  <option>Credit</option>
                  <option>Check</option>
                  <option>Money Order</option>
                  <option>Crypto Currency</option>
                  <option>Other</option>
              </select></td>
          </tr>
          <tr>
            <th>Notes</th>
            <td><textarea class="form-control" rows="5" v-model="customers.Notes"></textarea></td>
          </tr>
        </tbody>
        </table>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
            <button type="submit" class="btn btn-success me-md-2">Update</button>
            <button  @click="cancelEdit(customers.CustomerID)" class="btn btn-secondary" type="button">Cancel</button>
          </div>
        </form>
      <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }} </li>
                </ul>
            </p>
      </div>
    </div>
  
</template>