<script setup>
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-vue-next";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div
    class="h-screen flex flex-col justify-center items-center text-center px-6"
  >
    <div
      class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full"
    >
      <div class="flex flex-col items-center">
        <AlertCircle class="text-red-500 size-12" />
        <h1 class="text-4xl font-extrabold text-red-600 mt-4">403</h1>
        <p class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-2">
          Unauthorized Access
        </p>
        <p class="text-gray-500 dark:text-gray-400 mt-2">
          You do not have permission to view this page.
        </p>
        <Button @click="goBack" class="mt-6 px-6 py-2 text-lg">
          Go Back
        </Button>
      </div>
    </div>
  </div>
</template>
