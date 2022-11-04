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
    },
}
</script>
<template>
    <div class="container">
        <div class='row mb-4'>
            <div class='col-sm-4 mb-5'>
                <h1>UPLOAD IMAGES</h1>
                <label for='fName'>*Category</label>
                <select class='form-select' @change="setCategory" v-model="Product.CategoryID">
                    <option disabled value="">Select option</option>
                    <option v-for="category in Categories" :key="category.CategoryID" :value="category.CategoryID">
                        {{category.CategoryName}}
                    </option>
                </select>
            </div>
            
        </div>
                
    </div>
    <div class="container">
        <button type="button" class="btn btn-primary" v-show="Product.CategoryID" @click="uploadpicker">Choose image</button>
    </div>
    
<div class="container">
    
</div>



</template>

<style>

</style>