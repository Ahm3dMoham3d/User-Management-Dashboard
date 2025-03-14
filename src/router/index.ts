import { createMemoryHistory, createRouter } from "vue-router";

const AuthLayout = () => import("@/layouts/AuthLayout.vue");
const AuthView = () => import("@/views/AuthView.vue");

const routes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "LoginPage",
        component: AuthView,
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export { router };
