<script>
  import axios from "axios";
  import {formatDateTimeFromSQLTOJS} from '../../../methods/format_date' 
  import {sendInvoice} from '../../../methods/send_email'
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
        items:[],
        formatted_delivery_date:[]
      };
    },
    mounted(){
          
      },
        //created function
    created() {
    // Variable that stores the "find specific employee" route
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/fetchOne/${this.$route.query.id}`;
      axios.get(apiURL).then((res) => {
          this.Orders = res.data[0];
          this.items = JSON.parse(this.Orders.ProductsJSON)
          let date = this.Orders.DateTimeOrdered
          let del_date = this.Orders.DeliveryDateTime
          this.formatted_date = formatDateTimeFromSQLTOJS(date)
          this.formatted_delivery_date = formatDateTimeFromSQLTOJS(del_date)
          // console.log(this.Orders)
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
            axios.put(apiURL, this.Orders).then(() => {
            this.edit=false
            }).catch(error => {
                console.log(error)
            });
        }
      },
      sendUpdate(){
        sendInvoice(this.Orders)
        // console.log('not connected')
      }
    },
  };
</script>

<template>
    <div class="container">
    <h1 class="mb-5">Order View ID#{{Orders.OrderID}}</h1>
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
            <td>{{formatted_date[0]}}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{{Orders.Status}}</td>
          </tr>
          <tr>
            <th>Payment</th>
            <td>{{Orders.PaymentStatus}}</td>
          </tr>
          <tr>
            <th>Delivery Date</th>
            <td>{{formatted_delivery_date[0]}}</td>
          </tr>
          <tr>
            <th>Products</th>
            <tr class="d-flex p-2 bd-highlight" v-for="item in items" :key="item">({{item.ProductID}}) {{item.ProductName}} x{{item.Quantity}}</tr>
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
        <tfoot>
          <tr>
            <td colspan="3">**edit Cart allows for modifying of Products, Subtotal, Customer Notes, & CustomerID</td>
          </tr>
          <tr>
            <td colspan="3">**edit Order allows for modifying of Status, Delivery Date, Call backs, & Payment</td>
          </tr>
        </tfoot>
      </table>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button @click="showEdit(Orders.OrderID)" class="btn btn-secondary me-md-2">Edit</button>
        <button @click="cancelShow()" class="btn btn-primary me-md-2">Cancel</button>
        <button @click="sendUpdate()" class="btn btn-primary">Send Invoice</button>
      </div>
    </div>
</template>

