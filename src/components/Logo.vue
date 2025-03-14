<script setup lang="ts">
import { Users } from "lucide-vue-next";
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      class="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
    >
      <Users class="text-primary-foreground h-7 w-7" />
    </div>

    <div class="font-bold text-lg">
      ADMIN<span class="text-primary">X</span>
    </div>
  </div>
</template>
