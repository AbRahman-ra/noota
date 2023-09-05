import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SignupView from "@/views/SignupView.vue";
import LoginView from "@/views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/signup",
    component: SignupView,
  },
  {
    path: "/login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
