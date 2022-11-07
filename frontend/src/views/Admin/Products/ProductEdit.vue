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
        images:[],
        breadImgs:[],
        cakeImgs:[],
        cookieImgs:[],
        pastryImgs:[],
        cakeCupImgs:[],
        custBreadImgs:[],
        custCakeImgs:[],
        custCookieImgs:[],
        custPastryImgs:[],
        custCakeCupImgs:[],


        posts:[''],
        page:1,
        perPage:6,
        pages:[],
        currentCategory:[],
        currentImg:'',
        catSet:false,
        show:false,
        imgIDDisplay:'',
        custom:false,
        url:import.meta.env.VITE_FILESTACK_URL,
      };
    },
    mounted(){
          
      },
        //created function
    created() {
        
    // Variable that stores the "find specific employee" route
      let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/get/${this.$route.query.id}`;
      axios.get(apiURL).then((res) => {
          this.Products = res.data[0];
          
        })
        .catch((error) => {
          console.log(error);
        })
        let apiURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Categories/fetchAll`
        axios.get(apiURL2).then((res)=>{
          this.Categories = res.data
        })

        let imgUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/images/all`
        axios.get(imgUrl).then((imgs)=>{
            this.images = imgs.data
            // console.log(this.images[0].CategoryID)
            for(let x =0;x <=this.images.length; x++){
                if(this.images[x].CategoryID === 1){
                    this.cookieImgs.push(this.images[x])
                    this.custom=false
                }
                if(this.images[x].CategoryID === 2){
                    this.pastryImgs.push(this.images[x])
                    this.custom=false

                }
                if(this.images[x].CategoryID === 3){
                    this.cakeImgs.push(this.images[x])
                    this.custom=false
                }
                if(this.images[x].CategoryID === 4){
                    this.breadImgs.push(this.images[x])
                    this.custom=false
                }
                if(this.images[x].CategoryID === 6){
                    this.cakeCupImgs.push(this.images[x])
                    this.custom=false
                }
                if(this.images[x].CategoryID === 7){
                    this.custCookieImgs.push(this.images[x])
                    this.custom=true
                }
                if(this.images[x].CategoryID === 8){
                    this.custPastryImgs.push(this.images[x])
                    this.custom=true
                }
                if(this.images[x].CategoryID === 9){
                    this.custCakeImgs.push(this.images[x])
                    this.custom=true
                }
                if(this.images[x].CategoryID === 10){
                    this.custBreadImgs.push(this.images[x])
                    this.custom=true
                }
                if(this.images[x].CategoryID === 12){
                    this.custCakeCupImgs.push(this.images[x])
                    this.custom=true
                }
                if(this.images[x].CategoryID === undefined || this.images[x].CategoryID === null){
                    continue
                }
                // console.log(this.images[x])
        }
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

        // if(!this.Products.ProductDescription){
        //     this.errors.push("Product Description is Required");
        //   }
        if(!this.Products.fileID){
        // this.errors.push("Image url required");
        this.Products.Active=false
        }

        if(this.Products.Active==true){
          if(!this.Products.ProductDescription){
            this.errors.push('Product Description is Required if Active is Switched on')
            this.Products.Active=false
          }
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
      
      handleFileUpload(evt){
        this.file_type = evt.target.files[0].type
        this.Products.Img_url=evt.target.files[0].name
      },
      
        addCustom(){
            this.Products.ProductName = `${this.Products.Category[1]} ${this.flavor} ${this.size} ${this.shape}`
        },
        setPages(){
            let numberOfPages = Math.ceil(this.currentCategory.length/this.perPage)
            
            for(let index = 1;index<=numberOfPages;index++){
                this.pages.push(index)
            }
            
        },
        paginate(posts){
            let page = this.page
            let perPage = this.perPage
            let from = (page*perPage)-perPage
            let to = (page*perPage)
            return posts.slice(from, to)
            
        },
        setCategory(){
            this.currentCategory=[]
            this.pages=[]
            // this.Products.ImageID=''
            
            if(this.Products.CategoryID === 1){
                this.currentCategory = this.cookieImgs
            }
            if(this.Products.CategoryID === 2){
                this.currentCategory = this.pastryImgs
            }
            if(this.Products.CategoryID=== 3){
                this.currentCategory = this.cakeImgs
            }
            if(this.Products.CategoryID === 4){
                this.currentCategory = this.breadImgs
            }
            if(this.Products.CategoryID === 6){
                this.currentCategory = this.cakeCupImgs
            }

            if(this.Products.CategoryID === 7){
                this.currentCategory = this.custCookieImgs
            }
            if(this.Products.CategoryID === 8){
                this.currentCategory = this.custPastryImgs
            }
            if(this.Products.CategoryID=== 9){
                this.currentCategory = this.custCakeImgs
            }
            if(this.Products.CategoryID === 10){
                this.currentCategory = this.custBreadImgs
            }
            if(this.Products.CategoryID === 12){
                this.currentCategory = this.custCakeCupImgs
            }

            
            this.setPages()
            this.paginate(this.currentCategory)
        },
        changeValue(src){
            this.Products.ImageID=src.ImageID
            this.Products.Img_url=src.fileName
            this.Products.fileID = src.fileID
        },
        showImages(){
            this.show=true
            this.setCategory()
        },
        hideImages(){
            this.show=false
        }
    },
    watch:{
        posts(){
            
            this.setPages()
        }
    },
    computed:{
        displayedPosts(){
            return this.paginate(this.currentCategory)
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
            <th>*Category</th>
            <!-- <td><input type="text" id='fName' class="form-control" v-model="Products.CategoryID" required></td> -->
            <select class='form-select' v-model="Products.CategoryID">
                <option disabled value="">Select option</option>
                <option @change="setCategory" v-for="category in Categories" :key="category.CategoryID" :value="category.CategoryID">
                    {{category.CategoryName}}
                </option>
            </select>
          </tr>
          <tr>
            <th>*Name</th>
            <td><input type="text" class="form-control" v-model="Products.ProductName" required></td>
          </tr>
          <tr>
            <th>*Price</th>
            <td><input type="Price" class="form-control" v-model="Products.Price" required>
              </td>
          </tr>
          <tr>
            <th>Active</th>
              <td>
                <div v-show="!custom && Products.fileID" >
                <div class="form-check form-switch">
                  <input v-model="Products.Active" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Active</label>
                </div>
              </div>
              </td>
          </tr>
          <tr>
            <th>Description</th>
            <td><textarea class="form-control" rows="5" v-model="Products.ProductDescription"></textarea></td>
          </tr>
          <tr>
            <th>Image URL</th>
            <td>{{Products.fileName}}</td>
          </tr>
          
        </tbody>
        </table>


        <!-- <div class="mb-3">
                <label for="formFileSm" class="form-label">File must be in Public/Uploads</label>
                <input class="form-control form-control-sm" type="file" @change="handleFileUpload($event)">
        </div> -->


            <div  class="d-grid gap-2 d-md-flex justify-content-md mt-2 mb-4">
                  <button type="button" class="btn btn-secondary" @click="showImages">More Images</button>
                  <button v-if="show" class="btn btn-secondary" type="button" @click="hideImages">Close</button>
              </div>
              
              <!-- added for images -->
              <!-- <div v-if="Products.fileID" class="container">
                  <img id="currentImg" class="w-100" :src="'https://cdn.filestackcontent.com/AA49LrrQpRmmalcs9wq6lz/'+Products.fileID" style="">
              </div> -->

              <div v-if="Products.fileID" class="container mb-4">
                        <div class="row justify-content-center">
                            <div class="col-6">
                                <img id="currentImg" class="w-100" :src="url+Products.fileID" style="">
                            </div>
                        </div>
                    </div>

              <div v-if="show" class="container mb-5">
                  <div class="row mt-1">
                  
                  <div v-for="img in displayedPosts" :key="img" class="col-md-4 mb-2">
                      <img id="productImg" @click="changeValue(img)" class="w-100" :src="url+img.fileID" style="">
                  </div>


                  
          </div>


          <ul class="pagination mb-5">
                  <li class="page-item" v-if="page != 1" @click="page--">
                      <button type="button" class="page-link">Previous</button>
                  </li>
                  <li class="page-item">
                      <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+3)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
                  </li>
                  

                  <li class="page-item">
                      <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
                  </li> 
                </ul>
            </div>


        <!-- <img v-if="Products.Img_url" :src="'/uploads/'+getCategory(Products.CategoryID, Products.Img_url)" class="w-100"/> -->
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5 mt-5">
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

<style>
    button.page-link {
	    display: inline-block;
    }
    button.page-link {
        font-size: 20px;
        color: #29b3ed;
        font-weight: 500;
    }
    .offset{
        width: 500px !important;
        margin: 20px auto;  
    }
    #productImg{
        /* width: 50%; */
        height: 15vh;
        object-fit: cover;
    }
    #currentImg{
        width:200px;
        height:400px;
        object-fit: cover;
    }
</style>