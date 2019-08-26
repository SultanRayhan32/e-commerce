<template>
  <div>
    <nav
      class="navbar navbar-expand-lg fixed-top navbar-light bg-light d-flex justify-content-center"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="!checkAdmin && statusAdmin != 'yes'">
            <router-link class="nav-link" to="/cart">Cart</router-link>
          </li>
           <li class="nav-item" v-if="checkAdmin == 'yes' || statusAdmin == 'yes'">
            <router-link class="nav-link" to="/admin1">Admin Konfirm</router-link>
          </li>
          <li class="nav-item" v-if="checkAdmin == 'yes' || statusAdmin == 'yes'">
            <router-link class="nav-link" to="/admin2">Product Crud</router-link>
          </li>
          <li class="nav-item" v-if="!checkAdmin && statusAdmin != 'yes'" >
            <router-link class="nav-link" to="/transaksiuser">Histori Transaksi</router-link>
          </li>
         </ul>
      </div>
      <div>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" tabindex="-1" aria-disabled="true" @click="LogOut">LogOut</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    LogOut() {
      localStorage.clear();
      this.$store.commit('LOGOUT' , '')
      this.$router.push({ path: "/login" });
    }
  },
  computed :{
    checkAdmin () {
      return this.$store.state.checkAdmin
    }
  },
  data (){
    return {
      statusAdmin : localStorage.getItem('admin')
    }
  }
};
</script>

<style>
</style>