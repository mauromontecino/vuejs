import Vue from "vue";
import VueRouter from "vue-router";
import Cart from "../components/Cart.vue";
import ProductListView from "../views/ProductListView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProductCRUDView from "../views/ProductCRUDView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import PageNotFoundView from "../views/PageNotFoundView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/",
    name: "ProductList",
    component: ProductListView,
  },
  {
    path: "/product/:id",
    name: "ProductDetailView",
    component: ProductDetailView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: ProductCRUDView,
  },
  {
    path: "*",
    name: "PageNotFoundView",
    component: PageNotFoundView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
