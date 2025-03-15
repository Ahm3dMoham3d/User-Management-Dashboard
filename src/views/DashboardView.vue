<script setup lang="ts">
import DataTable from "@/components/data-table.vue";
import { columns } from "@/components/users/columns";
import { useUsersStore } from "@/store/usersStore";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const usersStore = useUsersStore();
const route = useRoute();

const usersData = computed(() => usersStore.users);
const usersTotalRecords = computed(() => usersStore.total);
const loadingState = computed(() => usersStore.loading);
const errorState = computed(() => usersStore.error);
const fetchUsers = () => {
  usersStore.getAllUsers(
    Number(route.query?.page) || 1,
    Number(route.query?.limit) || 10,
    route.query?.search?.toString() || "",
    route.query?.sort?.toString() || ""
  );
};
onMounted(() => {
  fetchUsers();
});

// Watch for route query changes
watch(
  () => route.query,
  () => {
    fetchUsers();
  },
  { deep: true }
);
</script>

<template>
  <DataTable
    :columns="columns"
    :data="usersData"
    :loading="loadingState"
    :error="errorState"
    filter-placeholder="Searching by name , email"
    :total-records="usersTotalRecords"
  />
</template>
