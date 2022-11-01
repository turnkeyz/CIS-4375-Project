<template>    
    <div class="container">
        <div ref="content"> 
            <h1 class="text-center"><strong>Custom Orders</strong></h1>

            <form id="element" @submit.prevent="handleSubmitForm" novalidate>
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
                            <input type="text" class="form-control" v-model="FirstName" required>
                        </div> 

                        <div class='col-sm-4'>
                            <label>Last Name</label>
                            <input type="text" class="form-control" v-model="LastName" required>
                        </div>

                    </div>

                    <div class="row mb-5">

                        <div class='col-sm-4'>
                            <label>Email Address</label>
                            <input type="text" class="form-control" v-model="Email" required>
                        </div>

                        <div class='col-sm-4'>
                            <label>Phone Number</label>
                            <input type="text" class="form-control" v-model="Phone" required>
                        </div>

                        <div class="col-sm-4">
                            <label>Payement Type</label>
                            <select class='form-select' v-model="PaymentType " required>
                                <option disabled value="">Select option</option>
                                <option>Cash</option>
                                <option>Credit</option>
                                <option>Check</option>
                                <option>Money Order</option>
                                <option>Crypto Currency</option>
                                <option>Other</option>
                            </select>
                        </div>

                            
                    </div>

                    <div class="row mb-5">

                        <div class="col-sm-12">
                            <label>*Description</label>
                            <textarea class="form-control" rows="5" v-model="ProductDescription"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="formFileSm" class="form-label">File must be in Uploads</label>
                            <input class="form-control form-control-sm" type="file" @change="handleFileUpload($event)">
                        </div>

                    </div>

                </fieldset>

                <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }} </li>
                        </ul>
                    </p>
                    <button @click="ExportPDF" class="btn btn-success create" >Create</button>

            </form>
        </div>
    </div>
</template>


<script>
    import axios from 'axios';
    import html2pdf from 'html2pdf.js';

    export default {
    // register child component
    components: {

    },
    data(){
      return{
        Categories: [],
        PaymentType:'',
        FirstName: '',
        LastName:'',
        Email:'',
        Phone:'',
        ProductDescription:'',
        errors:[],
        file_type:'',
        Products:[]
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
            // // validations for required or formatted fields
            // if(!this.Products.CategoryID){
            //     this.errors.push("Category is Required");
            //     }
            // if(!this.Products.ProductName)
            //     this.errors.push("Name is Required.");

            // if(!this.Products.Price)
            // this.errors.push("Price is Required")

            // if(!this.Products.ProductDescription){
            //     this.errors.push("Product Description is Required");
            //     }
            // // if(!this.Products.Img_url){
            // // this.errors.push("Image url required");
            // // // this.Active=false
            // // }

        },
        handleFileUpload(evt){
            this.Products.Img_url = evt.target.files[0].name
            this.file_type = evt.target.files[0].type
        },
        ExportPDF(){        //creates an image rendering that is saved to a pdf
            html2pdf(document.getElementById("element"), {
                margin: 1,
                filename: "temp.pdf",
            });
        },
    }, 
};
</script>