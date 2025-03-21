import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { router } from "./router";
import { createPinia } from "pinia";
import roleDirective from "@/directives/roleDirective";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.directive("role", roleDirective);
app.mount("#app");
