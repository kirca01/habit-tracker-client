import { useState } from 'react';
import type { Habit } from '../types';
import HabitHeatmap from './HabitHeatmap';
import EditHabitModal from './EditHabitModal';

interface Props {
  habit: Habit;
  onCheckIn: (id: number) => void;
  onUndoCheckIn: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, description: string, color: string, weeklyGoal: number) => void;
}

export default function HabitCard({ habit, onCheckIn, onUndoCheckIn, onDelete, onEdit }: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.entries.some(e => e.date === today);

  const getStreak = () => {
    let streak = 0;
    const date = new Date();
    while (true) {
      const dateStr = date.toISOString().split('T')[0];
      if (habit.entries.some(e => e.date === dateStr)) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getWeeklyProgress = () => {
    const now = new Date();
    const dayOfWeek = (now.getDay() + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - dayOfWeek);

    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      if (habit.entries.some(e => e.date === dateStr)) count++;
    }
    return count;
  };

  const weeklyDone = getWeeklyProgress();

  const streak = getStreak();

  return (
    <>
      <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: habit.color }} />
            <h3 className="text-white font-semibold text-lg">{habit.name}</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEdit(true)}
              className="text-gray-600 hover:text-indigo-400 transition text-sm"
            >
              ✎
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              className="text-gray-600 hover:text-red-400 transition text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {habit.description && (
          <p className="text-gray-400 text-sm">{habit.description}</p>
        )}

        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="text-white font-bold text-xl">{streak}</span>
          <span className="text-gray-400 text-sm">day streak</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">This week:</span>
          <span className="text-white font-semibold text-sm">{weeklyDone} / {habit.weeklyGoal}</span>
          {weeklyDone >= habit.weeklyGoal && <span className="text-sm">✅</span>}
        </div>

        <HabitHeatmap entries={habit.entries} />

        <button
          onClick={() => isCompletedToday ? onUndoCheckIn(habit.id) : onCheckIn(habit.id)}
          className={`w-full py-2 rounded-xl font-semibold transition ${
            isCompletedToday
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white'
          }`}
        >
          {isCompletedToday ? '✓ Done today' : 'Mark as done'}
        </button>
      </div>

      {showEdit && (
        <EditHabitModal
          habit={habit}
          onEdit={onEdit}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}