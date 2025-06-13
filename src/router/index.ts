import { createRouter, createWebHistory } from "vue-router";
import { menu } from "./menu";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      redirect: "/radio/configuration",
      children: menu,
    },
  ],
});

export default router;
