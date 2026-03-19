import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  [key: string]: string | number;
}

interface LineChartCardProps {
  title: string;
  data: ChartDataItem[];
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
}

export default function LineChartCard({ title, data, dataKeys, xAxisKey }: LineChartCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            <Line
              key={item.key}
              type="monotone"
              dataKey={item.key}
              stroke={item.color}
              strokeWidth={3}
              name={item.name}
              dot={{ fill: item.color, r: 5, strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 7, stroke: item.color, strokeWidth: 2, fill: '#ffffff' }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}