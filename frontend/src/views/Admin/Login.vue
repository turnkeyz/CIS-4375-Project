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
            const auth = getAuth()
            if(!this.email){
                this.errMsg = 'Please type in a valid email address.'
                return
            }
            
            this.emailSending = true
            sendPasswordResetEmail(auth, this.email)
            .then(()=>{
                this.emailSending = false
            })
            .catch(error=>{
                this.emailSending = false
                this.errMsg = error.message
            })


//             if (!this.email) {
//     this.error = "Please type in a valid email address.";
//     return;
//   }
//   this.error = null;
//   this.emailSending = true;
//   firebase
//     .auth()
//     .sendPasswordResetEmail(this.email)
//     .then(() => {
//       this.emailSending = false;
//     })
//     .catch(error => {
//       this.emailSending = false;
//       this.errMsg = error.message;
//     });
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
                    <img src="/uploads/logo.png"
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
                            <button type='button' class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" @click="signIn()">Sign In</button>
                            <p><button type="button" class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" @click="forgotPassword()">Forgot Password?</button></p>
                            <p><button type="button" class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" @click="signInWithGoogle()">Sign In with Google</button></p>
                            
                            
                    </ul>
                        <p v-if="emailSent">Passord reset sent to Email</p>
                        <p v-if="errMsg">{{errMsg}}</p>
                    </div>

                    <!-- <div class="d-flex align-items-center justify-content-center pb-4">
                        <p class="mb-0 me-2">Don't have an account?</p>
                        <button type="button" class="btn btn-outline-danger">Create new</button>
                    </div> -->

                    </form>

                </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">Goat Solutions</h4>
                    <p class="small mb-0">Worker Portal only to be used by workers and authorized affiliates of 
                        Owl B Baking or Goat Solutions.</p>
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
    /* fallback for old browsers */
    background: #d243ff;
    /* background-image: url(../public/uploads/login\ page.jpg);
    background-size: contain; */
    /* Chrome 10-25, Safari 5.1-6 */
    /* background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593); */
    
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    /* background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593); */
    }
    
    /* @media (min-width: 768px) {
    .gradient-form {
    height: 5vh !important;
    }
    } */

    /* @media (min-width: 769px) {
    .gradient-custom-2 {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
        }
    } */
</style>