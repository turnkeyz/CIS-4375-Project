<script>
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
    
    export default {

      data() {
        return {
            email:'',
            password:'',
            errMsg:'',
            errors:"",
            emailSending:false,
            emailSent:false
        };
      },
      methods:{
        signIn(){
            const auth = getAuth()
            signInWithEmailAndPassword(auth, this.email, this.password)
            // signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential)=>{
                console.log("Successfully Signed In!")
                console.log(userCredential.user)
                this.$router.replace({name:"Dashboard"})
            })
            .catch((error)=>{
                console.log(error.code)
                // alert(error.message)
                switch (error.code){
                    case "auth/invalid-email":
                        this.errMsg = "Invalid email"
                        break
                    case "auth/user-not-found":
                        this.errMsg = "No account with that email was found"
                        break
                    case "auth/wrong-password":
                        this.errMsg = "Incorrect password"
                        break
                    case "auth/invalid-email":
                        this.errMsg = "Invalid email"
                        break
                    default:
                        this.errMsg = "Email or password was incorrect"
                }

            })
        },
        signInWithGoogle(){
            const provider = new GoogleAuthProvider()
            signInWithPopup(getAuth(), provider)
                .then((result)=>{
                    // console.log(result.user)
                    console.log('Welcome!')
                    this.$router.replace({name:'Dashboard'})
                })
                .catch((error)=>{

                })
        },
        forgotPassword(){
            let myAlert = document.getElementById('resetToast')
            let resetAlert = new bootstrap.Toast(myAlert)
            resetAlert.hide()
            
            let Alert = document.getElementById('sent')
            let rstAlert = new bootstrap.Toast(Alert)
            
            const auth = getAuth()
            this.emailSending = true
            sendPasswordResetEmail(auth, this.email)
            .then(()=>{
                this.emailSending = false
                this.resetFields()
                rstAlert.show()
            })
            .catch(error=>{
                this.emailSending = false
                this.errMsg = error.message
            })


        },
        passReset(){
            if(!this.email){
                this.errMsg = 'Please type in a valid email address to reset Password'
                return
            }
            let myAlert = document.getElementById('resetToast')
            let resetAlert = new bootstrap.Toast(myAlert)
            resetAlert.show()
        },
        resetFields(){
            this.email = '',
            this.password = ''
            this.errors=''
            this.errMsg=''
        }

      }
    };
</script>
    
<template>
    <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
            <div class="card rounded-3 text-black">
            <div class="row g-0">
                <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                    <img src="https://owlbbakingimages.s3.amazonaws.com/images/Goat+Solutions+Logo.svg"
                        style="width: 185px;" alt="logo">
                    <h4 class="mt-1 mb-5 pb-1">Admin</h4>
                    </div>

                    <form >
                    <p></p>

                    <div class="form-outline mb-4">
                        <input type="email" id="form2Example11" class="form-control" v-model="email"/>
                        <label class="form-label" for="form2Example11">Username</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example22" class="form-control" v-model="password" />
                        <label class="form-label" for="form2Example22">Password</label>
                    </div>

                    <div class="text-center pt-1 mb-5 pb-1">
                        <ul>
                            <!-- <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" v-on:click="login()">Sign In</button> -->
                            
                            <button type='button' class="btn btn-primary btn-block fa-lg gradient-custom-1 me-md-4 mb-3" @click="signIn()">Sign In</button>
                            <button type="button" class="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3" @click="signInWithGoogle()">Sign In with Google</button>
                            <p><button type="button" class="btn btn-primary btn-block fa-lg gradient-custom-1  mb-3" @click="passReset" >Reset Password</button></p>
                            
                            
                            <div class="toast" role="alert" aria-live="assertive" id="resetToast" aria-atomic="true">
                                <div class="toast-body">
                                    Send Password Reset to Email?
                                    <div class="mt-2 pt-2 border-top">
                                        <button type="button" @click="forgotPassword()" class="btn btn-primary btn-sm">Yes</button>
                                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">No</button>
                                    </div>
                                </div>
                            </div>
                            <div class="toast align-items-center text-white bg-primary border-0" id="sent" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="d-flex">
                                    <div class="toast-body">
                                    Reset Password sent to Email!!
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                            </div>
                            
                            
                            
                    </ul>
                        <p v-if="emailSent">Passord reset sent to Email</p>
                        <p v-if="errMsg">{{errMsg}}</p>
                    </div>

                    </form>

                </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                    
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    
                    <h1 class="mb-3">Goat Solutions</h1>
                    <p class="small mb-5">Worker Portal only to be used by workers and authorized affiliates of 
                        Owl B Baking or Goat Solutions.</p>
                        <p class="mb-0">For assistance Please Contact us at:</p>
                        
                        <p class="">owlBeeBaking@gmail.com</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
</template>

<style>
    
    .gradient-custom-2 {
    
    background: rgba(210, 67, 255, .9);
   
    }
    .gradient-custom-1{
        background: rgba(210, 67, 255, .8);
    }

</style>