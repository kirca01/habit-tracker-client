import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import type { Habit } from '../types';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';

export default function DashboardPage() {
  const { logout } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    try {
      const res = await api.get('/habits');
      setHabits(res.data);
    } catch {
      console.error('Error fetching habits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAdd = async (name: string, description: string, color: string) => {
    try {
      await api.post('/habits', { name, description, color });
      fetchHabits();
    } catch {
      console.error('Error adding habit');
    }
  };

  const handleCheckIn = async (id: number) => {
    try {
      await api.post(`/habits/${id}/checkin`);
      fetchHabits();
    } catch {
      console.error('Error checking in');
    }
  };

  const handleUndoCheckIn = async (id: number) => {
    try {
      await api.delete(`/habits/${id}/checkin`);
      fetchHabits();
    } catch {
      console.error('Error undoing check-in');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/habits/${id}`);
      fetchHabits();
    } catch {
      console.error('Error deleting habit');
    }
  };

  const completedToday = habits.filter(h =>
    h.entries.some(e => e.date === new Date().toISOString().split('T')[0])
  ).length;

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Habits</h1>
            <p className="text-gray-400 text-sm mt-1">
              {completedToday} / {habits.length} completed today
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold transition"
            >
              + Add
            </button>
            <button
              onClick={logout}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>

        {habits.length > 0 && (
          <div className="mb-6">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedToday / habits.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-gray-400 text-center mt-20">Loading...</p>
        ) : habits.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-400 text-lg">No habits yet.</p>
            <p className="text-gray-600 text-sm mt-1">Click "Add" to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onCheckIn={handleCheckIn}
                onUndoCheckIn={handleUndoCheckIn}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AddHabitModal
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}