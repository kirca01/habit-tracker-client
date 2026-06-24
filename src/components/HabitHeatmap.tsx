import type { HabitEntry } from "../types";

interface Props {
    entries: HabitEntry[];
}

export default function HabitHeatmap({ entries }: Props) {
    const weeks = 26;
    const today = new Date();

    const getDays = () => {
        const days = [];
        for (let i = weeks * 7 - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    };

    const days = getDays();
    const entryDates = new Set(entries.map(e => e.date));

    const chunks = [];
    for (let i = 0; i < days.length; i += 7) {
        chunks.push(days.slice(i, i + 7));
    }

    return (
    <div className="mt-3">
        <p className="text-gray-500 text-xs mb-2">Posljednjih 6 mjeseci</p>
        <div className="flex gap-1">
            {chunks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                <div
                    key={di}
                    title={day}
                    className={`w-3 h-3 rounded-sm ${
                    entryDates.has(day)
                        ? 'bg-indigo-500'
                        : 'bg-gray-800'
                    }`}
                />
                ))}
            </div>
            ))}
        </div>
        </div>
    );
}