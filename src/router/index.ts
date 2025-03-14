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
        name: "LoginView",
        component: AuthView,
        meta: { title: "Login" },
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = `AdminX - ${to.meta.title}`;
});

export { router };
