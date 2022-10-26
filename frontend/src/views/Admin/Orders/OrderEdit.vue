<script>
  import axios from "axios";


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

      handleSubmitForm(pid){
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
      <h1 class="mb-5">Customer:{{Orders.CustomerID}} ID#{{Orders.OrderID}}</h1>
    <div class="wrapper m-5"></div>
      <div class="table1">
        <form @submit.prevent="handleSubmitForm(Orders.OrderID)" novalidate>
        <table class="table table-light caption-top">
          <caption>
            <strong>Orders Information</strong>
          </caption>
          <tbody>
          <tr>
            <th>Orders ID</th>
            <td>{{ Orders.OrderID }}</td>
          </tr>
          <tr>
            <th>Customer ID</th>
             <td>{{Orders.CustomerID}}</td>
          </tr>
          <tr>
            <th>Cart ID</th>
            <td>{{ Orders.CartID }}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{{ Orders.DateTimeOrdered }}</td>
          </tr>
          <tr>
            <th>Products</th>
            <td>{{ Orders.ProductsJSON }}</td>
          </tr>
          <tr>
            <th>Customer Notes</th>
            <td><textarea class="form-control" rows="5" v-model="Orders.CustomerNotes" required></textarea></td>
          </tr>
          <tr>
            <th>Status</th>
            <td><select class="form-select" v-model="Orders.Status" required>
                <option disabled value="">Select Option</option>
                <option>In-Transit</option>
                <option>In-Progress</option>
                <option>Pending</option>
                <option>Awaiting Delivery</option>
                <option>Delivered</option>
            </select></td>
          </tr>
        </tbody>
        </table>


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