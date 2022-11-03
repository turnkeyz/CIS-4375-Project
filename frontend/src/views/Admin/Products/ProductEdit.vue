<script>
  import axios from "axios";

  export default {
    components: {
      
    },
      //Storing the data being exported in a function
    data() {
      return {
        Products: {},
        errors:[],
        edit:"",
        category_name:"",
        file:'',
        file_type:'',
        Categories:[],
      };
    },
    mounted(){
          
      },
        //created function
    created() {
        console.log('got here')
    // Variable that stores the "find specific employee" route
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/${this.$route.query.id}`;
      axios.get(apiURL).then((res) => {
          this.Products = res.data[0];
          if(this.$route.query.e === true || this.$route.query.e === 'true'){
            this.edit=true
          }else{
            this.edit=false
          }
        })
        .catch((error) => {
          console.log(error);
        })
        let apiURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Categories/fetchAll`
        axios.get(apiURL2).then((res)=>{
          this.Categories = res.data
        })
    },
    methods: {
      delProduct(id) {
        let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/delete/${id}`;
        if (window.confirm("Are you sure you want to delete?")) {
          axios.delete(apiURL).then(() => {
              this.$router.push("/Products");  //changes view to all Products view
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
            path: 'Product',
            query:{id:id}
        })
      },
      goBack(){
      this.$router.go(-1)
      },
      handleSubmitForm(pid){
        this.errors=[]
        //validations for required or formatted fields
        if(!this.Products.CategoryID){
            this.errors.push("Category is Required");
            }
        if(!this.Products.ProductName)
            this.errors.push("Name is Required.");

        if(!this.Products.Price)
        this.errors.push("Price is Required")

        if(!this.Products.ProductDescription){
            this.errors.push("Product Description is Required");
            }
        if(!this.Products.Img_url){
        this.errors.push("Image url required");
        }

        //only run if no errors
        if(this.errors.length === 0){
            let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/update/${pid}`;
            axios.put(apiURL, this.Products).then(() => {
            this.$router.push({
                path:'product',
                query:{id:pid}
            })
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
        if(id==6){
          return '/cakecups/'+url
        }
      },
      handleFileUpload(evt){
        // this.file = event.target.files[0]
        // this.file = evt.target.files[0].name
        this.file_type = evt.target.files[0].type
        this.Products.Img_url=evt.target.files[0].name
      }
    },
  };
</script>

<template>
  
    <div class="container">
      <h1 class="mb-5">Product Edit ID#{{Products.ProductID}}</h1>
    <div class="wrapper m-5"></div>
      <div class="table1">
        <form @submit.prevent="handleSubmitForm(Products.ProductID)" novalidate>
        <table class="table table-light caption-top">
          <caption>
            <strong>Product Information</strong>
          </caption>
          <tbody>
          <tr>
            <th>Product ID</th>
            <td>{{ Products.ProductID }}</td>
          </tr>
          <tr>
            <th>Category</th>
            <!-- <td><input type="text" id='fName' class="form-control" v-model="Products.CategoryID" required></td> -->
            <select class='form-select' v-model="Products.CategoryID">
                <option disabled value="">Select option</option>
                <option v-for="category in Categories" :key="category.CategoryID" :value="category.CategoryID">
                    {{category.CategoryName}}
                </option>
            </select>
          </tr>
          <tr>
            <th>Name</th>
            <td><input type="text" class="form-control" v-model="Products.ProductName" required></td>
          </tr>
          <tr>
            <th>Price</th>
            <td><input type="Price" class="form-control" v-model="Products.Price" required>
              <small id="phoneHelpBlock" class="form-text text-muted">
              example@Price.com
              </small></td>
          </tr>
          <tr>
            <th>Active</th>
              <td>
                <div class="form-check form-switch">
                  <input v-model="Products.Active" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Active</label>
                </div>
              </td>
          </tr>
          <tr>
            <th>Description</th>
            <td><textarea class="form-control" rows="5" v-model="Products.ProductDescription"></textarea></td>
          </tr>
          <tr>
            <th>Image URL</th>
            <td>{{Products.Img_url}}</td>
          </tr>
          <!-- <tr>
            <td>
              <img :src="'/uploads/'+getCategory(Products.CategoryID, Products.Img_url)" class="w-100"/>
            </td>
          </tr> -->
          <!-- <tr>
            <td>
              <div class="mb-3">
                <label for="formFileSm" class="form-label">File must be in Public/Uploads</label>
                <input class="form-control form-control-sm" type="file" @change="handleFileUpload($event)">
              </div>
            </td>
          </tr> -->
        </tbody>
        </table>
        <div class="mb-3">
                <label for="formFileSm" class="form-label">File must be in Public/Uploads</label>
                <input class="form-control form-control-sm" type="file" @change="handleFileUpload($event)">
              </div>
        <img :src="'/uploads/'+getCategory(Products.CategoryID, Products.Img_url)" class="w-100"/>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" class="btn btn-success me-md-2">Update</button>
            <button  @click="cancelEdit(Products.ProductID)" class="btn btn-secondary" type="button">Cancel</button>
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