<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { debounce } from "lodash";
import type { AcceptableValue } from "reka-ui";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRecords: number;
  loading?: boolean;
  error?: string | null;
  filterKey?: string | null;
  filterPlaceholder?: string | null;
  retryFunction?: () => void; // ✅ Add retry function prop
}>();

const refreshPage = () => {
  window.location.reload(); // Reloads the current page
};

const route = useRoute();
const router = useRouter();

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
});

const limitOptions = [10, 20, 30];

const limitRef = ref(Number(route.query.limit) || 10);
const pageRef = ref(Number(route.query.page) || 1);
const searchRef = ref((route.query.search as string) || "");

const searchModel = computed({
  get: () => searchRef.value,
  set: (val) => {
    searchRef.value = val;
    handleSearchUpdate(val);
  },
});

const handleLimitUpdate = (newVal: AcceptableValue) => {
  const limit = Number(newVal) || 10;
  router.push({
    query: {
      ...router.currentRoute.value.query,
      limit,
      page: 1,
    },
  });
  pageRef.value = 1;
};

const handlePageUpdate = (newVal: number) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      page: newVal,
    },
  });
};
const handleSearchUpdate = debounce((val: string) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      search: val,
      page: 1,
    },
  });
  pageRef.value = 1;
}, 500) as (payload: string | number) => void;
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        :placeholder="filterPlaceholder"
        v-model="searchModel"
        @update:model-value="handleSearchUpdate"
      />
    </div>

    <div class="border rounded-md p-4">
      <Table>
        <!-- ✅ Table Header is always rendered -->
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <!-- Show loading state -->
          <template v-if="loading">
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                🔄 Loading data...
              </TableCell>
            </TableRow>
          </template>

          <!-- Show error state -->
          <template v-else-if="error">
            <TableRow>
              <TableCell
                :colspan="columns.length"
                class="h-24 text-center text-red-500"
              >
                <div class="flex justify-center items-center flex-col gap-2">
                  ❌ {{ error }}

                  <Button
                    class="max-w-lg"
                    variant="outline"
                    @click="refreshPage()"
                  >
                    🔄 Try Again
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </template>

          <!-- Show data -->
          <template v-else-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <!-- Show empty state -->
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>

      <div
        class="flex items-center flex-wrap gap-2 mt-4 w-full justify-between"
      >
        <div>
          <Pagination
            v-model:page="pageRef"
            @update:page="handlePageUpdate"
            v-slot="{ page }"
            :items-per-page="limitRef"
            :total="totalRecords"
            show-edges
            :default-page="1"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />

              <template v-for="(item, index) in items">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  as-child
                >
                  <Button
                    :variant="item.value === page ? 'default' : 'outline'"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
              </template>

              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>

        <div class="flex items-center gap-2">
          <div class="text-sm">
            Viewing {{ (pageRef - 1) * limitRef + 1 }} -
            {{ Math.min(pageRef * limitRef, totalRecords) }} of
            {{ totalRecords }} results
          </div>
          <Select v-model="limitRef" @update:model-value="handleLimitUpdate">
            <SelectTrigger class="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="limit in limitOptions"
                :key="limit"
                :value="limit"
              >
                {{ limit }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>
