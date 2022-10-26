<script>
    export default {
      data() {
        return {
            input:{
                user:"",
                pswd:""
            },
            errors:""
        };
      },
      methods:{
        login(){
            if(this.input.user != "" && this.input.pswd != ""){
                if(this.input.user == 'user' && this.input.pswd =="pass"){
                    this.$emit("authenticated", true)
                    this.$parent.authenticated = true
                    this.$router.replace({name:"Dashboard"})
                }else{
                    console.log("Username or Password is incorrect")
                    this.errors="Username or Password is incorrect"
                }
            }else{
                console.log("Username and Password is empty")
                this.errors="Username and Password is empty"
            }
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

                    <form>
                    <p></p>

                    <div class="form-outline mb-4">
                        <input type="email" id="form2Example11" class="form-control" v-model="input.user"/>
                        <label class="form-label" for="form2Example11">Username</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example22" class="form-control" v-model="input.pswd" />
                        <label class="form-label" for="form2Example22">Password</label>
                    </div>

                    <div class="text-center pt-1 mb-5 pb-1">
                        <ul>
                            <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" v-on:click="login()">Sign In</button>
                        </ul>
                        <ul>
                            <a class="text-muted" href="#!">Forgot password?</a>
                        </ul>
                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li>{{ errors }} </li>
                            </ul>
                        </p>
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