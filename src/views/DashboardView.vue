<script setup lang="ts">
import DataTable from "@/components/data-table.vue";
import { columns } from "@/components/users/columns";
import { useUsersStore } from "@/store/usersStore";
import { computed, onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Filter } from "lucide-vue-next";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const usersStore = useUsersStore();
const route = useRoute();
const router = useRouter();

const usersData = computed(() => usersStore.users);
const usersTotalRecords = computed(() => usersStore.total);
const loadingState = computed(() => usersStore.loading);
const errorState = computed(() => usersStore.error);

// Main filters (used in API request)
const selectedRoles = ref<string[]>(
  route.query.roles ? route.query.roles.toString().split(",") : []
);
const selectedStatus = ref<string | null>(
  route.query.status?.toString() || null
);

const tempRoles = ref<string[]>([...selectedRoles.value]);
const tempStatus = ref<string | null>(selectedStatus.value);

const fetchUsers = () => {
  usersStore.getAllUsers(
    Number(route.query?.page) || 1,
    Number(route.query?.limit) || 10,
    route.query?.search?.toString() || "",
    route.query?.sort?.toString() || "",
    selectedRoles.value,
    selectedStatus.value || ""
  );
};

onMounted(fetchUsers);

// Watch for route query changes
watch(
  () => route.query,
  () => fetchUsers(),
  { deep: true }
);

const applyFilters = () => {
  selectedRoles.value = [...tempRoles.value];
  selectedStatus.value = tempStatus.value;

  router.push({
    query: {
      ...route.query,
      roles: selectedRoles.value.length
        ? selectedRoles.value.join(",")
        : undefined,
      status: selectedStatus.value || undefined,
    },
  });
};
</script>

<template>
  <DataTable
    :exportFunction="usersStore.exportUsersToCSV"
    :exportPending="usersStore.actionPending"
    :columns="columns"
    :data="usersData"
    :loading="loadingState"
    :error="errorState"
    filter-placeholder="Searching by name, email"
    :total-records="usersTotalRecords"
    filter
  >
    <template #filter>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="ghost">
            <Filter />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
            <DialogDescription>
              Adjust filters and click save.
            </DialogDescription>
          </DialogHeader>

          <!-- Role Filter (Multiple Selection) -->
          <Select v-model="tempRoles" multiple>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="role in ['admin', 'manager', 'viewer']"
                :key="role"
                :value="role"
              >
                {{ role }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Status Filter (Single Selection) -->
          <Select v-model="tempStatus">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter>
            <DialogClose as-child>
              <Button @click="applyFilters">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </template>
  </DataTable>
</template>
