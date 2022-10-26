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
            ProductDescription:''
        },
        errors:[],
        file_type:'',
      }
    },
    created(){
      let apiURL=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Categories/fetchAll`
      axios.get(apiURL).then((res)=>{
        this.Categories = res.data
      })
    },
    mounted(){
        
    },
    methods: {
            //create new volunteer and reset values
        handleSubmitForm(){
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
            // this.Active=false
            }

            //only run if no errors
            if(this.errors.length === 0){
                let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/add`;
                axios.post(apiURL, this.Products).then(() => {
                this.edit=false
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        handleFileUpload(evt){
            this.Products.Img_url = evt.target.files[0].name
            this.file_type = evt.target.files[0].type
        }
    } 
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
                        <select class='form-select' v-model="Products.CategoryID">
                            <option disabled value="">Select option</option>
                            <option v-for="category in Categories" :key="category.CategoryID" :value="category.CategoryID">
                                {{category.CategoryName}}
                            </option>
                        </select>
                    </div>
                    <div class='col-sm-4'>
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="Products.ProductName" required>
                    </div>    
                    <div class='col-sm-4'>
                        <label>*Price</label>
                        <input type="text" class="form-control" v-model="Products.Price" required>
                        <div class='valid-feedback'></div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class='col-sm-6'>
                        <label>*Active</label>
                        <div class="form-check form-switch">
                            <input v-model="Products.Active" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Display in Categories Page</label>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <label>*Description</label>
                        <textarea class="form-control" rows="5" v-model="Products.ProductDescription"></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="formFileSm" class="form-label">File must be in Uploads</label>
                        <input class="form-control form-control-sm" type="file" @change="handleFileUpload($event)">
                    </div>
                </div>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }} </li>
                </ul>
            </p>
            <button type="submit" class="btn btn-success create" >Create</button>
            </fieldset>
        </form>
    </div>
</div>
</template>