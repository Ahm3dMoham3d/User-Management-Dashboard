import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import type { User } from "@/store/usersStore";
import DropdownAction from "./data-table-dropdown.vue";
import { useRoleClasses } from "@/composables/useRoleClasses";
import { useStatusClasses } from "@/composables/useStatusClasses";

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
      const roleClass = useRoleClasses(role);

      return h(
        "span",
        {
          class: `px-2 py-1 rounded-md font-medium ${roleClass}`,
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
      const statusClass = useStatusClasses(status);

      return h(
        "span",
        {
          class: `px-2 py-1 rounded-md font-medium ${statusClass}`,
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
