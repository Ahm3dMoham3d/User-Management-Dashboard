<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      class="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
    >
      <Icon icon="mdi:users" class="text-primary-foreground h-8 w-8" />
    </div>

    <div class="font-bold text-lg">
      ADMIN<span class="text-primary">X</span>
    </div>
  </div>
</template>
