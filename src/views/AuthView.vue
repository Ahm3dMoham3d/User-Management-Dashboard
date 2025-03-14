<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye } from "lucide-vue-next";

const showPassword = ref(false);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h4 class="text-2xl font-medium tracking-tight text-primary">
      Log in to <span class="text-foreground">Manage Your Workspace</span>
    </h4>

    <!-- Email Input -->
    <div class="flex flex-col gap-2">
      <Label for="email">Email</Label>
      <Input id="email" type="email" autocomplete="email" />
    </div>

    <!-- Password Input -->
    <div class="flex flex-col gap-2">
      <Label for="password">Password</Label>
      <div class="relative">
        <Input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          class="pe-10"
          autocomplete="current-password"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute inset-y-0 end-2 flex items-center justify-center text-muted-foreground"
          aria-label="Toggle password visibility"
          aria-live="polite"
        >
          <EyeClosed v-if="!showPassword" class="size-6" />
          <Eye v-else class="size-6" />
        </button>
      </div>
    </div>

    <!-- Submit Button -->
    <Button class="mt-2">Login</Button>
  </div>
</template>
