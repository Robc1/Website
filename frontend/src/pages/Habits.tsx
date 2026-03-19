import { useState, useEffect } from 'react';
import { getHabits } from '../../services/api';

interface Habit {
  id: number;
  name: string;
  duration: string;
  unit: string;
  frequency: number;
  days: string;
  color: string;
  completion?: number;
  monthProgress?: number;
  yearProgress?: number;
}

interface HabitWithDefaults extends Habit {
  bgColor: string;
  borderColor?: string;
  repeat: string;
  reminder: string;
}

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-500' },
  red: { text: 'text-red-500', bg: 'bg-red-100', border: 'border-red-500' },
  green: { text: 'text-green-500', bg: 'bg-green-100', border: 'border-green-500' },
  yellow: { text: 'text-yellow-500', bg: 'bg-yellow-100', border: 'border-yellow-500' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-100', border: 'border-purple-500' },
};

const getColorClasses = (color: string) => {
  return colorMap[color] || colorMap.blue;
};

export default function Habits() {
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);
  const [habits, setHabits] = useState<HabitWithDefaults[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        const data = await getHabits();
        
        // Transform API data to include display properties
        const transformedHabits = data.map((habit: Habit) => {
          const colors = getColorClasses(habit.color);
          return {
            ...habit,
            color: colors.text,
            bgColor: colors.bg,
            borderColor: colors.border,
            repeat: `${habit.frequency}x per week`,
            reminder: '07:00',
            completion: habit.completion || 0,
            monthProgress: habit.monthProgress || 0,
            yearProgress: habit.yearProgress || 0,
          };
        });
        
        setHabits(transformedHabits);
        if (transformedHabits.length > 0) {
          setSelectedHabitId(transformedHabits[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load habits');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const selectedHabit = habits.find(h => h.id === selectedHabitId) || habits[0];
  const borderColorClass = selectedHabit?.color.replace('text-', 'border-') || 'border-blue-500';

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(new Date());
  const firstDay = getFirstDayOfMonth(new Date());
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, () => null);

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
          Habits
        </h1>
        <p className="text-gray-600 text-lg">
          Track and manage your daily habits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Habits List */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
            {isLoading ? (
              <p className="text-gray-600 text-center py-4">Loading habits...</p>
            ) : error ? (
              <p className="text-red-600 text-center py-4">{error}</p>
            ) : habits.length === 0 ? (
              <p className="text-gray-600 text-center py-4">No habits yet. Create one to get started!</p>
            ) : (
              <div className="space-y-3">
                {habits.map((habit) => (
                  <button
                    key={habit.id}
                    onClick={() => setSelectedHabitId(habit.id)}
                    className={`w-full p-4 rounded-xl transition-all duration-300 text-left ${
                      selectedHabitId === habit.id
                        ? `${habit.bgColor} border-2 ${habit.color} shadow-lg`
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-4 h-4 rounded-full ${habit.bgColor}`}></div>
                      <p className="font-medium text-sm text-gray-800">{habit.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${habit.color} bg-current`}
                          style={{ width: `${habit.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{habit.completion}%</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        {selectedHabit ? (
        <div className="lg:col-span-2 space-y-6">
          {/* Habit Header */}
          <div className={`bg-gradient-to-r ${selectedHabit.bgColor} border-l-4 ${borderColorClass} bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedHabit.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">REPEAT</p>
                <p className="text-lg font-semibold text-gray-800">{selectedHabit.repeat}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">REMIND ME</p>
                <p className="text-lg font-semibold text-gray-800">{selectedHabit.reminder}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
            <div className="text-center mb-6">
              <p className="text-6xl font-bold text-gray-800">{selectedHabit.monthProgress}%</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Month</p>
                <p className="text-lg font-semibold text-gray-800">+{Math.floor(selectedHabit.monthProgress / 10)}0%</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Year</p>
                <p className="text-lg font-semibold text-gray-800">+{Math.floor(selectedHabit.yearProgress / 10)}0%</p>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">HISTORY</h3>
            <p className="text-sm font-medium text-gray-600 mb-4">January 2026</p>

            {/* Calendar Grid */}
            <div>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {days.map((day) => {
                  const isCompleted = Math.random() > 0.3;
                  const dayBorderColor = selectedHabit.color.replace('text-', 'border-');
                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${
                        isCompleted
                          ? `${selectedHabit.color} bg-current/10 border-2 ${dayBorderColor} hover:shadow-md`
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        ) : null}
      </div>
    </div>
  );
}