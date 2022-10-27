<script>
  import axios from "axios";
  import {formatDateTimeFromSQLTOJS} from '../../../methods/format_date' 

  export default {
    components: {
      
    },
      //Storing the data being exported in a function
    data() {
      return {
        Orders: {
            CartID:''
        },
        // CartID: '',
        errors:[],
        items:[],
        formatted_date:[],
        formatted_delivery_date:[]
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
          let date = this.Orders.DateTimeOrdered
          let del_date = this.Orders.DeliveryDateTime
          this.formatted_date = formatDateTimeFromSQLTOJS(date)
          this.Orders.DeliveryDateTime = formatDateTimeFromSQLTOJS(del_date)[1]

        })
        .catch((error) => {
          console.log(error);
        })

        // let apiURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchAll`
        // axios.get(apiURL2).then((res)=>{
        //   this.Products = res.data
        // })
    },
    methods: {
      cancelEdit(id){
        this.$router.push({
                name:'Orders-View',
                query:{id:id}
            })
      },

      editProduct(id){
        this.$router.push({
            name:'cart-edit',
            query:{id:id}
        })
      },

      handleSubmitForm(oid){
        this.errors=[]
        //validations for required or formatted fields
        if(!this.Orders.OrderID){
            this.errors.push("OrderID is Required");
            }
        if(!this.Orders.CustomerID){
            this.errors.push("CustomerID  is Required");
            }
        if(!this.Orders.CartID){
            this.errors.push("CartID is Required");
            }
        if(!this.Orders.DateTimeOrdered){
            this.errors.push("Date is Required");
            }
        if(!this.Orders.ProductsJSON)
            this.errors.push("ProductJSON is Required.");

        if(!this.Orders.CustomerNotes)
        this.errors.push("Customer Notes is Required")

        if(!this.Orders.Status){
            this.errors.push("Status is Required");
            }

        
       
        this.Orders.ProductsJSON = JSON.stringify(this.items)
        // this.Orders.Subtotal=this.total
        //only run if no errors
        if(this.errors.length === 0){
            let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/update/${oid}`;
            axios.put(apiURL, this.Orders).then(() => {
              this.$router.push({
                name:'Orders',
                query:{id:this.Orders.OrderID}
            })
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
      <h1 class="mb-5">{{Orders.FirstName}} {{Orders.LastName}} (Cart ID#{{Orders.CartID}})</h1>
    <div class="wrapper m-5"></div>
      <div class="table1">
        <form @submit.prevent="handleSubmitForm(Orders.OrderID)" novalidate>
        <table class="table table-light caption-top">
          <caption>
            <strong>Order Information</strong>
          </caption>
          <tbody>
          <tr>
            <th>Orders ID</th>
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
            <td>{{formatted_date[1]}}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td><select class="form-select" v-model="Orders.Status" required>
                <option disabled value="">Select Option</option>
                <option>Order Recieved</option>
                <option>In-Progress</option>
                <option>Completed</option>
                <option>Awaiting Delivery</option>
                <option>Shipped</option>
                <option>Delivered</option>
            </select></td>
          </tr>
          <tr>
            <th>Payment</th>
            <td><select class="form-select" v-model="Orders.PaymentStatus" required>
                <option disabled value="">Select Option</option>
                <option>Awaiting Payment</option>
                <option>Pending Payment</option>
                <option>Paid in Full</option>
            </select></td>
          </tr>
          <tr>
            <th>Delivery Date</th>
            <td><input type="text" class="form-control" reauired min=1 v-model="Orders.DeliveryDateTime" 
              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
              <small id="phoneHelpBlock" class="form-text text-muted">
                YYYY-MM--DD
              </small>
            </td>
            <!-- <td>{{Orders.DeliveryDateTime}}</td> -->
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
            <th>Notes</th>
            <td><textarea class="form-control" rows="5" v-model="Orders.CustomerNotes" disabled></textarea></td>
          </tr>
        </tbody>
        </table>
        <p>**edit Order allows for modifying of Status, Delivery Date, Called back</p>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" class="btn btn-success me-md-2">Update</button>
            <button  @click="cancelEdit(Orders.OrderID)" class="btn btn-secondary" type="button">Cancel</button>
            <button @click="editProduct(Orders.CartID)" class="btn btn-small" type="button">Edit Product</button>
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