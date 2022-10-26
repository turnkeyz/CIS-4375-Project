import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './../router'
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APPID
};







// Initialize Firebase
initializeApp(firebaseConfig);



createApp(App).use(router).mount('#app')
