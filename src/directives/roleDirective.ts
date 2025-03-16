import type { DirectiveBinding } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/components/ui/toast/use-toast";

export default {
  async mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore();
    const { toast } = useToast();

    el.style.display = "none";

    if (!Array.isArray(binding.value)) {
      console.error("v-role directive expects an array of roles");
      return;
    }

    // Fetch roles if not already loaded
    if (authStore.roles.length === 0) {
      try {
        await authStore.fetchRoles();
      } catch (error) {
        console.error("Error fetching roles:", error);

        toast({
          title: "Failed to load roles",
          description:
            "An error occurred while fetching roles. Please reload the page.",
          variant: "destructive",
          duration: 5000,
        });

        return;
      }
    }

    const userRole = authStore.userRole;
    const availableRoles = authStore.roles;

    const isValidRole = availableRoles.includes(userRole);
    const hasPermission = binding.value.includes(userRole);

    if (isValidRole && hasPermission) {
      el.style.display = "";
    }
  },
};
