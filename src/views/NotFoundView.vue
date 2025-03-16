<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-vue-next";
</script>
<template>
  <div
    class="h-screen flex flex-col justify-center items-center text-center px-6"
  >
    <div
      class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full"
    >
      <div class="flex flex-col items-center">
        <AlertCircle class="text-primary size-12" />
        <h1 class="text-4xl font-extrabold text-primary mt-4">404</h1>
        <p
          class="text-xl font-semibold text-foreground/80 dark:text-gray-300 mt-2"
        >
          Oops! Page Not Found
        </p>
        <p class="text-foreground/70 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button as-child class="mt-6 px-6 py-2 text-lg">
          <router-link to="/"> Return to Home </router-link>
        </Button>
      </div>
    </div>
  </div>
</template>
