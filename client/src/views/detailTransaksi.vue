<template>
  <div style="padding-top : 100px;" class="row">
    <div class="card col-3" style="width: 18rem;" v-for="product in data" :key="product._id">
      <div class="card-body">
        <h5 class="card-title">{{product.Product.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{product.Product.price}}</h6>
        <p
          class="card-text"
        >Produck kami adalah barang baru dengan harga murah tetapi dengan kualitas bermutut.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    props : ["data"],
  created() {
      console.log(this.$route.params.id , ' pplplplplpl')
    axios({
      url: `http://localhost:3000/transaction/${this.$route.params.id}/detail`,
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(data => {
        // this.trxList = data;
        // console.log(this.$router.params , ' ppopopopo=0 mkmkm gggg-----gg-g-')
        this.productList = data.data.ProductList;
        console.log(data  , ' =-----------------------------0===============')
        console.log(data.data.ProductList, " masa null sih");
      })
      .catch(err => {
        console.log(err);
      });
  },
  data (){
      return {
          productList : []
      }
  },
  computed : {
      productList (){
          return this.$route.params.id
      }
  }
};
</script>

<style>
</style>