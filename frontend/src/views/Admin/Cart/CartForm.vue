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
                }
            if(!this.items){
                this.errors.push("Products are empty."); 
            // this.Active=false
            }
            for(let i=0; i<this.items.length; i++){
                this.Cart.ProductsJSON.push({'ProductID':this.items[i].Products[0], 'ProductName':this.items[i].Products[1], 'Price':this.items[i].Products[2],'Quantity':this.items[i].Quantity})
            }
            this.Cart.Subtotal=this.total
            this.Cart.ProductsJSON = JSON.stringify(this.Cart.ProductsJSON)
            
            if(this.errors.length === 0){
                let apiURL = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Cart/add`;
                axios.post(apiURL, this.Cart).then(() => {
                    // this.edit=false
                    this.$router.push('/carts')
                    this.Cart={
                        CustomerID: '',
                        ProductsJSON: [],
                        Customization: 0,
                        CustomizationNotes:'',
                        Subtotal:''
                    }
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        addProductLine(){
            this.item.Price = this.item.Products[2]*this.item.Quantity
            this.total = this.total + (this.item.Products[2]*this.item.Quantity)
            this.items.push(this.item)
            this.item = {}
        },
        removeFromCart(id){
            let index = this.items.findIndex(i=>i.Products[0]===id)
            let price = this.items[index].Price
            this.total = this.total - price
            this.items.splice(index, 1)
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
                <legend>Customer Information</legend>
                <div class='row mb-4'>   
                    <div class='col-sm-4'>
                        <label for='fName'>*Customer</label>
                        <select class='form-select' v-model="Cart.CustomerID">
                            <option disabled value="">Select option</option>
                            <option v-for="customer in Customers" :key="customer.CustomerID" :value="customer.CustomerID">
                                #{{customer.CustomerID}} {{customer.FirstName}}{{customer.LastName}} 
                            </option>
                        </select>
                    </div>  
                    <div class="col-sm-6">
                        <label>Notes</label>
                        <textarea class="form-control" rows="1" v-model="Cart.CustomerNotes"></textarea>
                    </div>
                </div>            
            </fieldset>
            <fieldset class="form-control mb-5">
                <legend>Products</legend>
                <!-- <div v-for="index in counter" :key="index"> -->
                    <div>
                    <div class="row mb-4">
                        <div class="col-sm-4">
                            <label for='fName'>Name</label>
                            <select class='form-select' v-model="item.Products">
                                <option disabled value="">Select option</option>
                                <option v-for="product in Products" :key="product.ProductID" :value="[product.ProductID, product.ProductName, product.Price]">
                                    {{product.ProductName}} / {{product.CategoryName}}/ ${{product.Price}}
                                </option>
                            </select>
                        </div> 
                        <div class="col-sm-1">
                            <label >Quantity</label>
                            <input type="number" class="form-control" reauired min=1 v-model="item.Quantity">
                        </div>  
                        <div class="col-sm-1">
                            <label for='fName'>Custom</label>
                            <select class='form-select' v-model="item.Custom">
                                <option disabled value="">Select option</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                        <div class="col-sm-1">
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
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Custom</th>
                                    <th scope="col">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider table-divider-color">
                                <tr v-for="index in items" :key="index">
                                    <td>{{index.Products[1]}}</td>
                                    <td>{{index.Products[2]}}</td>
                                    <td>{{index.Quantity}}</td>
                                    <td>{{index.Custom}}</td>
                                    <td>{{index.Price}}</td>
                                    
                                    <td>
                                        <tr>
                                            <td><button class="btn btn-danger btn-sm" type="button" @click.prevent="removeFromCart(index.Products[0])">Remove</button></td>
                                        </tr>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </fieldset>
            
            
            <button type="submit" class="btn btn-success create">Complete Purchase</button>
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