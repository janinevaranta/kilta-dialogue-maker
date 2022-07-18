import { createRouter, createWebHashHistory } from "vue-router";
import Dialogue from "../views/Dialogue.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Dialogue,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;