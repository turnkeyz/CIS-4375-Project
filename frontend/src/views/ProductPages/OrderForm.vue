<script>
    import axios from 'axios';
    import html2pdf from 'html2pdf.js';
    import {customOrder} from '../../methods/custom_order'
    import{emailregex, regex} from '../../methods/regex'
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
            CustomerID:'',
            Customization:0
        },
        file_type:'',
        total:0,
        show:false,
        currentCategory:'',
        currentPrice:'',
        submitted:false,
        IDS:[]
      }
    },
    created(){
      let apiURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/fetchAll`
      axios.get(apiURL2).then((res)=>{
        this.Products = res.data
        // console.log(this.Products)
      })

      let idURL2=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/fetchIDs`
      axios.get(idURL2).then((res)=>{
        this.IDS = res.data
        // console.log(this.Products)
      })

    },
    mounted(){
    },
    methods: {
            //create new volunteer and reset values
        handleSubmitForm(){
            let myAlert = document.getElementById('submitToast')
            let submitAlert = new bootstrap.Toast(myAlert)
            
            this.errors=[]
            // validations for required or formatted fields
            if(this.items.length === 0){
                this.errors.push("No Products were entered");
                return
                }
            if(!this.Order.FirstName){
                this.errors.push("First Name is Required.");
                return
            }    
            if(!this.Order.LastName){
                this.errors.push("Last Name is Required")
            }
            if(!this.Order.Email){
                this.errors.push("Email is Required");
                }

            if(!emailregex.test(this.Order.Email)){
                this.errors.push("Please enter a valid email.")
            }
            if(!this.Order.Phone){
                this.errors.push("Phone number is Required");
                }
            if(!regex.test(this.Order.Phone)){
                this.errors.push('Please Enter Valid Phone Number ')
            }
            if(!this.Order.PaymentType){
                this.errors.push("Payment Type is Required");
                }
            
            if(this.Order.ReturnCustomer == 'Yes'){
                if(!this.Order.CustomerID){
                    this.errors.push('Enter Customer ID or Change Returning Customer to No')
                    return
                }
                if(this.checkID(this.Order.CustomerID) === -1){
                    this.errors.push('invalid Customer ID')
                }
            }

            this.Order.Subtotal=Number(this.total) 
            this.Order.Products = this.items
            this.Order.ProductsJSON = JSON.stringify(this.items)
            let newCust = {"FirstName":this.Order.FirstName, "LastName":this.Order.LastName, "Email":this.Order.Email, "Phone":this.Order.Phone, "PaymentType":this.Order.PaymentType}
            
            if(this.errors.length === 0){
                // this.submitted=true
                if(this.Order.ReturnCustomer == 'Yes'){
                    let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/add`;
                    axios.post(apiURL, this.Order).then(()=>{
                        
                        // this.submitted=true
                        customOrder(this.Order)
                        
                        // this.ExportPDF()
                        submitAlert.show()
                    }).catch(error=>{
                        console.log(error)
                    })
                    
                }else{
                    
                    let custURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/add`
                    axios.post(custURL, newCust)
                    .then(()=>{
                        console.log('New customer created')
                    }).catch(error=>{
                        console.log(error)
                    })


                    let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/form-add`;
                    axios.post(apiURL, this.Order).then(()=>{
                        customOrder(this.Order)
                        this.submitted=true
                        // this.ExportPDF()
                        submitAlert.show()

                    }).catch(error=>{
                        console.log(error)
                    })
                    
                }
                
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
            if(this.item.Quantity >0){
                this.item.Price = this.item.Products[2]*this.item.Quantity
                this.total = this.total + (this.item.Products[2]*this.item.Quantity)
                let obj = {"ProductID":this.item.Products[0], "ProductName":this.item.Products[1], "Price":this.item.Products[2], "Quantity":this.item.Quantity, "CategoryName":this.item.Products[3]}
                this.items.push(obj)
                this.item = {}
                this.currentCategory =''
                this.currentPrice=''
                this.errors=[]
            }else{
                this.errors.push('Please Enter Valid Quantity')
            }
        },
        removeFromCart(id){
            let index = this.items.findIndex(i=>i.ProductID===id)
            
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
            let myAlert = document.getElementById('toast')
            let bsAlert = new bootstrap.Toast(myAlert)
            bsAlert.show()
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
        checkID(id){
            let index = this.IDS.findIndex(i=>i.CustomerID === id)
            return index
        }
        

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
                            <label>*First Name</label>
                            <input type="text" class="form-control" v-model="Order.FirstName" required>
                        </div> 

                        <div class='col-sm-3'>
                            <label>*Last Name</label>
                            <input type="text" class="form-control" v-model="Order.LastName" required>
                        </div>
                        <div class='col-sm-3'>
                            <label>*Email Address</label>
                            <input type="email" class="form-control" v-model="Order.Email" required>
                            <small id="phoneHelpBlock" class="form-text text-muted">
                                example@email.com
                            </small>
                        </div>
                        <div class='col-sm-3'>
                            <label>*Phone Number</label>
                            <input type="text" class="form-control" v-model="Order.Phone" required>
                            <small id="phoneHelpBlock" class="form-text text-muted">
                                xxx-xxx-xxxx **dashes required
                            </small>
                        </div>
                    </div>

                    <div class="row mb-5">
                        <div class="col-sm-3">
                            <label>*Payment Type</label>
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
                <legend><strong>*Products</strong></legend>
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
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">

                        <button v-if="submitted==false" class="btn btn-success create" >Submit</button>
                    <button type="button" @click="resetPage" class="btn btn-secondary" >Reset</button>
                    </div>
                    
            </form>
        </div>
    </div>
    <div class="toast align-items-center text-white bg-primary border-0" id="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                            <div class="toast-body">
                                Form Reset
                            </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
    <br/>
    <!-- Completed Ordered form -->
    <div ref="content" v-show="submitted" class="container mb-5">
        <p>Thank you for your purchase</p>
        <div class="toast" role="alert" aria-live="assertive" id="submitToast" aria-atomic="true">
            <div class="toast-body">
                Order was Submitted
                <div class="mt-2 pt-2 border-top">
                <button type="button" @click="ExportPDF" class="btn btn-primary btn-sm">Download Copy</button>
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
                </div>
            </div>
        </div>
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


