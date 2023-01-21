<template>
  <div>
    <div>
      <Register @registered="registerUser" />
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="toggleSnackbar"> Cerrar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Register from "../components/Register";
import axios from "axios";

export default {
  name: "RegisterView",
  components: {
    Register,
  },
  data() {
    return {
      products: [],
      snackbar: false,
      timeout: 5000,
      message: "",
      snackbarColor: "error",
    };
  },
  methods: {
    toggleSnackbar: function () {
      this.snackbar = !this.snackbar;
    },
    registerUser: function (user) {
      axios
        .post("https://63c5ac4df80fabd877edec1d.mockapi.io/api/users", user)
        .then((data) => {
          this.message = "Usuario registrado con éxito";
          this.snackbarColor = "success";
          this.toggleSnackbar();
          this.$store.dispatch("login", data.data);
          this.$router.push("/");
        })
        .catch((err) => {
          this.message = err;
          this.snackbarColor = "error";
          this.toggleSnackbar();
        });
    },
  },
};
</script>
