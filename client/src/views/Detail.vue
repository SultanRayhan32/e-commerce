<template>
  <div class="container" style="margin-top : 100px;">
    <div class="row p-5">
      <div class="card col-xl-6 col-lg-6 col-md-6 col-sm-7" style="width : 450px; height : 500px;">
        <div class="pt-4">
          <img :src="this.image" style="width : 350px; height : 400px;" />
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div class="card" style="width: 290px; height : 150px; border : none;">
          <div class="card-body">
            <div class="pl-4">
              <h5 class="card-title">{{name}}</h5>
              <h5 class="card-subtitle text-muted pt-3">Price : Rp. {{price}}</h5>
            </div>
            <div class="pr-5">
                <h5 class="card-subtitle text-muted pt-4">Stock : {{stock}}</h5>
            </div>
          </div>
        </div>
        <div class="card mt-3" style="width: 290px; height : 150px; border : none;">
          <div class="card-body">
            <div class="input-group pl-5">
              <input type="button" value="-" class="button-minus" data-field="quantity" @click="qtyMin()" />
              <input type="number" step="1" max value="1" name="quantity" class="quantity-field" v-model="qty" />
              <input type="button" value="+" class="button-plus" data-field="quantity" @click="qtyPlus()" />
            </div>
            <div class="pr-3">
              <h5>Rp. {{price * qty}}</h5>
            </div>
          </div>
        </div>
        <div class="card mt-5" style="width: 290px; height : 150px; border : none; background-color : #b2b2b2;">
          <input type="button" class="btn btn-primary" value="Add To Cart" @click="addToCart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      image: "",
      name : '',
      price : 0,
      stock : '',
      qty : 1,
      id : ''
    };
  },
  created (){
      axios.get(`http://localhost:3000/product/${this.$route.params.id}`)
      .then( ( {data})=>{
          let { image , name , price, stock , _id } = data
          this.image = image
          this.name = name
          this.stock = stock
          this.price = price
          this.id = _id
          console.log(data)
      })
      .catch(err=>{
          console.log(err)
      })
  },
  methods : {
      qtyPlus (){
         this.qty++
      },
      qtyMin (){
          this.qty--
          if(this.qty < 0){
              this.qty++
          }
      },
      addToCart (){
          axios({
              url : 'http://localhost:3000/cart',
              method : 'POST',  
              headers : {
                  token : localStorage.getItem('token')
              },
              data : {
                  id : this.id,
                  qty : this.qty
              }
          })
          .then(data=>{
               this.$swal('Sukses Add To Cart');
                console.log(data)
                this.stock -= this.qty
          })
          .catch(err=>{
            //   console.log(err.data , ' == = = = = = ')
            this.$swal('Stok Tidak CUkup');
          })
      }
  }
};
</script>

<style>
input,
textarea {
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 10px;
}

input[type="button"] {
  -webkit-appearance: button;
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.input-group {
  clear: both;
  margin: 15px 0;
  position: relative;
}

.input-group input[type="button"] {
  background-color: #eeeeee;
  min-width: 38px;
  width: auto;
  transition: all 300ms ease;
}

.input-group .button-minus,
.input-group .button-plus {
  font-weight: bold;
  height: 38px;
  padding: 0;
  width: 38px;
  position: relative;
}

.input-group .quantity-field {
  position: relative;
  height: 38px;
  left: -6px;
  text-align: center;
  width: 62px;
  display: inline-block;
  font-size: 13px;
  margin: 0 0 5px;
  resize: vertical;
}

.button-plus {
  left: -13px;
}

input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
</style> 
