<script>
import axios from "axios";
//Used to export modules, objects, functions and variables to be used elsewhere
export default {
  components: {
    
  },
    //Storing the data being exported in a function
  data() {
    return {
      customers: {}
    };
  },
      //created function
  created() {
   // Variable that stores the "find specific employee" route
    let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/${this.$route.query.id}`;
    axios.get(apiURL).then((res) => {
        this.customers = res.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    delCustomer(id) {
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/customers/delete/${id}`;
//confirm if the user is sure they want to delete before deleting
      if (window.confirm("Are you sure you want to delete?")) {
        axios.delete(apiURL).then(() => {
            this.$router.push("/customers");  //changes view to all customers view
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<template>
    <div class="container">
    <h1 class="mb-5">{{customers.FirstName}} {{customers.LastName}} ID#{{customers.CustomerID}}</h1>
    <div class="wrapper m-5"></div>
    <div class="table1">
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
            <td>{{ customers.FirstName }}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{{ customers.LastName }}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{{customers.Email}}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ customers.Phone }}</td>
          </tr>
          <tr>
            <th>Payment Type</th>
            <td>{{ customers.PaymentType }}</td>
          </tr>
          <tr>
            <th>Notes</th>
            <td>{{ customers.Notes }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
</template>