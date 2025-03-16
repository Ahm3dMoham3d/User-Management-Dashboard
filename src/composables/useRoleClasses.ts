import type { User } from "@/store/usersStore";

export function useRoleClasses(role: User["role"]) {
  const roleClasses: Record<User["role"], string> = {
    admin: "bg-purple-500 text-white",
    manager: "bg-blue-500 text-white",
    viewer: "bg-pink-500 text-white",
  };

  return roleClasses[role] || "bg-gray-500 text-white"; // Default fallback
}
