<template>
  <v-container>
    <v-form lazy-validation v-model="valid">
      <v-text-field
        v-model="user.email"
        label="Email"
        :rules="emailRules"
        required
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="user.password"
        label="Contraseña"
        :rules="passwordRules"
        required
      ></v-text-field>

      <v-btn color="accent" class="mr-4" @click="login" :disabled="!valid">
        Iniciar sesión
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      user: {
        email: null,
        password: null,
      },
      emailRules: [
        (v) => !!v || "El email es requerido",
        (v) => /.+@.+/.test(v) || "El email no es válido",
      ],
      passwordRules: [(v) => !!v || "La contraseña es requerida"],
    };
  },
  methods: {
    login: function () {
      this.$emit("loggedIn", this.user);
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style lang="scss" scoped></style>
