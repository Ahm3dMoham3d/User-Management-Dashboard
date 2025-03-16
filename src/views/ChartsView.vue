<script setup lang="ts">
import { DonutChart } from "@/components/ui/chart-donut";
import { useUsersStore } from "@/store/usersStore";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const usersStore = useUsersStore();
const route = useRoute();

const loadingState = computed(() => usersStore.loading);
const errorState = computed(() => usersStore.error);

// Data for User Roles
const rolesData = computed(() => [
  { name: "Admins", total: usersStore.roleCounts.admin, color: "#f97316" },
  { name: "Managers", total: usersStore.roleCounts.manager, color: "#3b82f6" },
  { name: "Viewers", total: usersStore.roleCounts.viewer, color: "#10b981" },
]);

// Data for User Status
const statusData = computed(() => [
  { name: "Active", total: usersStore.activeUsersCount, color: "#22c55e" },
  { name: "Inactive", total: usersStore.inactiveUsersCount, color: "#6b7280" },
]);

// Data for Users Joined
const joinedData = computed(() => [
  {
    name: "Last Week",
    total: usersStore.usersJoinedByTime.lastWeek,
    color: "#eab308",
  },
  {
    name: "Last Month",
    total: usersStore.usersJoinedByTime.lastMonth,
    color: "#8b5cf6",
  },
  {
    name: "Older",
    total: usersStore.usersJoinedByTime.older,
    color: "#ef4444",
  },
]);

const fetchUsers = async () => {
  await usersStore.getAllUsers(Number(route.query?.page) || 1, 10000);
};

onMounted(fetchUsers);
</script>

<template>
  <div v-if="loadingState" class="h-[70svh] flex items-center justify-center">
    Loading....
  </div>

  <div
    v-else-if="errorState"
    class="h-[70svh] flex items-center justify-center"
  >
    Error....
  </div>

  <div class="grid lg:grid-cols-3 my-4 gap-4" v-else>
    <!-- User Roles Chart -->
    <div class="border rounded-xl p-5">
      <h2 class="text-lg font-semibold">User Roles</h2>
      <p class="text-sm text-foreground/50">Distribution of user roles</p>
      <div class="flex flex-col items-center justify-center mt-4">
        <DonutChart
          type="pie"
          index="name"
          :category="'total'"
          :data="rolesData"
          :colors="rolesData.map((item) => item.color)"
        />
      </div>
      <div class="flex justify-center gap-4 mt-4">
        <span
          v-for="role in rolesData"
          :key="role.name"
          class="flex items-center gap-1 text-sm"
        >
          <span
            :style="{ backgroundColor: role.color }"
            class="w-3 h-3 rounded-full"
          ></span>
          {{ role.name }}
        </span>
      </div>
    </div>

    <!-- User Status Chart -->
    <div class="border rounded-xl p-5">
      <h2 class="text-lg font-semibold">User Status</h2>
      <p class="text-sm text-foreground/50">
        Overview of active and inactive users
      </p>
      <div class="flex flex-col items-center justify-center mt-4">
        <DonutChart
          type="pie"
          index="name"
          :category="'total'"
          :data="statusData"
          :colors="statusData.map((item) => item.color)"
        />
      </div>
      <div class="flex justify-center gap-4 mt-4">
        <span
          v-for="status in statusData"
          :key="status.name"
          class="flex items-center gap-1 text-sm"
        >
          <span
            :style="{ backgroundColor: status.color }"
            class="w-3 h-3 rounded-full"
          ></span>
          {{ status.name }}
        </span>
      </div>
    </div>

    <!-- Users Joined Chart -->
    <div class="border rounded-xl p-5">
      <h2 class="text-lg font-semibold">Users Joined</h2>
      <p class="text-sm text-foreground/50">Categorized by join date</p>
      <div class="flex flex-col items-center justify-center mt-4">
        <DonutChart
          type="pie"
          index="name"
          :category="'total'"
          :data="joinedData"
          :colors="joinedData.map((item) => item.color)"
        />
      </div>
      <div class="flex justify-center gap-4 mt-4">
        <span
          v-for="joined in joinedData"
          :key="joined.name"
          class="flex items-center gap-1 text-sm"
        >
          <span
            :style="{ backgroundColor: joined.color }"
            class="w-3 h-3 rounded-full"
          ></span>
          {{ joined.name }}
        </span>
      </div>
    </div>
  </div>
</template>
