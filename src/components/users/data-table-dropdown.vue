<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Trash, Edit } from "lucide-vue-next";

defineProps<{
  user: {
    id: string;
  };
}>();

// function copy(id: string) {
//   navigator.clipboard.writeText(id);
// }
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem as-child>
        <RouterLink :to="`/dashboard/users/${user.id}`">
          <div class="flex w-full items-center gap-1 justify-between">
            View
            <Eye class="size-5" />
          </div>
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <RouterLink :to="`/dashboard/users/edit/${user.id}`">
          <div class="flex w-full items-center gap-1 justify-between">
            Edit
            <Edit class="size-5" />
          </div>
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuItem as-child>
        <RouterLink :to="`/dashboard/users/edit/${user.id}`">
          <div
            class="flex text-red-500 w-full items-center gap-1 justify-between"
          >
            Delete
            <Trash class="size-5" />
          </div>
        </RouterLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
