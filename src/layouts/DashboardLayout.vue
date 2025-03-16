<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import UserAvatar from "@/components/UserAvatar.vue";

const routesLinks = [
  {
    label: "Table View",
    to: "/dashboard",
  },

  {
    label: "Charts View",
    to: "/dashboard/charts",
  },
];
</script>
<template>
  <header
    class="flex items-center justify-between gap-2 container mx-auto py-6 px-4"
  >
    <Logo />
    <div class="flex items-center gap-2">
      <UserAvatar />
      <ThemeSwitcher />
    </div>
  </header>
  <main class="container mx-auto py-6 px-4">
    <div class="flex items-center gap-4">
      <RouterLink
        v-for="link in routesLinks"
        :key="link.label"
        exactActiveClass="p-1.5 text-white bg-primary rounded-md"
        :to="link.to"
      >
        {{ link.label }}
      </RouterLink>
    </div>
    <RouterView />
  </main>
</template>
