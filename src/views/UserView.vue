<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "@/store/usersStore";
import { Loader, AlertCircle } from "lucide-vue-next";
import { useDateFormatter } from "@/composables/useDateFormatter";
import { useRoleClasses } from "@/composables/useRoleClasses";
import { useStatusClasses } from "@/composables/useStatusClasses";

const route = useRoute();
const usersStore = useUsersStore();

onMounted(() => {
  if (route.params.id) {
    usersStore.getUserById(route.params.id as string);
  }
});

const user = computed(() => usersStore.user);
const formattedDate = computed(() =>
  user.value ? useDateFormatter(user.value.dateJoined).value : ""
);
const roleClass = computed(() =>
  user.value ? useRoleClasses(user.value.role) : ""
);
const statusClass = computed(() =>
  user.value ? useStatusClasses(user.value.status) : ""
);
</script>

<template>
  <div>
    <div class="w-full max-w-3xl grid gap-4 grid-cols-2 border p-6">
      <h2 class="col-span-2 text-lg font-bold border-b pb-2">User Details</h2>

      <div v-if="usersStore.loading" class="col-span-2 flex justify-center">
        <Loader class="animate-spin size-6" />
      </div>

      <div
        v-else-if="usersStore.error"
        class="col-span-2 text-red-600 flex items-center gap-2"
      >
        <AlertCircle class="size-5" />
        <span>{{ usersStore.error }}</span>
      </div>

      <template v-else-if="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p>
          <strong class="me-2">Role:</strong>
          <span :class="`px-2 py-1 rounded-md font-medium ${roleClass}`">
            {{ user.role.toUpperCase() }}
          </span>
        </p>
        <p>
          <strong class="me-2">Status:</strong>
          <span :class="`px-2 py-1 rounded-md font-medium ${statusClass}`">
            {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
          </span>
        </p>
        <p class="col-span-2">
          <strong>Date Joined:</strong> {{ formattedDate }}
        </p>
      </template>
    </div>
  </div>
</template>
