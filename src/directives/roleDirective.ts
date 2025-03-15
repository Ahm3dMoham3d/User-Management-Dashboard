import type { DirectiveBinding } from "vue";
import { useAuthStore } from "@/store/authStore";

export default {
  async mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore();

    el.style.display = "none";

    const userRole = authStore.userRole;
    const availableRoles = authStore.roles;

    if (!Array.isArray(binding.value)) {
      console.error("v-role directive expects an array of roles");
      return;
    }

    const isValidRole = availableRoles.includes(userRole);
    const hasPermission = binding.value.includes(userRole);

    if (isValidRole && hasPermission) {
      el.style.display = "";
    }
  },
};
