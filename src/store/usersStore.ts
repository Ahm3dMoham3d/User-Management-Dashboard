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
  user: User | null;
  loading: boolean;
  actionPending: boolean;
  error: string | null;
  total: number;
}

export const useUsersStore = defineStore("users", {
  state: (): UsersState => ({
    users: [],
    user: null,
    total: 0,
    loading: false,
    actionPending: false,
    error: null,
  }),

  getters: {
    totalUsers: (state) => state.users.length,
    activeUsersCount: (state) =>
      state.users.filter((user) => user.status === "active").length,
    inactiveUsersCount: (state) =>
      state.users.filter((user) => user.status === "inactive").length,
    roleCounts: (state) => {
      return {
        admin: state.users.filter((user) => user.role === "admin").length,
        manager: state.users.filter((user) => user.role === "manager").length,
        viewer: state.users.filter((user) => user.role === "viewer").length,
      };
    },
    usersJoinedByTime: (state) => {
      const now = new Date();
      return {
        lastWeek: state.users.filter(
          (user) =>
            new Date(user.dateJoined) > new Date(now.setDate(now.getDate() - 7))
        ).length,
        lastMonth: state.users.filter(
          (user) =>
            new Date(user.dateJoined) >
            new Date(now.setMonth(now.getMonth() - 1))
        ).length,
        older: state.users.filter(
          (user) =>
            new Date(user.dateJoined) <=
            new Date(now.setMonth(now.getMonth() - 1))
        ).length,
      };
    },
  },

  actions: {
    async getAllUsers(page = 1, limit = 10, search?: string, sort?: string) {
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

    async getUserById(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await mockApi.getUser(Number(id));
        this.user = response;
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
          title: "User Deleted Successfully",
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

    async editUser(index: number, userObj: User) {
      this.actionPending = true;
      try {
        await mockApi.updateUser(index, userObj);
        toast({
          title: "User Edited Successfully",
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

    exportUsersToCSV() {
      if (!this.users.length) {
        toast({
          title: "No users to export",
          variant: "destructive",
        });
        return;
      }
      this.actionPending = true;

      const headers = ["ID", "Name", "Email", "Role", "Status", "Date Joined"];
      const rows = this.users.map((user) => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.dateJoined,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers, ...rows].map((e) => e.join(",")).join("\n");

      // Create a downloadable link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "CSV Exported Successfully",
        variant: "success",
      });

      this.actionPending = false;
    },
  },
});
