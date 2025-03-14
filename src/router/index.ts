import { createMemoryHistory, createRouter } from "vue-router";

import AuthView from "@/views/AuthView.vue";

const routes = [{ path: "/", component: AuthView }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export { router };
