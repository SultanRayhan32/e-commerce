<template>
  <div class="container pt-5 d-flex justify-content-center" style="margin-top : 60px;">
    <!-- <h1>
          {{carts}}
    </h1>-->
    <div class="col-8">
      <table class="table">
        <thead style="background-color : #52092e; color : white;">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style="background-color : whitesmoke;">
          <tr v-for="cart in carts.cartList" :key="cart._id">
            <td>{{cart.Product.name}}</td>
            <td>
              <div style>
                <img :src="cart.Product.image" style="max-width : 100%; width : 60px;" />
              </div>
            </td>
            <td>{{cart.quantity}}</td>
            <td>Rp. {{cart.Product.price}}</td>
            <td>
              <!-- <div>
                <b-button v-b-modal.modal-1>Launch demo modal</b-button>

                <b-modal id="modal-1" title="BootstrapVue" @ok="deleteCart(cart.Product._id)">
                  <p class="my-4">Hello from modal!</p>
                </b-modal>
              </div> -->
              <input
                type="button"
                style="background-color : pink; color : white; border : none;"
                value="delete"
                @click="deleteCart(cart.Product._id)"
              />
            </td>
            <!-- {{increment(cart.Product.price)}} -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-4 ml-4">
      <div class="card">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">Ringkasan Belanja</h5>
          <h6 class="card-subtitle mb-2 text-muted">Total Harga</h6>
          <p class="card-text">Rp. {{PriceTotal}}</p>
        </div>
      </div>
      <div class="pt-2">
        <input type="text" placeholder="Masukkan Alamat Pengiriman"   style="width : 90%;" class="mt-2" v-model="alamat" />
        <input type="button" class="btn btn-primary mt-2" style="width : 90%;" value="CheckOut" @click="checkOut" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      totalHarga: 0,
      alamat : ''
    };
  },
  mounted() {
    this.$store.dispatch("GetCart");
  },
  computed: {
    carts() {
      return this.$store.state.cartList;
    },
    PriceTotal() {
      return this.$store.state.TotalHarga;
    }
  },
  methods: {
    deleteCart(id) {
      axios({
        url: `http://localhost:3000/cart/${id}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkOut (){
      axios({
        url: `http://localhost:3000/cart/checkout`,
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        },
        data : {
          alamat : this.alamat,
          totalHarga : this.PriceTotal,
        }
      })
        .then(data => {
          this.$store.commit('AFTERCHECKOUT' , '');
          this.$swal('Transaction Succes!!');
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style> 