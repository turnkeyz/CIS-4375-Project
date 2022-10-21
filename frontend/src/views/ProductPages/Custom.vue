<template>    
    <div class="container">
        <div>
            <h1 class="text-center"><strong>Custom Orders</strong></h1>

            <form @submit.prevent="handleSubmitForm" novalidate>
                <fieldset class="form-control mb-5">
                    <legend><strong>Order Information</strong></legend>

                    <div class="row mb-5">
                        <div class="col-sm-4">
                            <label for="ptype">Category</label>
                            <select class="form-select" v-model="Products.CategoryID">
                                <option disabled value="">Select option</option>
                                <option v-for="category in Categories" :key="category.CategoryID" :value="category.CategoryID">
                                    {{category.CategoryName}}
                                </option>
                            </select>
                        </div>

                        <div class='col-sm-4'>
                            <label>First Name</label>
                            <input type="text" class="form-control" v-model="Customers.FirstName" required>
                        </div> 

                        <div class='col-sm-4'>
                            <label>Last Name</label>
                            <input type="text" class="form-control" v-model="Customers.LastName" required>
                        </div>

                    </div>

                    <div class="row mb-5">

                        <div class='col-sm-4'>
                            <label>Email Address</label>
                            <input type="text" class="form-control" v-model="Customers.Email" required>
                        </div>

                        <div class='col-sm-4'>
                            <label>Phone Number</label>
                            <input type="text" class="form-control" v-model="Customers.Phone" required>
                        </div>

                        <div class="col-sm-4">
                            <label>Payement Type</label>
                            <input type="text" class="form-control" v-model="Customers.PaymentType" required>
                        </div>

                            
                    </div>

                    <div class="row mb-5">

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

        Customers:
        {
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            PaymentType: '',

        },

        Orders:
        {
            

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