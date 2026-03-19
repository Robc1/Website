import LineChartCard from '../components/LineChartCard';
import BarChartCard from '../components/BarChartCard';
import PieChartCard from '../components/PieChartCard';
import { monthlyRevenueData, userGrowthData, categoryDistribution, dailyActivity } from '../data/mockData';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Target } from 'lucide-react';
import Calendar from '../components/Calendar';
import { Table } from '../components/Table';

interface TableData {
  id: number;
  name: string;
  category: string;
  status: string;
  date: string;
}

export default function Dashboard() {
  const tableData: TableData[] = [
    { id: 1, name: 'Product A', category: 'Electronics', status: 'Active', date: '2026-02-01' },
    { id: 2, name: 'Product B', category: 'Home & Garden', status: 'Active', date: '2026-02-05' },
    { id: 3, name: 'Product C', category: 'Books', status: 'Inactive', date: '2026-01-15' },
    { id: 4, name: 'Product D', category: 'Clothing', status: 'Active', date: '2026-02-10' },
  ];

  const tableColumns = [
    { header: 'ID', accessor: 'id' as const },
    { header: 'Name', accessor: 'name' as const },
    { header: 'Category', accessor: 'category' as const },
    { header: 'Status', accessor: 'status' as const },
    { header: 'Date', accessor: 'date' as const },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '€300',
      change: '+12%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Tasks Completed',
      value: '45',
      change: '+2%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Habits Completed',
      value: '75%',
      change: '-3%',
      changeType: 'negative',
      icon: Target,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Avg. Order Value',
      value: '$142',
      change: '+8%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Overview of your key metrics and performance indicators
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? '↑' : '↓'} {stat.change} from last week
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartCard
          title="Monthly Income vs Expenses"
          data={monthlyRevenueData}
          dataKeys={[
            { key: 'revenue', color: '#10b981', name: 'Income' },
            { key: 'expenses', color: '#ef4444', name: 'Expenses' }
          ]}
          xAxisKey="month"
        />
        
        <LineChartCard
          title="User Growth"
          data={userGrowthData}
          dataKeys={[
            { key: 'users', color: '#8b5cf6', name: 'Total Users' }
          ]}
          xAxisKey="month"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartCard
          title="Daily Active Users"
          data={dailyActivity}
          dataKeys={[
            { key: 'active', color: '#06b6d4', name: 'Active Users' }
          ]}
          xAxisKey="day"
        />
        
        <PieChartCard
          title="Distribution by Category"
          data={categoryDistribution}
          dataKey="value"
          nameKey="name"
          colors={['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']}
        />
      </div>

      {/* Products Table */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Products
        </h2>
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
          <Table columns={tableColumns} data={tableData} />
        </div>
      </div>

      {/* Habit Calendar */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Habit Calendar
        </h2>
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
          <Calendar />
        </div>
      </div>
    </div>
  );
}