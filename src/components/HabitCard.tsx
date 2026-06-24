import type { Habit } from '../types';

interface Props {
  habit: Habit;
  onCheckIn: (id: number) => void;
  onUndoCheckIn: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function HabitCard({ habit, onCheckIn, onUndoCheckIn, onDelete }: Props) {
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

  const streak = getStreak();

  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: habit.color }} />
          <h3 className="text-white font-semibold text-lg">{habit.name}</h3>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-gray-600 hover:text-red-400 transition text-sm"
        >
          ✕
        </button>
      </div>

      {habit.description && (
        <p className="text-gray-400 text-sm">{habit.description}</p>
      )}

      <div className="flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <span className="text-white font-bold text-xl">{streak}</span>
        <span className="text-gray-400 text-sm">dan streak</span>
      </div>

      <button
        onClick={() => isCompletedToday ? onUndoCheckIn(habit.id) : onCheckIn(habit.id)}
        className={`w-full py-2 rounded-xl font-semibold transition ${
          isCompletedToday
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white'
        }`}
      >
        {isCompletedToday ? '✓ Završeno danas' : 'Označi kao završeno'}
      </button>
    </div>
  );
}