import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { mockForecastData } from '../data/mockData';

export default function PredictiveAnalytics() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Predictive Analytics</h1>
        <p className="text-muted-foreground">AI-driven forecasts for hospital resources and patient influx.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expected Influx (Next 30 Days)</p>
              <h3 className="text-2xl font-bold mt-1">+12.5%</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 bg-gradient-to-br from-purple-500/10 to-transparent">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resource Utilization Forecast</p>
              <h3 className="text-2xl font-bold mt-1">89%</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Predicted Shortages</p>
              <h3 className="text-xl font-bold mt-1 text-amber-600 dark:text-amber-500">ICU Beds (High Risk)</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">Patient Volume Forecast</h3>
            <p className="text-sm text-muted-foreground mt-2">Historical data combined with AI projections for the upcoming months.</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-primary mr-2"></span>Actual</span>
            <span className="flex items-center ml-4"><span className="w-3 h-3 rounded-full border-2 border-primary border-dashed mr-2"></span>Forecast</span>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockForecastData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="var(--primary)" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="Actual Patients" 
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="var(--primary)" 
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ r: 4, strokeWidth: 2 }}
                name="Forecasted Patients" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
