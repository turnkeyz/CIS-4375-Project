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
        Products:[],
        item:{},
        items:[],
        Cart: 
        {
            CustomerID: '',
            ProductsJSON: [],
            Customization: 0,
            CustomerNotes:'',
            Subtotal:''
        },
        errors:[],
        file_type:'',
        total:0,
        currentCategory:'',
        currentPrice:''
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
      })
    },
    mounted(){
        
    },
    methods: {
            //create new volunteer and reset values
        handleSubmitForm(){
            this.errors=[]
            //validations for required or formatted fields
            if(!this.Cart.CustomerID){
                this.errors.push("Customer ID is Required");
                return
                }
            if(this.items.length == 0){
                this.errors.push("Cart cannot not be created without products"); 
                return
            }
            
            
            this.Cart.Subtotal=Number(this.total)
            if(!this.Cart.Subtotal){
                this.errors.push("No subtotal")
            }
            
            this.Cart.ProductsJSON = JSON.stringify(this.items)
            if(this.Cart.ProductsJSON.length == 0){
                this.errors.push("Products table is empty")
                return
            }
            
            if(this.errors.length === 0){
                
                let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/add`;
                axios.post(apiURL, this.Cart).then(() => {
                
                    this.$router.push('/carts')
                    this.reset()
                }).catch(error => {
                    console.log(error)
                });
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
            let Quantity = this.items[index].Quantity
            this.total = this.total - (price*Quantity)
            this.items.splice(index, 1)
        },
        setCatPrice(){
            this.currentCategory = this.item.Products[3]
            this.currentPrice = this.item.Products[2]
            this.item.Quantity = 1
            let findCustom = this.currentCategory.search("Custom")
            if(findCustom !== -1){
                this.Cart.Customization = 1
            }
        },
        reset(){
            this.item={}
            this.items=[]
            this.Cart= {
                CustomerID: '',
                ProductsJSON: [],
                Customization: 0,
                CustomerNotes:'',
                Subtotal:''
            }
            this.errors=[]
            this.file_type=''
            this.total=0
            this.currentCategory=''
            this.currentPrice=''
            }
        
    } 
}
</script>

<template>
    <div class="container">
        <div>
        <h1 class="text-center">New Cart</h1>
        <form @submit.prevent="handleSubmitForm" novalidate>
            <fieldset class='form-control mb-5'>
                <legend>Order Information</legend>
                <div class='row mb-4'>   
                    <div class='col-sm-4'>
                        <label >*Customer</label>
                        <select class='form-select' v-model="Cart.CustomerID">
                            <option disabled value="">Select option</option>
                            <option v-for="customer in Customers" :key="customer.CustomerID" :value="customer.CustomerID">
                                #{{customer.CustomerID}} {{customer.FirstName}}{{customer.LastName}} 
                            </option>
                        </select>
                    </div>
                     
                    <div class="col-sm-6 mb-3">
                        <label>Notes</label>
                        <textarea @change="noteChange" class="form-control" rows="1" v-model="Cart.CustomerNotes"></textarea>
                    </div>

                    <div class="row">
                         <div class="col-sm-2">
                            <label >Custom Order</label>
                            <select class='form-select' v-model="Cart.Customization">
                                <option disabled value="">Select option</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div> 
                    </div>
                </div>            
            </fieldset>
            <fieldset class="form-control mb-5">
                <legend>*Products</legend>
                <!-- <div v-for="index in counter" :key="index"> -->
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
                        <div class="col-sm-1 mt-3">
                            <button @click="addProductLine()" class="btn btn-secondary" type="button">Add</button>
                        </div>
                    </div>
                </div> 
                
                <div cloass="row mb-4"> <!--DIV FOR TABLE-->
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
                    </div>
                </div>
            </fieldset>
            
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
                <button type="submit" class="btn btn-success create">Complete Purchase</button>
                <button type="button" @click="reset" class="btn btn-secondary create">Clear</button>
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