import type { User } from "@/entities/user";

export const users: User[] = [
  {
    id: 1,
    name: "Alice",
    username: "Alice",
    email: "alice@example.com",
    phone: "1234567890",
    photo: "https://randomuser.me/api/portraits/w=100/h=100",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  }
];

export const userRepository = {
  async findAllAsync(): Promise<User[]> {
    return users;
  },

  async findByIdAsync(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  },

  async updateAsync(id: number, data: User): Promise<User | null> {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = { ...users[userIndex], ...data };
    return users[userIndex];
  }
};