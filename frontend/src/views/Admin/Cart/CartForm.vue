<script>
    import axios from 'axios';

    export default {
    // register child component
    components: {
    //   Dashboard_nav
    },
    data(){
      return{
        Customers:[],
        Categories:[],
        Products:[],
        Cart: 
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
      let apiURL=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchAll`
      axios.get(apiURL).then((res)=>{
        this.Products = res.data
        // console.log(this.Products)

      })
      let apiURL3=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/fetchNames`
      axios.get(apiURL3).then((res)=>{
        this.Customers = res.data
        console.log('line 37', this.Customers)
      })
    },
    mounted(){
        if(!this.$parent.authenticated){
            this.$router.replace({name:"Login"})
        }
    },
    methods: {
            //create new volunteer and reset values
        handleSubmitForm(){
            this.errors=[]
            //validations for required or formatted fields
            if(!this.Cart.CategoryID){
                this.errors.push("Category is Required");
                }
            if(!this.Cart.ProductName)
                this.errors.push("Name is Required.");

            if(!this.Cart.Price)
            this.errors.push("Price is Required")

            if(!this.Cart.ProductDescription){
                this.errors.push("Product Description is Required");
                }
            if(!this.Cart.Img_url){
            this.errors.push("Image url required");
            // this.Active=false
            }

            //only run if no errors
            if(this.errors.length === 0){
                let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/add`;
                axios.post(apiURL, this.Cart).then(() => {
                this.edit=false
                }).catch(error => {
                    console.log(error)
                });
            }
        },
    } 
}
</script>

<template>
    <div class="container">
        <div>
        <h1 class="text-center">New Cart</h1>
        <form @submit.prevent="handleSubmitForm" novalidate>
            <fieldset class='form-control mb-5'>
                <legend>Cart Information</legend>
                <div class='row mb-4'>
                    <div class='col-sm-4'>
                        <label for='fName'>*Category</label>
                        <select class='form-select' v-model="Cart.CategoryID">
                            <option disabled value="">Select option</option>
                            <option v-for="category in Categories" :key="category.CategoryID" :value="category.CategoryID">
                                {{category.CategoryName}}
                            </option>
                        </select>
                    </div>
                    <div class='col-sm-4'>
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="Cart.ProductName" required>
                    </div>    
                    <div class='col-sm-4'>
                        <label>*Price</label>
                        <input type="text" class="form-control" v-model="Cart.Price" required>
                        <div class='valid-feedback'></div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class='col-sm-6'>
                        <label>*Active</label>
                        <div class="form-check form-switch">
                            <input v-model="Cart.Active" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Display in Categories Page</label>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <label>*Description</label>
                        <textarea class="form-control" rows="5" v-model="Cart.ProductDescription"></textarea>
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