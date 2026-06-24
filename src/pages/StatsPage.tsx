import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

interface Stats {
  totalHabits: number;
  totalCheckIns: number;
  bestStreak: number;
  completedToday: number;
}

export default function StatsPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/habits/stats');
        setStats(res.data);
      } catch {
        console.error('Error fetching stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Habits', value: stats?.totalHabits, icon: '📋' },
    { label: 'Total Check-ins', value: stats?.totalCheckIns, icon: '✅' },
    { label: 'Best Streak', value: stats?.bestStreak, icon: '🔥' },
    { label: 'Completed Today', value: stats?.completedToday, icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Statistics</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl transition"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center mt-20">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {cards.map(card => (
              <div key={card.label} className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-2">
                <span className="text-3xl">{card.icon}</span>
                <span className="text-white font-bold text-3xl">{card.value ?? 0}</span>
                <span className="text-gray-400 text-sm">{card.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}