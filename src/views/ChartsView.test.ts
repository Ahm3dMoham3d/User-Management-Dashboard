import { setActivePinia, createPinia } from "pinia";
import { useUsersStore } from "@/store/usersStore";
import { describe, beforeEach, expect, test, vi } from "vitest";

describe("Users Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("mock roleCounts without changing the store", () => {
    const store = useUsersStore();

    // Mock the roleCounts value
    vi.spyOn(store, "roleCounts", "get").mockReturnValue({
      admin: 5,
      manager: 3,
      viewer: 10,
    });

    expect(store.roleCounts.admin).toBe(5);
    expect(store.roleCounts.manager).toBe(3);
    expect(store.roleCounts.viewer).toBe(10);
  });
});
