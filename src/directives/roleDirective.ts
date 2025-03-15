import type { DirectiveBinding } from "vue";
import { useAuthStore } from "@/store/authStore";

export default {
  async mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore();
    await authStore.fetchRoles();

    const userRole = authStore.userRole;
    const availableRoles = authStore.roles; // Get roles from API

    if (!Array.isArray(binding.value)) {
      console.error("v-role directive expects an array of roles");
      return;
    }

    const isValidRole = availableRoles.includes(userRole);
    const hasPermission = binding.value.includes(userRole);

    if (!isValidRole || !hasPermission) {
      el.parentNode?.removeChild(el);
    }
  },
};
