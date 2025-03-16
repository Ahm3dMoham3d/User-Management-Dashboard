import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const AuthLayout = () => import("@/layouts/AuthLayout.vue");
const AuthView = () => import("@/views/AuthView.vue");

const DashboardLayout = () => import("@/layouts/DashboardLayout.vue");
const DashboardView = () => import("@/views/DashboardView.vue");
const ChartsView = () => import("@/views/ChartsView.vue");

const UserView = () => import("@/views/UserView.vue");
const UserEditView = () => import("@/views/UserEditView.vue");

const NotFoundView = () => import("@/views/NotFoundView.vue");
const UnauthorizedView = () => import("@/views/UnauthorizedView.vue");

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
        meta: { title: "Dashboard", roles: ["admin", "manager", "viewer"] },
      },

      {
        path: "charts",
        name: "ChartsView",
        component: ChartsView,
        meta: { title: "Charts", roles: ["admin"] },
      },

      {
        path: "users/:id",
        name: "UserView",
        component: UserView,
        meta: { title: "User Details", roles: ["admin", "manager", "viewer"] },
      },

      {
        path: "users/edit/:id",
        name: "UserEditView",
        component: UserEditView,
        meta: { title: "Edit User", roles: ["admin", "manager"] },
      },
    ],
  },

  {
    path: "/unauthorized",
    name: "UnauthorizedView",
    component: UnauthorizedView,
    meta: { title: "Unauthorized" },
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

router.beforeEach(async (to, _, next) => {
  document.title = `AdminX - ${to.meta.title}`;

  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.userRole; // Current user's role

  // Ensure roles are loaded before checking
  if (!authStore.roles.length) {
    await authStore.fetchRoles();
  }

  const userRoles = authStore.roles; // Fetched roles from store
  const allowedRoles = Array.isArray(to.meta.roles) ? to.meta.roles : [];

  // 🚧 Check if user is authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/");
  }

  // 🚧 Prevent authenticated users from accessing auth views (e.g., login)
  if (to.meta.authView && isAuthenticated) {
    return next("/dashboard");
  }

  // 🚧 Ensure the user's role is valid and has access to the route
  if (
    allowedRoles.length &&
    (!userRoles.includes(userRole) || !allowedRoles.includes(userRole))
  ) {
    return next("/unauthorized");
  }

  next();
});
export { router };
