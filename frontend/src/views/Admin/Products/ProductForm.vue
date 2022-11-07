<script>
    import axios from 'axios';
  

    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        Categories: [],
        Products: 
        {
            CategoryID: '',
            ProductName: '',
            Price: '',
            Active: false,
            Img_url:'',
            ProductDescription:'',
            ImageID:''
        },
        errors:[],
        file_type:'',
        flavor:'',
        size:'',
        shape:'',
        showSize:false,
        showFlavor:false,
        showShape:false,
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
        
        
      }
    },
    created(){
      let apiURL=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Categories/fetchAll`
      axios.get(apiURL).then((res)=>{
        this.Categories = res.data
      })

      let imgUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/images/all`
        axios.get(imgUrl).then((imgs)=>{
            this.images = imgs.data
            
            
            for(let x =0;x <=this.images.length; x++){
                if(this.images[x].CategoryID === 1){
                    this.cookieImgs.push(this.images[x])
                }
                if(this.images[x].CategoryID === 2){
                    this.pastryImgs.push(this.images[x])

                }
                if(this.images[x].CategoryID === 3){
                    this.cakeImgs.push(this.images[x])
                }
                if(this.images[x].CategoryID === 4){
                    this.breadImgs.push(this.images[x])
                }
                if(this.images[x].CategoryID === 6){
                    this.cakeCupImgs.push(this.images[x])
                }
                if(this.images[x].CategoryID === 7){
                    this.custCookieImgs.push(this.images[x])
                }
                if(this.images[x].CategoryID === 8){
                    this.custPastryImgs.push(this.images[x])

                }
                if(this.images[x].CategoryID === 9){
                    this.custCakeImgs.push(this.images[x])
                }
                if(this.images[x].CategoryID === 10){
                    this.custBreadImgs.push(this.images[x])
                }
                if(this.images[x].CategoryID === 12){
                    this.custCakeCupImgs.push(this.images[x])
                }
                
                if(this.images[x].CategoryID === undefined || this.images[x].CategoryID === null){
                    continue
                }
                
        }
        })
    },
    mounted(){
        
    },
    methods: {
            //create new volunteer and reset values
        handleSubmitForm(){
            this.errors=[]
            if(this.Products.Category){
                this.Products.CategoryID = this.Products.Category[0]
                
            }else{
                this.errors.push("Category Required")
                return
            }
            //validations for required or formatted fields
            
            if(!this.Products.ProductName){
                this.errors.push("Name is Required.");
            }
            if(!this.Products.Price){
            this.errors.push("Price is Required")
        }
            if(this.Products.Active==true){
                if(!this.Products.ProductDescription){
                    this.errors.push('Product Description is Required if Active is Switched on')
                    this.Products.Active=false
                }
                if(!this.Products.fileID){
                    this.errors.push('Image is Required if Active is switched on')
                }
        }

            if(!this.Products.fileID){
            this.Products.Active=false
            }
            
            //only run if no errors
            if(this.errors.length === 0){
                let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/add`;
                axios.post(apiURL, this.Products).then(() => {
                this.$router.push('/products')
                this.reset()
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        handleFileUpload(evt){
            this.Products.Img_url = evt.target.files[0].name
            this.file_type = evt.target.files[0].type
        },
        
        show_custom(category){
            this.catSet=true
            this.Products.ProductName = ''
            if(category[1].indexOf("Custom") !== -1){
                this.showFlavor=true
                this.showShape=false
                this.showSize=false
                if(category[1] === 'Custom Cakes'){
                    this.showSize=true
                    this.showShape=true
                }
            }else{
                this.showFlavor=false
                this.showShape=false
                this.showSize=false
            }

            if(this.show=true){
                this.setCategory()
            }
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
            this.Products.ImageID=''
            if(this.Products.Category[0] === 1){
                this.currentCategory = this.cookieImgs
                this.custom=false
            }
            if(this.Products.Category[0] === 2){
                this.currentCategory = this.pastryImgs
                this.custom=false
            }
            if(this.Products.Category[0]=== 3){
                this.currentCategory = this.cakeImgs
                this.custom=false
            }
            if(this.Products.Category[0] === 4){
                this.currentCategory = this.breadImgs
                this.custom=false
            }
            if(this.Products.Category[0] === 6){
                this.currentCategory = this.cakeCupImgs
                this.custom=false
            }
            if(this.Products.Category[0] === 7){
                this.currentCategory = this.custCookieImgs
                this.custom=true
            }
            if(this.Products.Category[0] === 8){
                this.currentCategory = this.custPastryImgs
                this.custom=true
            }
            if(this.Products.Category[0] === 9){
                this.currentCategory = this.custCakeImgs
                this.custom=true
            }
            if(this.Products.Category[0] === 10){
                this.currentCategory = this.custBreadImgs
                this.custom=true
            }
            if(this.Products.Category[0] === 12){
                this.currentCategory = this.custCakeCupImgs
                this.custom=true
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
        },
        reset(){
            this.Products={}
            this.currentCategory=[]
            this.pages=[]
        },
        activeChecks(){
            
            
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
     
}
</script>

<template>
    <div class="container">
        <div>
        <h1 class="text-center">New Product Form</h1>
        <form @submit.prevent="handleSubmitForm" novalidate>
            <fieldset class='form-control mb-5'>
                <legend>Product Information</legend>
                <div class='row mb-4'>
                    <div class='col-sm-4'>
                        <label for='fName'>*Category</label>
                        <select class='form-select' @change="show_custom(Products.Category)" v-model="Products.Category">
                            <option disabled value="">Select option</option>
                            <option v-for="category in Categories" :key="category.CategoryID" :value="[category.CategoryID, category.CategoryName]">
                                {{category.CategoryName}}
                            </option>
                        </select>
                    </div>
                    <div class='col-sm-4'>
                        <label>*Name</label>
                        <input type="text" class="form-control" v-model="Products.ProductName" required>
                    </div>    
                    <div class='col-sm-4'>
                        <label>*Price</label>
                        <input type="text" class="form-control" v-model="Products.Price" required>
                        <div class='valid-feedback'></div>
                    </div>
                </div>
                
                <div class='row mb-4'>
                    <div v-if="showFlavor" class='col-sm-4'>
                        <label for='fName'>Flavor</label>
                        <select @click="addCustom" class='form-select' v-model="flavor">
                            <option disabled value="">Select option</option>
                            <option>Red Velvet</option>
                            <option>Vanilla</option>
                            <option>Chocolate</option>
                            <option>Carrot</option>
                            <option>Funfetti</option>
                            <option></option>
                        </select>
                    </div>
                    <div  v-if="showSize" class='col-sm-4'>
                        <label for='fName'>Size</label>
                        <select @click="addCustom" class='form-select' v-model="size">
                            <option disabled value="">Select option</option>
                            <option>6"</option>
                            <option>8"</option>
                            <option>10"</option>
                            <option>14"</option>
                            <option></option>
                        </select>
                    </div>    
                    <div v-if="showShape" class='col-sm-4'>
                        <label for='fName'>Shape</label>
                        <select @click="addCustom" class='form-select' v-model="shape">
                            <option disabled value="">Select option</option>
                            <option>Round</option>
                            <option>Square</option>
                            <option></option>
                        </select>
                    </div>
                </div>


                <div class="row mb-4">
                    <div  class='col-sm-6 mb-3'>
                        <div v-show="!custom && Products.fileID" >
                        <label>*Active</label>
                        <div class="form-check form-switch">
                            <input v-model="Products.Active" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Display in Categories Page</label>
                        </div>
                    </div>
                    </div>
                    <div class="col-sm-12 mb-3">
                        <label>Description</label>
                        <textarea class="form-control" rows="5" v-model="Products.ProductDescription"></textarea>
                    </div>
                    
                     <div v-if="catSet" class="d-grid gap-2 d-md-flex justify-content-md mt-2 ">
                        <button type="button" class="btn btn-secondary" @click="showImages">Show Images</button>
                        <button v-if="show" class="btn btn-secondary" type="button" @click="hideImages">Close</button>
                    </div>
                    
                   
                    <div v-if="Products.ImageID" class="container mb-4 mt-3">
                        <div class="row justify-content-center">
                            <div class="col-6 ">
                                <img id="currentImg" class="w-100" :src="url+Products.fileID" style="">
                            </div>
                        </div>
                    </div>

                    <div v-if="show" class="container mb-5">
                        <div class="row mt-1">
                        
                        <div v-for="img in displayedPosts" :key="img" class="col-md-4 mb-3">
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
                </div>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }} </li>
                </ul>
            </p>
            
            </fieldset>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
                <button type="submit" class="btn btn-success create" >Create</button>
                <button type="button" @click="reset" class="btn btn-secondary create" >Clear</button>
            </div>
        </form>
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