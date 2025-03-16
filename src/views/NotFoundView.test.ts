import { render, screen } from "@testing-library/vue";
import NotFound from "./NotFoundView.vue"; // Adjust the path
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect } from "vitest";

describe("NotFound.vue", () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: "/", component: { template: "<div>Home</div>" } }],
  });

  it("renders the 404 page with correct text", () => {
    render(NotFound, { global: { plugins: [router] } });

    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you are looking for doesn't exist or has been moved."
      )
    ).toBeInTheDocument();
  });

  it("renders the return home button", async () => {
    render(NotFound, { global: { plugins: [router] } });

    const button = screen.getByRole("link", { name: "Return to Home" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/");
  });
});
