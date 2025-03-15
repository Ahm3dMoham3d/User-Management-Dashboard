import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const AuthLayout = () => import("@/layouts/AuthLayout.vue");
const AuthView = () => import("@/views/AuthView.vue");

const DashboardLayout = () => import("@/layouts/DashboardLayout.vue");
const DashboardView = () => import("@/views/DashboardView.vue");

const NotFoundView = () => import("@/views/NotFoundView.vue");

const routes = [
  {
    path: "/",
    component: AuthLayout,
    meta: { authView: true },
    children: [
      {
        path: "",
        name: "LoginView",
        component: AuthView,
        meta: { title: "Login" },
      },
    ],
  },

  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "DashboardView",
        component: DashboardView,
        meta: { title: "Dashboard" },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: { title: "404 Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  document.title = `AdminX - ${to.meta.title}`;

  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/");
  } else if (to.meta.authView && authStore.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export { router };
