<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="title"
        label="Nombre"
        :rules="titleRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="description"
        label="Descripción"
        :rules="descriptionRules"
        required
      ></v-text-field>
      <v-textarea
        v-model="longDescription"
        label="Descripción larga"
        :rules="descriptionRules"
        required
      ></v-textarea>

      <v-text-field
        type="number"
        v-model.number="price"
        label="Precio"
        :rules="priceRules"
        required
      ></v-text-field>
      <v-btn color="accent" @click="addItem" :disabled="!valid"> Enviar </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    idProp: {
      type: String,
      default: "",
    },
    titleProp: {
      type: String,
      default: "",
    },
    descriptionProp: {
      type: String,
      default: "",
    },
    longDescriptionProp: {
      type: String,
      default: "",
    },
    priceProp: {
      type: String,
      default: "0.0",
    },
  },
  data() {
    return {
      id: this.idProp,
      title: this.titleProp,
      description: this.descriptionProp,
      longDescription: this.longDescriptionProp,
      price: this.priceProp,
      valid: false,
      titleRules: [(v) => !!v || "El nombre es requerido"],
      priceRules: [(v) => !!v || "El precio es requerido"],
      descriptionRules: [(v) => !!v || "La descripción es requerida"],
    };
  },
  methods: {
    addItem: function () {
      this.validate();
      let food = {
        id: this.id,
        title: this.title,
        description: this.description,
        long_description: this.longDescription,
        price: this.price,
      };
      this.$emit("itemAdded", food);
      this.title = null;
      this.description = null;
      this.longDescription = null;
      this.price = 0;
      this.$refs.form.reset();
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
label {
  margin-left: 0.5em !important;
}
</style>
