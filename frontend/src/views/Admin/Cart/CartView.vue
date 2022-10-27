<script>
  import axios from "axios";


  export default {
    components: {
      
    },
      //Storing the data being exported in a function
    data() {
      return {
        Cart: {},
        errors:[],
        Products:[],
        items:{},
        
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
          console.log(this.items)
          
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
      showEdit(id){
        this.$router.push({
                name:'cart-edit',
                query:{id:id}
            })
      },
      handleSubmitForm(pid){
        this.errors=[]
        //validations for required or formatted fields
        if(!this.Cart.CustomerID){
            this.errors.push("Category is Required");
            }
        if(!this.Cart.ProductName)
            this.errors.push("Name is Required.");

        if(!this.Cart.Customization)
        this.errors.push("Price is Required")

        if(!this.Cart.ProductDescription){
            this.errors.push("Product Description is Required");
            }
        if(!this.Cart.Img_url){
        this.errors.push("Image url required");
        }

        //only run if no errors
        if(this.errors.length === 0){
            let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/update/${pid}`;
            console.log('line 86', apiURL)
            axios.put(apiURL, this.Cart).then(() => {
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
    <h1 class="mb-5">Customer:{{Cart.CustomerID}} ID#:{{Cart.CartID}}</h1>
    <div class="wrapper m-5"></div>
    <div class="table1">
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
            <td>{{ Cart.CustomerID }}</td>
          </tr>
          <tr>
            <th>Products</th>
            <!-- <td>{{ Cart.ProductsJSON }}</td> -->
            <tr v-for="item in items" :key="item.ProductID">({{item.ProductID}}) {{item.ProductName}} x{{item.Quantity}}</tr>
            <!-- <td v-for="item in Cart.ProductsJSON" :key="item.ProductsJSON">{{JSON.stringify(JSON.parse(item))}}</td> -->
          </tr>
          <tr>
            <th>Custom</th>
            <td>{{Cart.Customization}}</td>
          </tr>
          <tr>
            <th>$Subtotal</th>
              <td>{{Cart.Subtotal}}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td><textarea disabled class="form-control" rows="5" v-model="Cart.CustomerNotes"></textarea></td>
          </tr>
        </tbody>
      </table>
      
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button @click="addProduct()" class="btn btn-success me-md-2">New</button>
        <button @click="showEdit(Cart.CartID)" class="btn btn-secondary me-md-2">Edit</button>
        <button  @click="delProduct(Cart.CartID)" class="btn btn-danger" type="button">Delete</button>
      </div>
    </div>
</template>