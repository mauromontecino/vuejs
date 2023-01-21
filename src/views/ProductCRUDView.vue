<template>
  <div>
    <v-container>
      <v-col>
        <ProductForm @itemAdded="addProduct" />
      </v-col>
      <v-col>
        <ProductTable
          @itemDeleted="deleteProduct"
          @productEdited="editProduct"
          :foods="products"
        />
      </v-col>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="toggleSnackbar"> Cerrar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import axios from "axios";

export default {
  components: {
    ProductForm,
    ProductTable,
  },
  data() {
    return {
      products: [],
      message: "",
      snackbar: false,
      timeout: 10000,
      snackbarColor: "error",
    };
  },
  methods: {
    getProducts: function () {
      axios
        .get("https://63c5ac4df80fabd877edec1d.mockapi.io/api/products")
        .then((response) => (this.products = response.data))
        .catch((err) => {
          this.message = err;
          this.snackbarColor = "error";
          this.toggleSnackbar();
        });
    },
    toggleSnackbar: function () {
      this.snackbar = !this.snackbar;
    },
    addProduct: function (product) {
      axios
        .post(
          "https://63c5ac4df80fabd877edec1d.mockapi.io/api/products",
          product
        )
        .then(() => {
          this.message = "Producto agregado.";
          this.snackbarColor = "success";
          this.toggleSnackbar();
          this.getProducts();
        })
        .catch((err) => {
          this.message = err;
          this.snackbarColor = "error";
          this.toggleSnackbar();
        });
    },
    editProduct: function (product) {
      axios
        .put(
          "https://63c5ac4df80fabd877edec1d.mockapi.io/api/products/" +
            product.id,
          product
        )
        .then(() => {
          this.message = "Producto editado.";
          this.snackbarColor = "success";
          this.toggleSnackbar();
          this.getProducts();
        })
        .catch((err) => {
          this.message = err;
          this.snackbarColor = "error";
          this.toggleSnackbar();
        });
    },
    deleteProduct: function (product) {
      axios
        .delete(
          "https://63c5ac4df80fabd877edec1d.mockapi.io/api/products/" +
            product.id.toString()
        )
        .then(() => {
          this.message = `Producto ${product.title} eliminado.`;
          this.snackbarColor = "success";
          this.toggleSnackbar();
          this.getProducts();
        })
        .catch((err) => {
          this.message = err;
          this.snackbarColor = "error";
          this.toggleSnackbar();
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped></style>
