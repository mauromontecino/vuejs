import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const cartStore = {
  state: () => ({
    cart: [],
  }),
  mutations: {
    addProductToCart(state, product) {
      state.cart.push(product);
    },
    removeProductFromCart(state, productId) {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == productId) {
          state.cart.splice(i, 1);
          break;
        }
      }
    },
    emptyCart(state) {
      state.cart = [];
    },
  },
  actions: {
    addProductToCart({ commit }, payload) {
      commit("addProductToCart", payload);
    },
    removeProductFromCart({ commit }, payload) {
      commit("removeProductFromCart", payload);
    },
    emptyCart({ commit }) {
      commit("emptyCart");
    },
  },
  getters: {
    cart: (state) => state.cart,
    cartWithoutRepetitions: (state) => [...new Set(state.cart)],
    totalItems: (state) => [...new Set(state.cart)].length,
    productQuantity: (state) => (product) =>
      state.cart.filter((p) => p.id === product.id).length,
  },
};

const userStore = {
  state: () => ({
    user: null,
  }),
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, payload) {
      commit("login", payload);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    currentUser: (state) => state.user,
  },
};
export default new Vuex.Store({
  modules: {
    cart: cartStore,
    user: userStore,
  },
});
