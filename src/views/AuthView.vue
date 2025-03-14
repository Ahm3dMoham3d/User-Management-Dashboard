<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="flex flex-col gap-4">
    <h4 class="text-2xl tracking-tight text-primary">
      Log in to
      <span class="text-foreground">Manage Your Workspace</span>
    </h4>
    <div>
      <Label for="email">Email</Label>
      <Input id="email" />
    </div>
    <div>
      <Label for="password">Password</Label>
      <Input id="password" />
    </div>

    <Button>Login</Button>
  </div>
</template>
