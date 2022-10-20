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
        edit:"",
        category_name:"",
        file:'',
        file_type:'',
        Products:[],
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
      showEdit(){
        this.edit=true
      },
      cancelEdit(){
        this.edit=false
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
      getCategory(id, url){
        if(id == 1){
          return '/cookies/'+url
        }
        if(id==2){
          return '/pastries/'+url
        }
        if(id==3){
          return '/cakes/'+url
        }
        if(id==4){
          return '/breads/'+url
        }
      },
      handleFileUpload(evt){
        // this.file = event.target.files[0]
        // this.file = evt.target.files[0].name
        this.file_type = evt.target.files[0].type
        this.Cart.Img_url=evt.target.files[0].name
      }
    },
  };
</script>

<template>
  <div v-if="edit==false">
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
            <td>{{ Cart.ProductsJSON }}</td>
          </tr>
          <tr>
            <th>Custom</th>
            <td>{{Cart.Customization}}</td>
          </tr>
          <tr>
            <th>Active</th>
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
        <button @click="showEdit()" class="btn btn-secondary me-md-2">Edit</button>
        <button  @click="delProduct(Cart.CartID)" class="btn btn-danger" type="button">Delete</button>
      </div>
    </div>
  </div>
  
  <div v-if="edit==true">
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
            <th>Category</th>
            <!-- <td><input type="text" id='fName' class="form-control" v-model="Cart.CustomerID" required></td> -->
            <select class='form-select' v-model="Cart.CustomerID">
                <option disabled value="">Select option</option>
                <option v-for="category in Products" :key="category.CustomerID" :value="category.CustomerID">
                    {{category.CategoryName}}
                </option>
            </select>
          </tr>
          <tr>
            <th>Products</th>
            <td><input type="text" class="form-control" v-model="Cart.ProductName" required></td>
          </tr>
          <tr>
            <th>Custom</th>
            <td><input type="Price" class="form-control" v-model="Cart.Customization" required>
              <small id="phoneHelpBlock" class="form-text text-muted">
              example@Price.com
              </small></td>
          </tr>
          <tr>
            <th>Active</th>
              <td>
                <div class="form-check form-switch">
                  <input v-model="Cart.Active" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Active</label>
                </div>
              </td>
          </tr>
          <tr>
            <th>Description</th>
            <td><textarea class="form-control" rows="5" v-model="Cart.ProductDescription"></textarea></td>
          </tr>
        </tbody>
        </table>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" class="btn btn-success me-md-2">Update</button>
            <button  @click="cancelEdit()" class="btn btn-secondary" type="button">Cancel</button>
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
  </div>
</template>