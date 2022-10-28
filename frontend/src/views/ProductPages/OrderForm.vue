<template>    
    <div class="container">
        <div ref="content"> 
            <h1 class="text-center"><strong>Order Form</strong></h1>

            <form id="element" @submit.prevent="handleSubmitForm" novalidate>
                <fieldset class="form-control mb-5">
                    <fieldset class="form-control mb-5">
                    <legend><strong>Customer Information</strong></legend>

                    <div class="row mb-5">
                        <div class='col-sm-3'>
                            <label>First Name</label>
                            <input type="text" class="form-control" v-model="Order.FirstName" required>
                        </div> 

                        <div class='col-sm-3'>
                            <label>Last Name</label>
                            <input type="text" class="form-control" v-model="Order.LastName" required>
                        </div>
                        <div class='col-sm-3'>
                            <label>Email Address</label>
                            <input type="text" class="form-control" v-model="Order.Email" required>
                        </div>
                        <div class='col-sm-3'>
                            <label>Phone Number</label>
                            <input type="text" class="form-control" v-model="Order.Phone" required>
                        </div>
                    </div>

                    <div class="row mb-5">
                        <div class="col-sm-3">
                            <label>Payement Type</label>
                            <select class='form-select' v-model="Order.PaymentType " required>
                                <option disabled value="">Select option</option>
                                <option>Cash</option>
                                <option>Credit</option>
                                <option>Check</option>
                                <option>Money Order</option>
                                <option>Crypto Currency</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <label>Returning Customer</label>
                            <select class='form-select' @change="show_cust_id()" v-model="Order.ReturnCustomer " required>
                                <option disabled value="">Select option</option>
                                <option >Yes</option>
                                <option >No</option>
                            </select>         
                        </div>     
                        <div v-if="show" class="col-sm-2">
                            <label>Customer ID</label>
                            <input type="number" class="form-control" v-model="Order.CustomerID" required>      
                        </div> 
                    </div>
                </fieldset>
            <fieldset class="form-control mb-5">
                <legend><strong>Products</strong></legend>
                <!-- <div v-for="index in counter" :key="index"> -->
                    <div>
                    <div class="row mb-4">
                        <div class="col-sm-4">
                            <label for='fName'>Name</label>
                            <select class='form-select' @change="setCatPrice()" v-model="item.Products">
                                <option disabled value="">Select option</option>
                                <option v-for="product in Products" :key="product.ProductID" :value="[product.ProductID, product.ProductName, product.Price, product.CategoryName]">
                                    {{product.ProductName}} 
                                </option>
                            </select>
                        </div> 
                        <div class="col-sm-2">
                            <label >Category</label>
                            <input disabled type="text" class="form-control" v-model="currentCategory">
                        </div>
                        <div class="col-sm-2">
                            <label >Price</label>
                            <input disabled type="number" class="form-control" v-model="currentPrice">
                        </div>
                        <div class="col-sm-2">
                            <label >Quantity</label>
                            <input type="number" class="form-control" reauired min=1 v-model="item.Quantity" required>
                        </div>  
                        <div class="col-sm-2">
                            <label>Subtotal</label>
                            <input disabled type="number" class="form-control" v-model="total">
                        </div>
                        <div clas="col-sm-1">
                            <button @click="addProductLine()" class="btn btn-secondary" type="button">Add</button>
                        </div>
                    </div>
                </div>
                
                <div cloass="row mb-4">
                    <div class="table-responsive-sm">
                        <table class="table table-hover table-responsive table-bordered">
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
                                    <td>{{index.Price}}</td>
                                    <td>{{index.Quantity}}</td>
                                    <td>{{index.Price * index.Quantity}}</td>
                                    
                                    <td>
                                        <tr>
                                            <td><button class="btn btn-danger btn-sm" type="button" @click.prevent="removeFromCart(index.ProductID)">Remove</button></td>
                                        </tr>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <div class="col-sm-12">
                        <label>Addtional Comments</label>
                        <textarea class="form-control" rows="5" v-model="Order.CustomerNotes"></textarea>
                    </div>
                    </div>
                </div>
            </fieldset>
            </fieldset>

                <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }} </li>
                        </ul>
                    </p>
                    <!-- <button @click="ExportPDF" class="btn btn-success create" >Create</button> -->
                    <button  class="btn btn-success create" >Submit</button>

            </form>
        </div>
    </div>
    <br/>
    <div class="container">
        <h2 class="text-center"><strong>Custom Orders</strong></h2>
        <br/>
        <fieldset>
            <h3>For Custom Orders Please send them to <strong>OwlBeeBaking@gmail.com</strong> with an image if available.</h3>
            <h3>Below are some considerations to keep in mind:</h3>
            <br/>
            <p> Cakes</p>
            
            <ul>
                <ul>Sizes: 6", 8", 10", 14"</ul>
                <ul>Shape: Round, Square</ul>
            </ul>
            <p>Flavors for CakePops, Cake Cups, Cupcakes, Cakes are as follows:</p>
            <ul>
                <ul>Red Velvet</ul>
                <ul>Vanilla</ul>
                <ul>Chocolate</ul>
                <ul>Carrot</ul>
                <ul>Funfetti</ul>
            </ul>


        </fieldset>

    </div>
