<script>
  import Dashboard_nav from '../../src/components/Dashboard_nav.vue'
  import * as filestack from 'filestack-js';
import axios from 'axios';
  const client = filestack.init('AFjicuE4KTkQYD5osjrBhz');
  export default {
    // register child component
    components: {
      Dashboard_nav
    },
    data(){
      return{
        customers: []
      }
    },
    created(){
      let apiUrl=`${import.meta.env.VITE_VUE_APP_ROOT_URL}/Customers/fetchall`
      axios.get(apiUrl).then((res)=>{
        this.customers=res.data
      })
    }
  }
</script>
<template>
<h4 class="text-center mb-5"><strong>Customers</strong></h4>
<section class="intro">
  <div class="bg-image h-100" style="background-color: #f5f7fa;">
    <div class="mask d-flex align-items-center h-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card">
              <div class="card-body p-0">
                <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 700px">
                  <table class="table table-striped mb-0">
                    <thead style="background-color: #6a6d6f;">
                      <tr>
                        <th scope="col">ID#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="customer in customers" :key="customer.CustomerID">
                        <td>{{customer.CustomerID}}</td>
                        <td>{{customer.FirstName}}</td>
                        <td>{{customer.LastName}}</td>
                        <td>{{customer.Email}}</td>
                        <td>{{customer.Phone}}</td>
                        <td>{{customer.PaymentType}}</td>
                        <td>{{customer.Notes}}</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
                    </tbody>
                  </table>
                </div>
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
.btn span.icon {
    background: url('../public/assets/delete.png') no-repeat;
    float: left;
    width: 10px;
    height: 40px;
}

html,
body,
.intro {
  height: 100%;
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

thead th {
  color: #fff;
}

.card {
  border-radius: 1rem;
}

.table-scroll {
  border-radius: .5rem;
}

.table-scroll table thead th {
  font-size: 1.25rem;
}
thead {
  top: 0;
  position: sticky;
}
</style>
