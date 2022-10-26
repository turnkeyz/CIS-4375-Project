<script>
  import axios from "axios";


  export default {
    components: {
      
    },
      //Storing the data being exported in a function
    data() {
      return {
        Cart: {
          ProductsJSON: [],
        },
        errors:[],
        Products:[],
        items:[],
        item:{},
        total:'',
        Order: {},
        oid:'',
      };
    },
    mounted(){
          
      },
        //created function
    created() {
    // Variable that stores the "find specific employee" route
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/${this.$route.query.id}`;
      axios.get(apiURL).then((res) => {
          this.Cart = res.data[0];
          this.items = JSON.parse(this.Cart.ProductsJSON)
          this.total = this.Cart.Subtotal
        })
        .catch((error) => {
          console.log(error);
        })

        let apiURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchAll`
        axios.get(apiURL2).then((res)=>{
          this.Products = res.data
        })

        let apiURL3=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/back/${this.$route.query.id}`;
        axios.get(apiURL3).then((res) => {
            this.Order = res.data
            this.oid = this.Order.OrderID
        })
    },
    methods: {
      delProduct(id) {
        let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/delete/${id}`;
        if (window.confirm("Are you sure you want to delete?")) {
          axios.delete(apiURL).then(() => {
              this.$router.push("/Cart");  //changes view to all Cart view
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      backOrder(id){
        // this.$router.push({
        //     name:'Orders-View',
        //     query:{id:id}
        this.$router.go(-1)
        // })

      },
      addProduct(){
        this.$router.push('/Product-form')
      },
      cancelEdit(id){
        this.$router.push({
                name:'Cart',
                query:{id:id}
            })
      },
      handleSubmitForm(pid){
        this.errors=[]
        //validations for required or formatted fields
        if(!this.Cart.CartID){
            this.errors.push("CartID is Required");
            }
        if(!this.Cart.CustomerID){
            this.errors.push("CustomerID  is Required");
            }
        if(!this.Cart.ProductsJSON)
            this.errors.push("ProductJSON is Required.");

        if(!this.Cart.CustomerNotes)
        this.errors.push("Customer Notes is Required")

        if(!this.Cart.Subtotal){
            this.errors.push("Subtotal is Required");
            }
       
        this.Cart.ProductsJSON = JSON.stringify(this.items)
        this.Cart.Subtotal=this.total
       
        //only run if no errors
        if(this.errors.length === 0){
            let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/update/${pid}`;
            axios.put(apiURL, this.Cart).then(() => {
              this.$router.push({
                name:'Cart',
                query:{id:this.Cart.CartID}
            })
            }).catch(error => {
                console.log(error)
            });
        }
        
      },
      addProductLine(){
            // this.item.ProductID=this.item.Products[0]
            // this.item.ProductName = this.item.Products[1]
            this.item.Price = this.item.Products[2]*this.item.Quantity
            this.total = this.total + (this.item.Products[2]*this.item.Quantity)
            let obj = {"ProductID":this.item.Products[0], "ProductName":this.item.Products[1], "Price":this.item.Products[2], "Quantity":this.item.Quantity}
            this.items.push(obj)
            this.item = {}
        },
        removeFromCart(id){
            let index = this.items.findIndex(i=>i.ProductID===id)
            let price = this.items[index].Price
            let Quantity = this.items[index].Quantity
            this.total = this.total - (price*Quantity)
            this.items.splice(index, 1)
         },
    },
  };
</script>

<template>
    <div class="container">
      <h1 class="mb-5">Customer:{{Cart.CustomerID}} ID#{{Cart.CartID}}</h1>
    <div class="wrapper m-5"></div>
      <div class="table1">
        <form @submit.prevent="handleSubmitForm(Cart.CartID)" novalidate>
        <table class="table table-light caption-top">
          <caption>
            <strong>Cart Information</strong>
          </caption>
          <tbody>
          <tr>
            <th>Cart ID</th>
            <td>{{ Cart.CartID }}</td>
          </tr>
          <tr>
            <th>Customer ID</th>
                <td>{{Cart.CustomerID}}</td>
          </tr>
          <tr>
            <th>Order ID</th>
            <td>{{Order.OrderID}}</td>
          </tr>
          <tr>
            <th>Products</th>
            <!-- <td><input type="text" class="form-control" v-model="Cart.ProductsJSON" required></td> -->
            <div class="row mb-4">
                        <div class="col-sm-4">
                            <label for='fName'>Name</label>
                            <select class='form-select' v-model="item.Products">
                                <option disabled value="">Select option</option>
                                <option v-for="product in Products" :key="product.ProductID" :value="[product.ProductID, product.ProductName, product.Price]">
                                    {{product.ProductName}} / {{product.CategoryName}}/ ${{product.Price}}
                                </option>
                            </select>
                        </div> 
                        <div class="col-sm-1">
                            <label >Quantity</label>
                            <input type="number" class="form-control" reauired min=1 v-model="item.Quantity">
                        </div>  
                        <div class="col-sm-1">
                            <label for='fName'>Custom</label>
                            <select class='form-select' v-model="item.Custom">
                                <option disabled value="">Select option</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                        <div clas="col-sm-1">
                            <button @click="addProductLine()" class="btn btn-secondary" type="button">Add</button>
                        </div>
                    </div>
            <div cloass="row mb-4">
                    <div class="table-responsive-sm">
                        <table class="table table-hover table-responsive table-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Custom</th>
                                    <th scope="col">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider table-divider-color">
                                <tr v-for="index in items" :key="index">
                                    <td>{{index.ProductName}}</td>
                                    <!-- <td>{{index.Products[1]}}</td> -->
                                    <td>{{index.Price}}</td>
                                    <td>{{index.Quantity}}</td>
                                    <td>{{}}</td>
                                    <td>{{index.Price * index.Quantity}}</td>
                                    <td>
                                        <tr>
                                            <td><button class="btn btn-danger btn-sm" type="button" @click.prevent="removeFromCart(index.ProductID)">Remove</button></td>
                                        </tr>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
          </tr>
          <tr>
            <th>Custom</th>
            <td><input type="Price" class="form-control" v-model="Cart.Customization" required></td>
          </tr>
          <tr>
            <th>Subtotal</th>
            <td><input type="Price" class="form-control" v-model="total" required disabled></td>
          </tr>
          <tr>
            <th>Description</th>
            <td><textarea class="form-control" rows="5" v-model="Cart.CustomerNotes"></textarea></td>
          </tr>
        </tbody>
        </table>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" class="btn btn-success me-md-2">Update</button>
            <button  @click="cancelEdit(Cart.CartID)" class="btn btn-secondary" type="button">Back to Cart</button>
            <button @click="backOrder(Order.OrderID)" class="btn btn-secondary" type="button">Back to Order</button>
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