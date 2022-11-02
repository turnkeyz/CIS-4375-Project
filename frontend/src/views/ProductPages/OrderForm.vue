<script>
    import axios from 'axios';
    import html2pdf from 'html2pdf.js';
    import {customOrder} from '../../methods/custom_order'
    // import {pdfOrderDownload} from '../../methods/pdf_order_form'

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
        submitted:false,
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
            if(this.errors.length === 0){
                this.submitted=true
                customOrder(this.Order)
                this.ExportPDF()
            }
            
        },
        ExportPDF(){  //creates an image rendering that is saved to a pdf
            if (window.confirm("Download Form?")){
                var new_order = document.getElementById('element-to-print')
                var opt = {
                    margin:1,
                    filename: "owlBBakingCompletedForm.pdf",
                }
                html2pdf(new_order, opt);
            }
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
        },
        resetPage(){
            
                this.Order={
                    FirstName:'',
                    LastName:'',
                    Email:'',
                    Phone:'',
                    PaymentType:'',
                    ProductsJSON: [],
                    CustomerNotes:'',
                    Subtotal:0,
                    ReturnCustomer:'No',
                    CustomerID:'',
                    Subtotal:0,
                    
                    
                }
                this.items=[],
                this.submitted=false
                this.show=false
                this.total=0
        
            },
        

    }, 
};
</script>

<template>    
    <div v-if="!submitted" class="container">
        <div ref="content"> 
            <h1 class="text-center"><strong>Order Form</strong></h1>
            <form @submit.prevent="handleSubmitForm" novalidate>
                <div>
                
                <fieldset class="form-control mb-5">
                    <br/>
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
                            <label></label>
                        </div>
                    </div>

                    <div class="row mb-5">
                        <div class="col-sm-3">
                            <label>Payment Type</label>
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
                        <div v-show="show" class="col-sm-2">
                            <label>Customer ID</label>
                            <input type="number" class="form-control" v-model="Order.CustomerID" required>      
                        </div> 
                    </div>
                </fieldset>
            <fieldset class="form-control mb-5">
                <legend><strong>Products</strong></legend>
                    <div> <!--DIV  FOR PRODUCTS-->
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
                            <input type="number" class="form-control" min=1 v-model="item.Quantity" required>
                        </div>  
                        <div class="col-sm-2">
                            <label>Subtotal</label>
                            <input disabled type="number" class="form-control" v-model="total">
                        </div>
                        <div clas="col-sm-1">
                            <button @click="addProductLine()" class="btn btn-secondary" type="button">Add</button>
                        </div>
                    </div>
                </div> <!--End DIV FOR PRODUCTS-->
                
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
                                    <td>${{index.Price}}</td>
                                    <td>{{index.Quantity}}</td>
                                    <td>${{index.Price * index.Quantity}}</td>
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
        </div>
                <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }} </li>
                        </ul>
                    </p>
                    <!-- <button @click="ExportPDF" class="btn btn-success create" >Create</button> -->
                    <button v-if="submitted==false" class="btn btn-success create" >Submit</button>
                    <button type="button" @click="resetPage" class="btn btn-secondary" >Reset</button>
            </form>
        </div>
    </div>
    <br/>
    <!-- Completed Ordered form -->
    <div ref="content" v-show="submitted" class="container mb-5">
        <p>Thank you for your purchase</p>
        <form id="element-to-print" >
            <fieldset class="form-control mb-5">
                <h1 class="text-center"><strong>Order Form</strong></h1>
                <hr>
                <h3>Customer Information</h3>
                <div class="row mb-4">
                    <div class="col-sm-2">
                        Name: {{Order.FirstName}} {{Order.LastName}}
                    </div>
                    <div class="col-sm-2">
                        Email: {{Order.Email}}
                    </div>
                    <div class="col-sm-2">
                        Phone: {{Order.Phone}}
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-sm-2">
                        Returning Customer: {{Order.ReturnCustomer}}
                    </div>
                    <div v-if="show" class="col-sm-2">
                        CustomerID: {{Order.CustomerID}}
                    </div>
                </div>
                <hr>
                <h3>Items</h3>
                <div cloass="row mb-4">
                    <div class="table-responsive-sm">
                        <table class="table  table-responsive table-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>    
                                </tr>
                            </thead>
                            <tbody class="table-group-divider table-divider-color">
                                <tr v-for="index in items" :key="index">
                                    <td>{{index.ProductName}}</td>
                                    <td>{{index.CategoryName}}</td>
                                    <td>${{index.Price}}</td>
                                    <td>{{index.Quantity}}</td>
                                    <td>${{index.Price * index.Quantity}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <div class="col-sm-2">
                            <p>Subtotal: ${{total}}</p>
                        </div>
                        <div class="col-sm-12">
                            <label>Addtional Comments:</label>
                            <p>{{Order.CustomerNotes}}</p>
                        </div>
                    </div>
                </div>
                <hr>
        </fieldset>
    </form>
        <button type="button" @click="resetPage" class="btn btn-secondary" >Reset</button>
    </div>
        
    <div class="container mt-5 mb-5">
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


