<script setup lang="ts"></script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-7xl font-bold text-primary">404</h1>
    <h2 class="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
    <p class="text-gray-400 mt-2 text-lg text-center">
      The page you are looking for doesn't exist or has been moved.
    </p>
    <router-link
      to="/"
      class="mt-6 px-4 py-2 bg-primary text-white text-lg font-medium rounded-lg shadow-lg hover:bg-primary/80 transition-all"
    >
      Return to Home
    </router-link>
  </div>
</template>
