import { useState } from 'react'
import type { Habit } from '../types'

interface Props {
    habit: Habit;
    onEdit: (id: number, name: string, description: string, color: string, weeklyGoal: number) => void;
    onClose: () => void;
}

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

export default function EditHabitModal({ habit, onEdit, onClose}: Props) {
    const [name, setName] = useState(habit.name);
    const [description, setDescription] = useState(habit.description ?? '');
    const [color, setColor] = useState(habit.color);
    const [weeklyGoal, setWeeklyGoal] = useState(habit.weeklyGoal);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onEdit(habit.id, name, description, color, weeklyGoal);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-4">Edit Habit</h2>

                <div className="space-y-4">
                <div>
                    <label className="text-gray-300 text-sm mb-1 block">Name *</label>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-gray-300 text-sm mb-1 block">Description (optional)</label>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-gray-300 text-sm mb-1 block">Weekly goal: {weeklyGoal} days</label>
                    <input
                        type="range"
                        min="1"
                        max="7"
                        value={weeklyGoal}
                        onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-gray-300 text-sm mb-1 block">Color</label>
                    <div className="flex gap-2">
                    {COLORS.map(c => (
                        <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full transition ${color === c ? 'ring-2 ring-white scale-110' : ''}`}
                        style={{ backgroundColor: c }}
                        />
                    ))}
                    </div>
                </div>
                </div>

                <div className="flex gap-3 mt-6">
                <button
                    onClick={onClose}
                    className="flex-1 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                >
                    Save
                </button>
                </div>
            </div>
        </div>
    );
}