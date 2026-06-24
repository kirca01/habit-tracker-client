export type HabitEntry = {
  id: number;
  date: string;
  completedAt: string;
  habitId: number;
};

export type Habit = {
  id: number;
  name: string;
  description?: string;
  color: string;
  weeklyGoal: number;
  createdAt: string;
  isArchived: boolean;
  userId: number;
  entries: HabitEntry[];
};

export type User = {
  id: number;
  email: string;
  username: string;
};

export const _types = true;