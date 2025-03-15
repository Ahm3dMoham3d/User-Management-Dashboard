import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const SESSION_TIMEOUT = 30 * 60 * 1000;

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const token = ref<string>(localStorage.getItem("token") || "");
  const lastActive = ref<number>(
    parseInt(localStorage.getItem("lastActive") || "0")
  );
  const router = useRouter();
  let sessionTimer: ReturnType<typeof setTimeout> | null = null;

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || "");

  function login(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
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
          lastActive.value = Date.now();

          localStorage.setItem("user", JSON.stringify(mockUser));
          localStorage.setItem("token", mockToken);
          localStorage.setItem("lastActive", lastActive.value.toString());

          startSessionTimeout();
          resolve(mockUser);
          router.push("/dashboard");
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  }

  function logout(): void {
    user.value = null;
    token.value = "";
    lastActive.value = 0;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("lastActive");

    if (sessionTimer) {
      clearTimeout(sessionTimer);
      sessionTimer = null;
    }

    router.push("/");
  }

  function startSessionTimeout() {
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }

    sessionTimer = setTimeout(() => {
      if (isAuthenticated.value) {
        logout();
        alert("Session expired. Please log in again.");
      }
    }, SESSION_TIMEOUT);
  }

  function updateLastActive() {
    lastActive.value = Date.now();
    localStorage.setItem("lastActive", lastActive.value.toString());
    startSessionTimeout(); // Reset session timeout
  }

  document.addEventListener("mousemove", updateLastActive);
  document.addEventListener("keydown", updateLastActive);

  // Run session timeout check on store initialization
  if (isAuthenticated.value) {
    startSessionTimeout();
  }

  return {
    user,
    token,
    isAuthenticated,
    userRole,
    login,
    logout,
    updateLastActive,
  };
});
