<template>
  <v-container class="cart-container">
    <v-col>
      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="cartWithoutRepetitions"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="addItem(item)"> mdi-plus </v-icon>
          <v-icon small @click="removeItem(item)"> mdi-minus </v-icon>
        </template>
        <template v-slot:[`item.quantity`]="{ item }">
          <div>
            {{ cart.filter((product) => product.id === item.id).length }}
          </div>
        </template>
        <template v-slot:[`item.subtotal`]="{ item }">
          <div>
            ${{
              item.price *
              cart.filter((product) => product.id === item.id).length
            }}
          </div>
        </template>
        <template v-slot:no-data> No tienes productos en el carrito. </template>
      </v-data-table>
    </v-col>
    <p>
      Total: ${{
        this.cart.reduce((acc, item) => {
          return (acc += parseInt(item.price));
        }, 0)
      }}
    </p>
    <v-btn @click="createOrder" color="accent" :disabled="cart.length === 0"
      >Comprar</v-btn
    >

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5"> ¡Orden recibida! </v-card-title>
          <v-card-text
            >Su orden se ha creado con ID <b>#{{ orderId }}</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cerrar
            </v-btn>
            <v-btn color="green darken-1" text @click="$router.push('/')">
              Ver productos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      orderId: null,
      headers: [
        {
          text: "Producto",
          value: "title",
          sortable: false,
          width: "10px",
          align: "left",
        },
        {
          text: "Cantidad",
          value: "quantity",
          sortable: false,
          width: "10px",
          align: "left",
        },
        {
          text: "Precio",
          value: "price",
          sortable: false,
          width: "10px",
          align: "left",
        },
        {
          text: "Subtotal",
          value: "subtotal",
          sortable: false,
          width: "10px",
          align: "left",
        },
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "10px",
          align: "left",
        },
      ],
    };
  },
  methods: {
    addItem: function (product) {
      this.$store.dispatch("addProductToCart", product);
    },
    removeItem: function (product) {
      this.$store.dispatch("removeProductFromCart", product.id);
    },
    createOrder: function () {
      let body = {
        products: this.cart,
        user: "user@mail.com",
      };
      axios
        .post("https://63c57095f80fabd877e89c0d.mockapi.io/api/orders", body)
        .then((response) => {
          this.orderId = response.data.id;
          this.dialog = true;
          this.$store.dispatch("emptyCart");
        })
        .catch((err) => {
          this.error = err;
          this.toggleSnackbar();
        });
    },
  },
  computed: {
    ...mapGetters(["cart", "cartWithoutRepetitions"]),
  },
};
</script>

<style lang="scss" scoped></style>
