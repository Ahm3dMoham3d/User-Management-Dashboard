import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { mockApi } from "@/api/mockApi";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const token = ref<string>(localStorage.getItem("token") || "");

  // ✅ Correctly parse stored roles from localStorage
  const roles = ref<string[]>(
    JSON.parse(localStorage.getItem("roles") || "[]")
  );
  const isRolesFetched = ref(roles.value.length > 0); // Prevent re-fetching if stored

  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || "");

  async function fetchRoles() {
    if (isRolesFetched.value) return; // Prevent duplicate API calls
    try {
      const fetchedRoles = await mockApi.getRoles();
      roles.value = fetchedRoles;
      isRolesFetched.value = true;
      localStorage.setItem("roles", JSON.stringify(roles.value)); // Cache roles
    } catch (error) {
      console.error("Failed to fetch roles", error);
    }
  }

  async function login(credentials: { email: string; password: string }) {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        let mockUser: User | null = null;
        let mockToken = "mock_jwt_token";

        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "password"
        ) {
          mockUser = {
            id: 1,
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          };
        } else if (
          credentials.email === "manager@example.com" &&
          credentials.password === "password"
        ) {
          mockUser = {
            id: 2,
            name: "Manager User",
            email: "manager@example.com",
            role: "manager",
          };
        } else if (
          credentials.email === "viewer@example.com" &&
          credentials.password === "password"
        ) {
          mockUser = {
            id: 3,
            name: "Viewer User",
            email: "viewer@example.com",
            role: "viewer",
          };
        }

        if (mockUser) {
          user.value = mockUser;
          token.value = mockToken;

          localStorage.setItem("user", JSON.stringify(mockUser));
          localStorage.setItem("token", mockToken);

          await fetchRoles();

          resolve(mockUser);
          router.push("/dashboard");
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  }

  function logout() {
    user.value = null;
    token.value = "";
    roles.value = []; // Clear roles on logout
    isRolesFetched.value = false;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    router.push("/");
  }

  return {
    user,
    token,
    roles,
    isAuthenticated,
    userRole,
    fetchRoles,
    login,
    logout,
  };
});
