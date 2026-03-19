const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Habit {
  id: number;
  name: string;
  duration: string;
  unit: string;
  frequency: number;
  days: string;
  color: string;
  completion: number;
  monthProgress: number;
  yearProgress: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitInput {
  name: string;
  duration: string;
  unit: string;
  frequency: number;
  days: string;
  color: string;
}

// Habits
export async function getHabits(): Promise<Habit[]> {
  const res = await fetch(`${API_URL}/habits`);
  if (!res.ok) throw new Error('Failed to fetch habits');
  return res.json();
}

export async function getHabit(id: number): Promise<Habit> {
  const res = await fetch(`${API_URL}/habits/${id}`);
  if (!res.ok) throw new Error('Failed to fetch habit');
  return res.json();
}

export async function createHabit(data: CreateHabitInput): Promise<Habit> {
  const res = await fetch(`${API_URL}/habits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create habit');
  return res.json();
}

export async function updateHabit(id: number, data: Partial<CreateHabitInput>): Promise<Habit> {
  const res = await fetch(`${API_URL}/habits/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update habit');
  return res.json();
}

export async function deleteHabit(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/habits/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete habit');
}
