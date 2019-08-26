<template>
  <div class="container d-flex flex-column justify-content-center" style="margin-top : 100px;">
    <form enctype="multipart/form-data" v-on:submit.prevent="addProduct">
      <div class="form-group">
        <label for="exampleInputEmail1">name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input
          type="number"
          class="form-control"
          placeholder="Enter Price"
          v-model="price"
        />
      </div>
      <div class="form-group form-check">
        <input type="file" @change="previewFile" id="file" ref="myFiles" />
        <label class="form-check-label" for="exampleCheck1">image</label>
      </div>
      <div class="form-group form-check">
        <input
          type="number"
          class="form-control"
          placeholder="Enter stock"
          v-model="stock"
        />
        <label class="form-check-label" for="exampleCheck1">Stock</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <table class="table pt-2">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  created (){

  },
  methods: {
    addProduct() {}
  },
  data() {
    return {
      name: "",
      price: 0,
      stock: 0,
      image: ""
    };
  }
};
</script>

<style>
</style>