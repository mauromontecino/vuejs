import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#26865B",
        secondary: "#b0bec5",
        accent: "#EB8E45",
        error: "#b71c1c",
      },
    },
  },
});
