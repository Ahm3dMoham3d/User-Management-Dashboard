import { describe, it, expect, beforeEach, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/store/authStore";
import { createRouter, createWebHistory } from "vue-router";

// Mock Router
const mockPush = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    mockPush.mockReset();
  });

  it("should start with default values", () => {
    const store = useAuthStore();
    expect(store.user).toBe(null);
    expect(store.token).toBe("");
    expect(store.roles).toEqual([]);
    expect(store.isAuthenticated).toBe(false);
    expect(store.userRole).toBe("");
  });

  it("should login successfully with valid credentials", async () => {
    const store = useAuthStore();

    await store.login({ email: "admin@example.com", password: "password" });

    expect(store.user).toEqual({
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    });
    expect(store.token).toBe("mock_jwt_token");
    expect(store.isAuthenticated).toBe(true);
    expect(store.userRole).toBe("admin");

    expect(localStorage.getItem("user")).toContain("admin@example.com");
    expect(localStorage.getItem("token")).toBe("mock_jwt_token");
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should fail login with invalid credentials", async () => {
    const store = useAuthStore();

    await expect(
      store.login({ email: "wrong@example.com", password: "123" })
    ).rejects.toThrow("Invalid credentials");

    expect(store.user).toBe(null);
    expect(store.token).toBe("");
    expect(store.isAuthenticated).toBe(false);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should log out and clear stored data", () => {
    const store = useAuthStore();

    store.user = {
      id: 1,
      name: "Test",
      email: "test@example.com",
      role: "admin",
    };
    store.token = "mock_token";
    localStorage.setItem("user", JSON.stringify(store.user));
    localStorage.setItem("token", "mock_token");

    store.logout();

    expect(store.user).toBe(null);
    expect(store.token).toBe("");
    expect(store.roles).toEqual([]);
    expect(localStorage.getItem("user")).toBe(null);
    expect(localStorage.getItem("token")).toBe(null);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
