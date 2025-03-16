import { beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import "@testing-library/jest-dom/vitest";
// Ensure Pinia is active before each test
beforeEach(() => {
  setActivePinia(createPinia());
  localStorage.clear();
});
