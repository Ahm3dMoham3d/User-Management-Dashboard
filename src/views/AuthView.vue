<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye } from "lucide-vue-next";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async (event: Event) => {
  event.preventDefault();
  loading.value = true;
  errorMessage.value = "";

  try {
    await authStore.login({ email: email.value, password: password.value });
  } catch (error) {
    errorMessage.value = (error as Error).message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <h4 class="text-2xl font-medium tracking-tight text-primary">
      Log in to <span class="text-foreground">Manage Your Workspace</span>
    </h4>

    <form @submit="handleLogin" class="flex flex-col gap-4">
      <!-- Email Input -->
      <div class="flex flex-col gap-2">
        <Label for="email">Email</Label>
        <Input
          v-model="email"
          id="email"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <!-- Password Input -->
      <div class="flex flex-col gap-2">
        <Label for="password">Password</Label>
        <div class="relative">
          <Input
            v-model="password"
            id="password"
            :type="showPassword ? 'text' : 'password'"
            class="pe-10"
            autocomplete="current-password"
            required
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

      <!-- Error Message -->
      <div v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </div>

      <!-- Submit Button -->
      <Button id="login-button" :disabled="loading" type="submit" class="mt-2">
        {{ loading ? "Logging in..." : "Login" }}
      </Button>
    </form>
  </div>
</template>
