<template>
  <div>
    <ProductList :products="products" />
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="toggleSnackbar"> Cerrar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";
import axios from "axios";

export default {
  name: "ProductListView",
  components: {
    ProductList,
  },
  data() {
    return {
      products: [],
      snackbar: false,
      timeout: 5000,
      error: "",
    };
  },
  methods: {
    toggleSnackbar: function () {
      this.snackbar = !this.snackbar;
    },
    getProducts: function () {
      axios
        .get("https://63c5ac4df80fabd877edec1d.mockapi.io/api/products")
        .then((response) => (this.products = response.data))
        .catch((err) => {
          this.error = err;
          this.toggleSnackbar();
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
