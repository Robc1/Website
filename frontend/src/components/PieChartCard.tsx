import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  [key: string]: string | number;
}

interface PieChartCardProps {
  title: string;
  data: ChartDataItem[];
  dataKey: string;
  nameKey: string;
  colors: string[];
}

export default function PieChartCard({ title, data, dataKey, nameKey, colors }: PieChartCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={40}
            paddingAngle={2}
            label={false}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth={2}
              />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}