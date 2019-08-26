<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div
        v-for="product in products"
        :key="product._id"
        class="card col-xl-2 col-lg-3 col-md-6 col-sm-12 m-5"
        style="width: 400px; padding: 0; height : 375px;"
        @click="detailProduct(product._id)"
      >
        <img class="card-img-top" style="width : 100%; height : 200px;" :src="product.image" alt="Card image cap" />
        <div class="card-body pt-4" style="background-color : whitesmoke;">
          <h5 class="card-title">Product Name : {{product.name}}</h5>
          <h5 class="card-title">Price : {{product.price}}</h5>
          <!-- <a href="#" class="btn btn-primary">Add To Cart</a> -->
          <div>
            <b-button v-b-modal.modal-1 >Add To Cart</b-button>

            <b-modal id="modal-1" title="BootstrapVue" @ok="tess">
                <p class="my-4">Are You Sure Want to add {{product.name}} to Your Cart</p>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../apis/axiosServer";
export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ path: "/login" });
    }
    axios
      .get("/product")
      .then(({ data }) => {
        console.log(data);
        this.products = data;
      })
      .catch(err => {
        console.log(err);
        console.log(err);
      });
  },
  methods : {
    tess (){
      console.log('hahahahahahahahahaha')
    },
    detailProduct (id){
      this.$router.push({ path : `/detail/${id}` })
      console.log('ahahhaahh', id)
    }
  }
};
</script>

<style>
</style>