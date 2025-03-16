import type { User } from "@/store/usersStore";

const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "admin" : i % 3 === 1 ? "manager" : "viewer",
  status: i % 2 === 0 ? "active" : "inactive",
  dateJoined: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

const roles = ["admin", "manager", "viewer"];

const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));

const randomFailure = () => Math.random() < 0.1;

export const mockApi = {
  async getUsers(
    page = 1,
    limit = 10,
    search = "",
    sort = "id",
    roles: string[] = [],
    status: string | null = null
  ) {
    await simulateLatency();
    console.log("Get Users API Called");

    if (randomFailure()) throw new Error("Failed to fetch users");

    // Filter users based on search query
    let filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) // Added email search
    );

    // Apply role filter if roles are selected
    if (roles.length > 0) {
      filteredUsers = filteredUsers.filter((user) => roles.includes(user.role));
    }

    // Apply status filter if selected
    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    // Determine sorting order
    const isDescending = sort.startsWith("-");
    const sortKey = isDescending ? sort.slice(1) : sort;

    // Sort users by the specified column
    filteredUsers.sort((a, b) => {
      if (a[sortKey as keyof typeof a] > b[sortKey as keyof typeof b]) {
        return isDescending ? -1 : 1;
      } else if (a[sortKey as keyof typeof a] < b[sortKey as keyof typeof b]) {
        return isDescending ? 1 : -1;
      }
      return 0;
    });

    // Calculate the starting index based on the page number and limit
    const start = Number((page - 1) * limit);
    const end = Number(start + Number(limit));

    return {
      data: filteredUsers.slice(start, end),
      total: filteredUsers.length,
    };
  },

  async getUser(id: number) {
    await simulateLatency();
    if (randomFailure()) throw new Error("Failed to fetch user");

    return users.find((user) => user.id === id) || null;
  },

  async updateUser(id: number, data: Partial<(typeof users)[0]>) {
    await simulateLatency();
    if (randomFailure()) throw new Error("Failed to update user");

    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("User not found");

    users[index] = { ...users[index], ...data };
    return users[index];
  },

  async createUser(data: Omit<(typeof users)[0], "id">) {
    await simulateLatency();
    if (randomFailure()) throw new Error("Failed to create user");

    const newUser = { id: users.length + 1, ...data };
    users.push(newUser);
    return newUser;
  },

  async deleteUser(id: number) {
    await simulateLatency();
    if (randomFailure()) throw new Error("Failed to delete user");

    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("User not found");

    users.splice(index, 1);
    return { success: true };
  },

  async getRoles() {
    await simulateLatency();
    if (randomFailure()) throw new Error("Failed to fetch roles");
    return roles;
  },
};
