<template>
  <v-container>
    <v-row>
      <v-btn depressed color="white" @click="$router.push('/')">
        <v-icon left dark> mdi-arrow-left </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col>
        <img :src="product.image" />
      </v-col>
      <v-col>
        <h3>{{ product.title }}</h3>
        <p>{{ product.long_description }}</p>
        <p>{{ product.price }}</p>
        <div>
          <v-btn
            v-if="this.$store.state.cart.cart.indexOf(product)"
            @click="addProductToCart"
            color="accent"
            text
          >
            Agregar al carrito
            <v-icon right dark> mdi-cart-plus </v-icon>
          </v-btn>
          <v-btn @click="removeProductFromCart" v-else>
            Eliminar del carrito
            <v-icon right dark> mdi-cart-minus </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    addProductToCart: function () {
      this.$store.dispatch("addProductToCart", this.product);
    },
    removeProductFromCart: function () {
      this.$store.dispatch("removeProductFromCart", this.product.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
