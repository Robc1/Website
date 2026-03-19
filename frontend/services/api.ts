const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getSalesData() {
  const res = await fetch(`${API_URL}/metrics/sales`);
  return res.json();
}

export async function getHabits() {
  const res = await fetch(`${API_URL}/habits`);
  if (!res.ok) {
    throw new Error(`Failed to fetch habits: ${res.statusText}`);
  }
  return res.json();
}

export async function createHabit(habitData: {
  name: string;
  duration: string;
  unit: string;
  frequency: string;
  days: string;
  color: string;
}) {
  const res = await fetch(`${API_URL}/habits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...habitData,
      frequency: parseInt(habitData.frequency),
    }),
  });
  if (!res.ok) {
    let errorMessage = `Failed to create habit: ${res.statusText}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If response is not JSON, use status text
    }
    throw new Error(errorMessage);
  }
  return res.json();
}
