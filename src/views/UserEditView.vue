<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUsersStore } from "@/store/usersStore";
import { Loader, AlertCircle } from "lucide-vue-next";
import { useDateFormatter } from "@/composables/useDateFormatter";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const route = useRoute();
const router = useRouter();
const usersStore = useUsersStore();

const form = ref({
  name: "",
  email: "",
  role: "",
  status: "",
});

// Validation state
const errors = ref<Record<string, string | null>>({
  name: null,
  email: null,
  role: null,
  status: null,
});

// Fetch user data on mount
onMounted(async () => {
  if (route.params.id) {
    await usersStore.getUserById(route.params.id as string);
    if (usersStore.user) {
      form.value = { ...usersStore.user };
    }
  }
});

// Watch for user data changes
watch(
  () => usersStore.user,
  (user) => {
    if (user) {
      form.value = { ...user };
    }
  }
);

// Form validation
const validateForm = () => {
  errors.value = {
    name: form.value.name ? null : "Name is required",
    email: /\S+@\S+\.\S+/.test(form.value.email) ? null : "Invalid email",
    role: form.value.role ? null : "Role is required",
    status: form.value.status ? null : "Status is required",
  };

  return Object.values(errors.value).every((error) => error === null);
};

// Submit function
const submitForm = async () => {
  if (!validateForm()) return;

  try {
    await usersStore.editUser(Number(route.params.id), form.value);
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
  }
};

// Store-based loading and error states
const isLoading = computed(() => usersStore.loading);
const errorMessage = computed(() => usersStore.error);
const actionPending = computed(() => usersStore.actionPending);
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 border rounded-md grid gap-4">
    <h2 class="text-lg font-bold border-b pb-2">Edit User</h2>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center">
      <Loader class="animate-spin size-6" />
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="text-red-600 flex items-center gap-2">
      <AlertCircle class="size-5" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- User Form -->
    <form v-else @submit.prevent="submitForm" class="grid gap-3">
      <div class="grid gap-1">
        <Label for="name">Name:</Label>
        <Input id="name" v-model="form.name" type="text" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div class="grid gap-1">
        <Label for="email">Email:</Label>
        <Input id="email" v-model="form.email" type="email" />
        <p v-if="errors.email" class="text-red-500 text-sm">
          {{ errors.email }}
        </p>
      </div>

      <div class="grid gap-1">
        <Label for="role">Role:</Label>
        <Select v-model="form.role">
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p v-if="errors.role" class="text-red-500 text-sm">{{ errors.role }}</p>
      </div>

      <div class="grid gap-1">
        <Label for="status">Status:</Label>
        <Select v-model="form.status">
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p v-if="errors.status" class="text-red-500 text-sm">
          {{ errors.status }}
        </p>
      </div>

      <Button type="submit" :disabled="actionPending" class="w-full">
        Save Changes
      </Button>
    </form>
  </div>
</template>
