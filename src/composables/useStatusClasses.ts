import type { User } from "@/store/usersStore";

export function useStatusClasses(status: User["status"]) {
  const statusClasses: Record<User["status"], string> = {
    active: "bg-green-500 text-white",
    inactive: "bg-gray-500 text-white",
  };

  return statusClasses[status] || "bg-gray-500 text-white";
}
