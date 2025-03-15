import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import type { User } from "@/store/usersStore";
import DropdownAction from "./data-table-dropdown.vue";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-start" }, "#"),
  },
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-start" }, "Name"),
  },

  {
    accessorKey: "email",
    header: () => h("div", { class: "text-start" }, "Email"),
  },

  {
    accessorKey: "role",
    header: () => h("div", { class: "text-start" }, "Role"),
    cell: ({ row }) => {
      const role: User["role"] = row.getValue("role");

      const roleClasses: Record<User["role"], string> = {
        admin: "bg-purple-500 text-white",
        manager: "bg-blue-500 text-white",
        viewer: "bg-pink-500 text-white",
      };

      return h(
        "span",
        {
          class: `px-2 py-1 rounded-md font-medium ${roleClasses[role]}`,
        },
        role.toUpperCase()
      );
    },
  },

  {
    accessorKey: "status",
    header: () => h("div", { class: "text-start" }, "Status"),
    cell: ({ row }) => {
      const status: User["status"] = row.getValue("status");

      const statusClasses: Record<User["status"], string> = {
        active: "bg-green-500 text-white",
        inactive: "bg-gray-500 text-white",
      };

      return h(
        "span",
        {
          class: `px-2 py-1 rounded-md font-medium ${statusClasses[status]}`,
        },
        status.charAt(0).toUpperCase() + status.slice(1)
      );
    },
  },

  {
    accessorKey: "dateJoined",
    header: () => h("div", { class: "text-start" }, "Date Joined"),
    cell: ({ row }) => {
      const rawDate: string = row.getValue("dateJoined");
      const formattedDate = new Date(rawDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return h("span", { class: "font-medium" }, formattedDate);
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          user,
        })
      );
    },
  },
];
