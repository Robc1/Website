import BarChartCard from '../components/BarChartCard';
import LineChartCard from '../components/LineChartCard';
import { monthlyRevenueData, dailyActivity } from '../data/mockData';
import { Eye, MousePointer, Clock, TrendingUp, TrendingDown } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    {
      title: 'Page Views',
      value: '145.2K',
      change: '+18%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Bounce Rate',
      value: '32.8%',
      change: '-5%',
      changeType: 'positive',
      icon: MousePointer,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+12%',
      changeType: 'positive',
      icon: Clock,
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
          Analytics
        </h1>
        <p className="text-gray-600 text-lg">
          Detailed analytics and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  metric.changeType === 'positive'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {metric.changeType === 'positive' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm mt-2 ${
                  metric.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'positive' ? '↑' : '↓'} {metric.change} this week
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <BarChartCard
          title="Revenue & Expenses Breakdown"
          data={monthlyRevenueData}
          dataKeys={[
            { key: 'revenue', color: '#3b82f6', name: 'Revenue' },
            { key: 'expenses', color: '#ef4444', name: 'Expenses' }
          ]}
          xAxisKey="month"
        />

        <LineChartCard
          title="Weekly Activity Trend"
          data={dailyActivity}
          dataKeys={[
            { key: 'active', color: '#10b981', name: 'Active Users' }
          ]}
          xAxisKey="day"
        />
      </div>
    </div>
  );
}