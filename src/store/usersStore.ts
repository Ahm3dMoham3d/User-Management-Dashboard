import { defineStore } from "pinia";
import { mockApi } from "@/api/mockApi";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "viewer";
  status: "active" | "inactive";
  dateJoined: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  total: number;
}

interface QueryProps {
  page?: number;
  limit: number;
}

export const useUsersStore = defineStore("users", {
  state: (): UsersState => ({
    users: [],
    total: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async getAllUsers(page = 1, limit = 10, search: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await mockApi.getUsers(page, limit, search);
        this.users = response.data;
        this.total = response.total;
      } catch (e) {
        this.error = e instanceof Error ? e.message : "An error occurred";
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
});
