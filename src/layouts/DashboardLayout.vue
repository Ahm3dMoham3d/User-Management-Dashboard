<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import UserAvatar from "@/components/UserAvatar.vue";
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
    <RouterView />
  </main>
</template>