</template>


<script>
    import axios from 'axios';
    import jsPDF from 'jsPDF';  //unused jspdf
    import html2pdf from 'html2pdf.js';
    import {customOrder} from '../../methods/custom_order'

    export default {
    // register child component
    components: {

    },
    data(){
      return{
        errors:[],
        file_type:'',
        Products:[],
        item:{},
        items:[],
        Order: 
        {
            FirstName:'',
            LastName:'',
            Email:'',
            Phone:'',
            PaymentType:'',
            ProductsJSON: [],
            CustomerNotes:'',
            Subtotal:0,
            ReturnCustomer:'No',
            CustomerID:''
        },
        file_type:'',
        total:0,
        show:false,
        currentCategory:'',
        currentPrice:'',
      }
    },
    created(){
      let apiURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchAll`
      axios.get(apiURL2).then((res)=>{
        this.Products = res.data
        // console.log(this.Products)
      })
    },
    mounted(){
    },
    methods: {
            //create new volunteer and reset values
        handleSubmitForm(){
            this.errors=[]
            // validations for required or formatted fields
            if(!this.Order.ProductsJSON){
                this.errors.push("Category is Required");
                }
            if(!this.Order.FirstName)
                this.errors.push("Name is Required.");

            if(!this.Order.LastName)
            this.errors.push("Price is Required")

            if(!this.Order.Email){
                this.errors.push("Product Description is Required");
                }
            if(!this.Order.Phone){
                this.errors.push("Product Description is Required");
                }
            if(!this.Order.PaymentType){
                this.errors.push("Product Description is Required");
                }
            if(!this.Order.PaymentType){
                this.errors.push("Product Description is Required");
                }
            
            this.Order.Subtotal=Number(this.total) 
            this.Order.ProductsJSON = this.items
            customOrder(this.Order)
        },
        handleFileUpload(evt){
            this.Products.Img_url = evt.target.files[0].name
            this.file_type = evt.target.files[0].type
        },
        Download(){     //old jspdf function --leaving in for testing
            const doc = new jsPDF()
            const newPDF = this.$refs.documents.innerHTML
            doc
            doc.text(newPDF, 15, 15, {
                width: 480
            })

            doc.save('order.pdf')
        },
        ExportPDF(){        //creates an image rendering that is saved to a pdf
            html2pdf(document.getElementById("element"), {
                margin: 1,
                filename: "temp.pdf",
            });
        },
        addProductLine(){
            this.item.Price = this.item.Products[2]*this.item.Quantity
            this.total = this.total + (this.item.Products[2]*this.item.Quantity)
            let obj = {"ProductID":this.item.Products[0], "ProductName":this.item.Products[1], "Price":this.item.Products[2], "Quantity":this.item.Quantity, "CategoryName":this.item.Products[3]}
            this.items.push(obj)
            this.item = {}
            this.currentCategory =''
            this.currentPrice=''
        },
        removeFromCart(id){
            let index = this.items.findIndex(i=>i.ProductID===id)
            console.log(index)
            let price = this.items[index].Price
            this.total = this.total - price
            this.items.splice(index, 1)
        },
        show_cust_id(){
            if(this.Order.ReturnCustomer == 'Yes'){
                this.show = true
            }else{
                this.show = false
            }
        },
        setCatPrice(){
            this.currentCategory = this.item.Products[3]
            this.currentPrice = this.item.Products[2]
            this.item.Quantity = 1
        }

    }, 
};
</script>


