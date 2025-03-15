<script setup lang="ts">
import { ref } from "vue";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useUsersStore } from "@/store/usersStore.ts";

defineProps<{
  user: {
    id: string;
  };
}>();

const usersStore = useUsersStore();
const isDialogOpen = ref(false);

const deleteUser = async (id: string) => {
  await usersStore.deleteUser(Number(id));
  isDialogOpen.value = false; // Close the dialog after deletion
};
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
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
        <DropdownMenuItem v-role="['admin', 'manager', 'viewer']" as-child>
          <RouterLink :to="`/dashboard/users/${user.id}`">
            <div class="flex w-full items-center gap-1 justify-between">
              View
              <Eye class="size-5" />
            </div>
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem v-role="['admin', 'manager']" as-child>
          <RouterLink :to="`/dashboard/users/edit/${user.id}`">
            <div class="flex w-full items-center gap-1 justify-between">
              Edit
              <Edit class="size-5" />
            </div>
          </RouterLink>
        </DropdownMenuItem>

        <DialogTrigger asChild>
          <DropdownMenuItem v-role="['admin']" @click="isDialogOpen = true">
            <div
              class="flex text-red-500 w-full items-center gap-1 justify-between"
            >
              Delete
              <Trash class="size-5" />
            </div>
          </DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>

    <DialogContent class="max-w-md p-6">
      <DialogHeader>
        <DialogTitle class="text-lg font-semibold text-red-600">
          Confirm Deletion
        </DialogTitle>
        <DialogDescription class="text-foreground/90">
          This action is irreversible. Are you sure you want to delete this item
          permanently?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="flex justify-end gap-3 mt-4">
        <DialogClose as-child>
          <Button variant="outline" @click="isDialogOpen = false"
            >Cancel</Button
          >
        </DialogClose>

        <Button
          type="submit"
          :disabled="usersStore.actionPending"
          variant="destructive"
          @click="deleteUser(user.id)"
          >Confirm</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
