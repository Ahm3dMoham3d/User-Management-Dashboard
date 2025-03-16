// src/composables/useDateFormatter.ts
import { computed } from "vue";

export function useDateFormatter(date: string | Date, format = "long") {
  return computed(() => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: format === "short" ? "short" : "long",
      day: "2-digit",
    }).format(parsedDate);
  });
}
