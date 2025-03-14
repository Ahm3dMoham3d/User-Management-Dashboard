<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
</script>

<template>
  <div class="grid lg:grid-cols-12 p-12 h-[100svh] gap-8">
    <div
      class="hidden lg:block lg:col-span-7 bg-[url(/auth.webp)] bg-center bg-cover relative rounded-lg"
    >
      <div
        id="layer"
        class="absolute h-full w-full bg-gradient-to-t from-primary flex p-8 items-end justify-center text-primary-foreground rounded-b-lg"
      >
        <div class="text-center">
          <h4 class="font-bold text-4xl mb-2">
            Secure Access to Your Admin Panel
          </h4>
          <p class="text-lg">
            Manage users efficiently with our powerful and intuitive dashboard.
            Log in to access your control panel and streamline user
            administration with ease.
          </p>
        </div>
      </div>
    </div>
    <div class="lg:col-span-5 flex flex-col items-center justify-center">
      <div class="px-2 max-w-[550px] w-full">
        <div class="flex items-center gap-2 justify-between mb-12">
          <Logo />
          <div class="flex items-center gap-2">
            <ThemeSwitcher />
          </div>
        </div>

        <div>
          <RouterView />
        </div>

        <div class="text-center text-sm text-muted-foreground mt-8">
          &copy; {{ new Date().getFullYear() }}
          <span class="font-semibold">ADMINX</span>. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>
