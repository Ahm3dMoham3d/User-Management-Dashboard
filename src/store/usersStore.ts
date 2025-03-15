import { defineStore } from "pinia";
import { mockApi } from "@/api/mockApi";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
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
  actionPending: boolean;
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
    actionPending: false,
    error: null,
  }),

  actions: {
    async getAllUsers(page = 1, limit = 10, search: string, sort: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await mockApi.getUsers(page, limit, search, sort);
        this.users = response.data;
        this.total = response.total;
      } catch (e) {
        this.error = e instanceof Error ? e.message : "An error occurred";
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(index: number) {
      this.actionPending = true;

      try {
        await mockApi.deleteUser(index);
        toast({
          title: "User Delete Successfully",
          variant: "success",
        });
      } catch (e) {
        toast({
          title: e instanceof Error ? e.message : "An error occurred",
          variant: "destructive",
        });
        console.error(e);
      } finally {
        this.actionPending = false;
      }
    },
  },
});
