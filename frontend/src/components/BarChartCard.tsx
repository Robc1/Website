import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  [key: string]: string | number;
}

interface BarChartCardProps {
  title: string;
  data: ChartDataItem[];
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
}

export default function BarChartCard({ title, data, dataKeys, xAxisKey }: BarChartCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full mr-3"></div>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{ color: '#334155', fontWeight: '600' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          {dataKeys.map((item) => (
            <Bar
              key={item.key}
              dataKey={item.key}
              fill={item.color}
              name={item.name}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}