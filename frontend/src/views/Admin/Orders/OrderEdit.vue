<script>
  import axios from "axios";
  import {formatDateTimeFromSQLTOJS} from '../../../methods/format_date' 
  import {yearMonthDay} from '../../../methods/regex'

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
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/fetchOne/${this.$route.query.id}`;
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
            query:{id:id, e:true}
        })
      },

      handleSubmitForm(oid){
        console.log(this.Orders.DeliveryDateTime)
        this.errors=[]
        //validations for required or formatted fields
       

        if(this.Orders.DeliveryDateTime && !yearMonthDay.test(this.Orders.DeliveryDateTime)){
            this.errors.push("Delivery Date not in correct format")
        }
        
        if(!this.Orders.DeliveryDateTime){
            delete this.Orders.DeliveryDateTime
        }
        if(!this.Orders.Status){
        this.errors.push("Status is Required")
    }

        if(!this.Orders.Status){
            this.errors.push("Status is Required");
            }

            if (!this.Orders.PaymentStatus){
                this.errors.push("Payment Status is Required");
            }
       
        this.Orders.ProductsJSON = JSON.stringify(this.items)
        
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
      <h1 class="mb-5">Order Edit ID#{{Orders.CartID}}</h1>
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
            <!-- <td>{{Orders.CalledBackValue}}</td> -->
            <td><select class="form-select" v-model="Orders.CalledBackValue" required>
                <option value=true>Yes</option>
                <option value=false>No</option>
            </select></td>
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
                <option>Canceled</option>
                <!-- <option>Awaiting Delivery</option>
                <option>Shipped</option>
                <option>Delivered</option> -->
            </select></td>
          </tr>
          <tr>
            <th>Payment</th>
            <td><select class="form-select" v-model="Orders.PaymentStatus" required>
                <option disabled value="">Select Option</option>
                <option>Awaiting Payment</option>
                <option>Pending Payment</option>
                <option>Paid in Full</option>
                <option>Canceled</option>
            </select></td>
          </tr>
          <tr>
            <th>Delivery Date</th>
            <td><input type="text" class="form-control" reauired min=1 v-model="Orders.DeliveryDateTime">
              <small id="phoneHelpBlock" class="form-text text-muted">
                YYYY-MM--DD
              </small>
            </td>
            <!-- <td>{{Orders.DeliveryDateTime}}</td> -->
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
            <th>Notes</th>
            <td><textarea class="form-control" rows="5" v-model="Orders.CustomerNotes" disabled></textarea></td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="3">**edit Cart allows for changes in Notes and Products.</td>
          </tr>
        </tfoot>

        </table>
        <p></p>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
            <button type="submit" class="btn btn-success me-md-2">Update</button>
            <button @click="editProduct(Orders.CartID)" class="btn btn-secondary me-md-2" type="button">Edit Cart</button>
            <button  @click="cancelEdit(Orders.OrderID)" class="btn btn-secondary" type="button">Cancel</button>
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

