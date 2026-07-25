import { Users, Activity, Clock, Bed } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMetrics, mockAppointments, mockInsightsData } from '../data/mockData';

export default function Dashboard() {
  const cards = [
    { title: 'Total Patients', value: mockMetrics.totalPatients.toLocaleString(), icon: Users, color: 'text-blue-500' },
    { title: 'Active Staff', value: mockMetrics.activeStaff, icon: Activity, color: 'text-green-500' },
    { title: 'Avg. Wait Time', value: mockMetrics.avgWaitTime, icon: Clock, color: 'text-yellow-500' },
    { title: 'Bed Occupancy', value: `${mockMetrics.bedOccupancy}%`, icon: Bed, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <div key={idx} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <h3 className="mt-2 text-3xl font-bold">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-full bg-muted ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm md:col-span-4 lg:col-span-5 p-6">
          <div className="flex flex-col space-y-1.5 mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Patient Influx Trends</h3>
            <p className="text-sm text-muted-foreground">Admissions over the last 7 days</p>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockInsightsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOutpatient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInpatient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="outpatient" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOutpatient)" />
                <Area type="monotone" dataKey="inpatient" stroke="#10b981" fillOpacity={1} fill="url(#colorInpatient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm md:col-span-3 lg:col-span-2 p-6">
          <div className="flex flex-col space-y-1.5 mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Today's Appointments</h3>
            <p className="text-sm text-muted-foreground">You have {mockAppointments.length} scheduled</p>
          </div>
          <div className="space-y-4 mt-4">
            {mockAppointments.slice(0, 4).map((apt) => (
              <div key={apt.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                  {apt.patient.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{apt.patient}</p>
                  <p className="text-xs text-muted-foreground">{apt.department} • {apt.doctor}</p>
                </div>
                <div className="text-sm font-medium">{apt.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
