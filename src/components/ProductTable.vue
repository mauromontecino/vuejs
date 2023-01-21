<template lang="html">
  <div>
    <v-data-table :items="foods" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon small @click="openEditDialog(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>

    <v-dialog persistent v-model="dialog">
      <v-card>
        <v-card-title>Editar producto</v-card-title>
        <v-container>
          <ProductForm
            @itemAdded="editItem"
            :id-prop="editedItem.id"
            :title-prop="editedItem.title"
            :description-prop="editedItem.description"
            :long-description-prop="editedItem.long_description"
            :price-prop="editedItem.price"
          ></ProductForm>
          <v-btn @click="toggleDialog">Cancelar</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="js">
import ProductForm from "./ProductForm";
export default {
  name: 'ProductTable',
  components: {ProductForm},
  props: {
    foods: Array,
  },
  data() {
    return {
      editedItem: {},
      dialog: false,
      headers: [
        {text: 'Título', value: 'title'},
        {text: 'Descripción', value: 'description'},
        {text: 'Descripción larga', value: 'long_description'},
        {text: 'Precio', value: 'price'},
        {text: 'Acciones', value: 'actions', sortable: false},
      ]
    }
  },
  methods: {
    deleteItem(item) {
      this.$emit('itemDeleted', item)
    },
    openEditDialog(item) {
      this.editedItem = item;
      this.toggleDialog();
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    editItem(product){
      this.toggleDialog();
      this.$emit('productEdited', product);
    }
  }
}
</script>
