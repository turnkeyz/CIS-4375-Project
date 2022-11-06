<script>
import axios from 'axios'
const client = filestack.init(import.meta.env.VITE_FILESTACK_API);

export default{
    data(){
        return{
            Categories:[],
            Product:[],
            body:{},
            newfile:[],
            images:[],
            breadImgs:[],
            cakeImgs:[],
            cookieImgs:[],
            pastryImgs:[],
            cakeCupImgs:[],
            flavors:[],
            shapes:[],
            sizes:[],


            posts:[''],
            page:1,
            perPage:6,
            pages:[],
            currentCategory:[],
            currentImg:'',
            url:import.meta.env.VITE_FILESTACK_URL
        }
        
    },
    created(){
        let apiURL=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Categories/fetchAll`
        axios.get(apiURL).then((res)=>{
        this.Categories = res.data
      })

      let apiFlavor=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/getFlavors`
        axios.get(apiFlavor).then((res)=>{
        this.flavors = res.data
        
      })

      let apiShape=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/getShapes`
        axios.get(apiShape).then((res)=>{
        this.shapes = res.data
      })

      let apiSize=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/getSizes`
        axios.get(apiSize).then((res)=>{
        this.sizes = res.data
      })

    },
    methods:{
        uploadpicker(){
            const options={
            fromSources:["local_file_system", "imagesearch", "googlephotos"],
            accept:['image/*'],
            onFileUploadFinished : file=>{
                this.newfile=file
                this.send(file)
            },
            // onUploadDone:(res)=>{this.newfile=res}   
        }
            client.picker(options).open().then(()=>{
                
            })
        },
        send(file){
            this.body.fileName=file.filename
            this.body.fileID=file.handle
            this.body.CategoryID = this.Product.CategoryID
            
            let url = `${import.meta.env.VITE_VUE_APP_ROOT_URL}/Products/images/add`
            axios.post(url, this.body).then(()=>{
                this.Product = []
                this.body = {}
            }).catch(error=>{
                console.log(error)
            })
        }, 
        reset(){
            this.Product.CategoryID = ''
        },
        insertFlavor(){

        },
        updateFlavor(){

        },
        delFlavor(){

        },
        insertShape(){

        },
        updateShape(){

        },
        delShape(){
    
        },
        insertSize(){

        },
        updateSize(){

        },
        delSize(){

}
    },
}
</script>
<template>
    <div class="container mb-5">
        <h1 class="mb-5"><strong>Upload Images</strong></h1>
        <fieldset class="form-control">
       
            <div class='row mb-2'>
            <div class='col-sm-4 '>
                <p>To upload:</p>
                <ul>
                    <li>Select Appropriate Category</li>
                    <li>Choose Image File</li>
                    <li>Click Upload</li>
                </ul>
            </div>
        </div>
        <div class='row mb-2'>
            <div class='col-sm-4 '>
                <label for='fName'>*Category</label>
                <select class='form-select' @change="setCategory" v-model="Product.CategoryID">
                    <option disabled value="">Select option</option>
                    <option v-for="category in Categories" :key="category.CategoryID" :value="category.CategoryID">
                        {{category.CategoryName}}
                    </option>
                </select>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-sm-4">
                <div class="d-grid gap-2 d-md-flex justify-content-md mt-3">
                    <button type="button" class="btn btn-primary" v-show="Product.CategoryID" @click="uploadpicker">Choose image</button>
                    <button type="button" class="btn btn-primary" v-show="Product.CategoryID" @click="reset">Clear</button>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-sm-4">
                <p>*Images will only be Accessible from Category Selected</p>
            </div>
        </div>

    </fieldset>
                
    </div>
    <!-- <div class="container mb-5">
        <fieldset class="form-control">
            <legend>Flavors</legend>
            <table class="table caption-top table-responsive table-bordered">
                <caption>
                    <strong>Add Flavor</strong>
                </caption>
                <tbody class="table-light">
                    <tr>
                        <th>Flavor Name</th>
                        <td><input type="text" class="form-control"  v-model="flavors.FlavorName"></td>
                    </tr>
                </tbody>
                
            </table>
            <div class="d-grid gap-2 d-md-flex justify-content-md mt-4">
                <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Add</button>
            <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Modify</button>
            <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Delete</button>
            </div>
            
        
            <div class="table-responsive-sm ">
                <table class="table table-hover caption-top table-responsive table-bordered">
                    <caption>
                      <strong>Current flavors</strong>
                    </caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="index in flavors" :key="index">
                            <td>{{index.FlavorID}}</td>
                            <td>{{index.FlavorName}}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </fieldset>
    </div>
    
<div class="container mb-5">
    <fieldset class="form-control">
        <legend>Shapes</legend>
        <table class="table caption-top table-responsive table-bordered">
                <caption>
                    <strong>Add Shape</strong>
                </caption>
                <tbody class="table-light">
                    <tr>
                        <th>Shape Name</th>
                        <td><input type="text" class="form-control"  v-model="flavors.FlavorName"></td>
                    </tr>
                </tbody>
                
            </table>
            <div class="d-grid gap-2 d-md-flex justify-content-md mt-4">
                <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Add</button>
            <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Modify</button>
            <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Delete</button>
            </div>
            
        
            <div class="table-responsive-sm ">
                <table class="table table-hover caption-top table-responsive table-bordered">
                    <caption>
                      <strong>Current Shapes</strong>
                    </caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="index in shapes" :key="index">
                            <td>{{index.ShapeID}}</td>
                            <td>{{index.ShapeName}}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
    </fieldset>
</div>

<div class="container mb-5">
    <fieldset class="form-control">
        <legend>Sizes</legend>
        <table class="table caption-top table-responsive table-bordered">
                <caption>
                    <strong>Add Size</strong>
                </caption>
                <tbody class="table-light">
                    <tr>
                        <th>Size Name</th>
                        <td><input type="text" class="form-control"  v-model="flavors.FlavorName"></td>
                    </tr>
                </tbody>
                
            </table>
            <div class="d-grid gap-2 d-md-flex justify-content-md mt-4">
                <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Add</button>
            <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Modify</button>
            <button @click="addProductLine()" class="btn btn-secondary mb-5" type="button">Delete</button>
            </div>
            
        
            <div class="table-responsive-sm ">
                <table class="table table-hover caption-top table-responsive table-bordered">
                    <caption>
                      <strong>Current Sizes</strong>
                    </caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="index in sizes" :key="index">
                            <td>{{index.SizeID}}</td>
                            <td>{{index.SizeName}}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
    </fieldset>
</div> -->

</template>

<style>

</style>