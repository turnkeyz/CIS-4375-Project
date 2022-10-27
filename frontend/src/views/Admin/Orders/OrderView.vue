<script>
  import axios from "axios";

  export default {
    components: {
      
    },


      //Storing the data being exported in a function
    data() {
      return {
        Orders: {},
        errors:[],
        edit:"",
        formatted_date:[],
        items:[]
      };
    },
    mounted(){
          
      },
        //created function
    created() {
    // Variable that stores the "find specific employee" route
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/${this.$route.query.id}`;
      axios.get(apiURL).then((res) => {
          this.Orders = res.data[0];
          this.items = JSON.parse(this.Orders.ProductsJSON)

          function formatDate(date){
            var arr1 = date.split('-')
            var year = arr1[0]
            var month = arr1[1]
            var arr2 = arr1[2].split(':')
            var day = arr2[0].slice(0,2)
            var min = arr2[1]
            var hour = arr2[0].slice(3,5)
            let new_date = `${month}/${day}/${year}`
            let new_time = `${hour}:${min}`
            return [new_date, new_time]

          }
          let date = this.Orders.DateTimeOrdered
          this.formatted_date = formatDate(date)
          
          console.log(this.Orders)
          // if(this.$route.query.e === true || this.$route.query.e === 'true'){
          //   this.edit=true
          // }else{
          //   this.edit=false
          // }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    methods: {
      // delOrder(id) {
      //   let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/delete/${id}`;
      //   if (window.confirm("Are you sure you want to delete?")) {
      //     axios.delete(apiURL).then(() => {
      //         this.$router.push("/Orders");  //changes view to all Orders view
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   }
      // },
      // addOrder(){
      //   this.$router.push('/Order-form')
      // },
      showEdit(id){
        this.$router.push({
          name:'orders-edit',
          query:{id:id}
        })
      },

      cancelShow(){
        this.$router.push({
          name:'Orders'
        })
      },
      // cancelEdit(){
      //   this.edit=false
      // },
      handleSubmitForm(pid){
        this.errors=[]
        //validations for required or formatted fields
        if(!this.Orders.OrderID){
            this.errors.push("Category is Required");
            }
        if(!this.Orders.CustomerID)
            this.errors.push("Name is Required.");

        if(!this.Orders.CartID)
        this.errors.push("Price is Required")

        if(!this.Orders.DateTimeOrdered){
            this.errors.push("Order Description is Required");
            }
        if(!this.Orders.Products){
            this.errors.push("Image url required");
        }
        if(!this.Orders.CustomerNotes){
          this.errors.push("Please input Notes!")
        }
        if(!this.Orders.Status){
          this.errors.push("Please input Status from the Dropwdown")
        }

        //only run if no errors
        if(this.errors.length === 0){
            let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/update/${pid}`;
            console.log('line 86', apiURL)
            axios.put(apiURL, this.Orders).then(() => {
            this.edit=false
            }).catch(error => {
                console.log(error)
            });
        }
      },
    },
  };
</script>

<template>
    <div class="container">
    <h1 class="mb-5">ID#{{Orders.OrderID}}</h1>
    <div class="wrapper m-5"></div>
    <div class="table1">
      <table class="table table-light caption-top">
        <caption>
          <strong>Order Information</strong>
        </caption>
        <tbody>
          <tr>
            <th>Order ID</th>
            <td>{{ Orders.OrderID }}</td>
          </tr>
          <tr>
            <th>Customer ID/Name</th>
            <td>({{ Orders.CustomerID }}) {{Orders.FirstName}} {{Orders.LastName}}</td>
          </tr>
          <tr>
            <th>Cart ID</th>
            <td>{{ Orders.CartID }}</td>
          </tr>
          <tr>
            <th>Called Back?</th>
            <td>{{Orders.CalledBackValue}}</td>
          </tr>
          <tr>
            <th>Date Ordered</th>
            <td>{{formatted_date[0]}} ({{formatted_date[1]}})</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{{Orders.Status}}</td>
          </tr>
          <tr>
            <th>Payment</th>
            <td></td>
          </tr>
          <tr>
            <th>Delivery Date</th>
            <td>{{Orders.DeliveryDateTime}}</td>
          </tr>
          <tr>
            <th>Products</th>
            <tr v-for="item in items" :key="item">({{item.ProductID}}) {{item.ProductName}} x{{item.Quantity}}</tr>
          </tr>
          <tr>
            <th>Subtotal</th>
            <td>${{Orders.Subtotal}}</td>
          </tr>
          <tr>
            <th>Customer Notes</th>
            <td><textarea disabled class="form-control" rows="5" v-model="Orders.CustomerNotes"></textarea></td>
          </tr>
        </tbody>
      </table>
      <p>**edit cart allows for modifying of Products, Subtotal, Customer Notes, CustomerID</p>
      <p>**edit Order allows for modifying of Status, Delivery Date, Called back</p>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button @click="showEdit(Orders.OrderID)" class="btn btn-secondary me-md-2">Edit</button>
        <button @click="cancelShow()" class="btn btn-primary me-md-2">Back</button>
      </div>
    </div>
</template>