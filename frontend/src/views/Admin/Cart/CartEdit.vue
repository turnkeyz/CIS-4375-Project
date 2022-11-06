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
        edit:"",

        Order: {},
        oid:'',
        currentCategory:'',
        currentPrice:''
      };
    },
    mounted(){
          
      },
        //created function
    created() {
    // Variable that stores the "find specific employee" route
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/fetchOne/${this.$route.query.id}`;
      axios.get(apiURL).then((res) => {
          this.Cart = res.data[0];
          
          this.items = JSON.parse(this.Cart.ProductsJSON)
          this.total = this.Cart.Subtotal
          
          if(this.$route.query.e === true || this.$route.query.e === 'true'){
            this.edit=true
          }else{
            this.edit=false
          }
        })
        .catch((error) => {
          console.log(error);
        })

        let apiURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchAll`
        axios.get(apiURL2).then((res)=>{
          this.Products = res.data
        })

        // let apiURL3=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Orders/fetchOne/${this.$route.query.id}`;
        // axios.get(apiURL3).then((res) => {
        //     this.Order = res.data
        //     this.oid = this.Order.OrderID
        // })
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
      addProduct(){
        this.$router.push('/Product-form')
      },
      cancelEdit(id){
        this.$router.push({
                name:'Cart',
                query:{id:id}
            })
      },
      goBack(){
        this.$router.go(-1)
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

      //   if(!this.Cart.CustomerNotes){
      //   this.errors.push("Customer Notes is Required")
      // }
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
            if(this.item.Quantity>0){
              this.item.Price = this.item.Products[2]*this.item.Quantity
              this.total = this.total + (this.item.Products[2]*this.item.Quantity)
              let obj = {"ProductID":this.item.Products[0], "ProductName":this.item.Products[1], "Price":this.item.Products[2], "Quantity":this.item.Quantity, "CategoryName":this.item.Products[3]}
              this.items.push(obj)
              this.item = {}
              this.currentCategory =''
              this.currentPrice=''
              this.errors=[]
            }else{
                this.errors.push('Please Enter Valid Quantity')
            }
            
        },
        removeFromCart(id){
            let index = this.items.findIndex(i=>i.ProductID===id)
            let price = this.items[index].Price
            let Quantity = this.items[index].Quantity
            this.total = this.total - (price*Quantity)
            this.items.splice(index, 1)
         },
         setCatPrice(){
          this.currentCategory = this.item.Products[3]
            this.currentPrice = this.item.Products[2]
            this.item.Quantity = 1
        },
    },
  };
</script>

<template>
    <div class="container">
      <h1 class="mb-5">Cart Edit ID#{{Cart.CartID}}</h1>
    
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
          </tr>
          <tr>
            <th>Custom</th>
            <!-- <td><input type="Price" class="form-control" v-model="Cart.Customization" required></td> -->
            <td>
              <select class='form-select' v-model="Cart.Customization">
                <option disabled value="">Select option</option>
                <option value=true>Yes</option>
                <option value=false>No</option>
            </select>
          </td>
          </tr>
          
          <tr>
            <th>Description</th>
            <td><textarea class="form-control" rows="5" v-model="Cart.CustomerNotes"></textarea></td>
          </tr>
        </tbody>
        </table>
          
        
        
        <table class="table caption-top table-responsive table-bordered">
          <caption>
            <strong>Add Products</strong>
          </caption>
            <thead class="table-light">
              <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            </thead>
            
            <tbody>
              <tr>
                <td><select @change="setCatPrice()" class='form-select' v-model="item.Products">
                                <option disabled value="">Select option</option>
                                <option v-for="product in Products" :key="product.ProductID" :value="[product.ProductID, product.ProductName, product.Price, product.CategoryName]">
                                    {{product.ProductName}}
                                </option>
                            </select></td>
                <td><input disabled type="text" class="form-control" v-model="currentCategory"></td>
                <td><input disabled type="number" class="form-control" v-model="currentPrice"></td>
                <td><input type="number" class="form-control" required min=1 v-model="item.Quantity"></td>
                <td><input type="Price" class="form-control" v-model="total" required disabled></td>
              </tr>
          </tbody>
        </table>
        <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Add</button>
            <!-- <div closs="row mb-4">
              <div class="col-sm-12"> -->
                
                    <div class="table-responsive-sm ">
                      
                        <table class="table table-hover caption-top table-responsive table-bordered">
                          <caption>
                      <strong>Products in CART</strong>
                    </caption>
                            <thead class="table-light">
                                <tr>
                                  <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            
                            <tbody class="table-group-divider table-divider-color">
                                <tr v-for="index in items" :key="index">
                                    <td>{{index.ProductName}}</td>
                                    <td>{{index.CategoryName}}</td>
                                    <td>${{index.Price}}</td>
                                    <td>{{index.Quantity}}</td>
                                    
                                    <td>${{index.Price * index.Quantity}}</td>
                                    <td>
                                        <tr>
                                            <td><button class="btn btn-danger btn-sm" type="button" @click.prevent="removeFromCart(index.ProductID)">Remove</button></td>
                                        </tr>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  <!-- </div>
                </div>  -->
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-4 mt-4">
            <button type="submit" class="btn btn-success me-md-2">Update</button>
            <button  @click="cancelEdit(Cart.CartID)" class="btn btn-secondary" type="button">Cancel</button>
            <button v-if="edit==true" @click="goBack" class="btn btn-secondary" type="button">Back to Order</button>
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