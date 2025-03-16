<script setup lang="ts">
import { ref, onMounted } from "vue";
import { type User, useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-vue-next";

const userData = ref<User | null>(null);
const authStore = useAuthStore();

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    userData.value = JSON.parse(storedUser);
  }
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div class="w-full flex items-center gap-2 cursor-pointer">
        <Avatar>
          <AvatarFallback>{{
            userData?.name?.charAt(0) ?? "?"
          }}</AvatarFallback>
        </Avatar>

        <div v-if="userData">
          <div class="text-sm avatar">{{ userData.name }}</div>
        </div>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="authStore.logout()">
        <div class="w-full flex items-center justify-between">
          <span>Logout</span> <LogOut class="h-[1.2rem] w-[1.2rem]" />
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
