const users = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "admin" : i % 3 === 1 ? "editor" : "viewer",
}));

const roles = [
  { id: 1, name: "admin", permissions: ["read", "write", "delete"] },
  { id: 2, name: "editor", permissions: ["read", "write"] },
  { id: 3, name: "viewer", permissions: ["read"] },
];

const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));

const randomFailure = () => Math.random() < 0.1;

export const mockApi = {
  async getUsers(page = 1, limit = 10, filter = "", sort = "id") {
    await simulateLatency();
    if (randomFailure()) throw new Error("Failed to fetch users");

    let filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredUsers.sort((a, b) =>
      a[sort as keyof typeof a] > b[sort as keyof typeof b] ? 1 : -1
    );

    const start = (page - 1) * limit;
    return {
      data: filteredUsers.slice(start, start + limit),
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
