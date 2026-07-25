import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { mockAppointments } from '../data/mockData';

export default function SchedulingLive() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showForm, setShowForm] = useState(false);
  const [newAppt, setNewAppt] = useState({ patient: '', time: '', doctor: '', department: '' });

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppt.patient && newAppt.time) {
      setAppointments([...appointments, { ...newAppt, id: Date.now().toString(), status: 'Scheduled' }]);
      setNewAppt({ patient: '', time: '', doctor: '', department: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Scheduling & Live Monitoring</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">Live Updates</span>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Book New Appointment</h3>
          <form onSubmit={handleAddAppointment} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Patient Name" 
              required
              className="px-3 py-2 border rounded-md bg-muted focus:ring-2 focus:ring-primary outline-none"
              value={newAppt.patient}
              onChange={e => setNewAppt({...newAppt, patient: e.target.value})}
            />
            <input 
              type="time" 
              required
              className="px-3 py-2 border rounded-md bg-muted focus:ring-2 focus:ring-primary outline-none"
              value={newAppt.time}
              onChange={e => setNewAppt({...newAppt, time: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Doctor (Optional)" 
              className="px-3 py-2 border rounded-md bg-muted focus:ring-2 focus:ring-primary outline-none"
              value={newAppt.doctor}
              onChange={e => setNewAppt({...newAppt, doctor: e.target.value})}
            />
            <button type="submit" className="bg-primary text-primary-foreground rounded-md font-medium px-4 py-2 hover:bg-primary/90 transition-colors">
              Confirm Booking
            </button>
          </form>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Monitoring Widgets */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Clock className="w-24 h-24" />
            </div>
            <h3 className="font-semibold text-muted-foreground">ER Wait Time</h3>
            <div className="mt-4 flex items-end space-x-2">
              <span className="text-4xl font-bold text-red-500">24</span>
              <span className="text-xl font-medium text-muted-foreground mb-1">mins</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">↑ 5 mins from last hour</p>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Users className="w-24 h-24" />
            </div>
            <h3 className="font-semibold text-muted-foreground">Available Specialists</h3>
            <div className="mt-4 flex items-end space-x-2">
              <span className="text-4xl font-bold text-green-500">12</span>
              <span className="text-xl font-medium text-muted-foreground mb-1">on call</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Across 5 departments</p>
          </div>
        </div>

        {/* Scheduling Calendar */}
        <div className="lg:col-span-2 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-xl font-semibold">July 2026</h3>
            <div className="flex space-x-2">
              <button className="p-2 border rounded-md hover:bg-muted transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button className="px-4 py-2 border rounded-md font-medium text-sm hover:bg-muted transition-colors">Today</button>
              <button className="p-2 border rounded-md hover:bg-muted transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden border">
              {days.map(day => (
                <div key={day} className="bg-muted py-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              {dates.map((date, idx) => {
                const hasAppointments = date === 25;
                return (
                  <div key={date} className={`bg-card min-h-[100px] p-2 hover:bg-muted/50 transition-colors ${idx === 0 ? 'col-start-4' : ''}`}>
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm ${date === 25 ? 'bg-primary text-primary-foreground font-bold shadow-sm' : 'text-foreground'}`}>
                      {date}
                    </span>
                    {hasAppointments && (
                      <div className="mt-2 space-y-1">
                        {appointments.slice(0, 3).map((apt, i) => (
                          <div key={i} className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground font-medium truncate shadow-sm">
                            {apt.time} - {apt.patient}
                          </div>
                        ))}
                        {appointments.length > 3 && (
                          <div className="text-xs text-muted-foreground font-medium pl-1">
                            +{appointments.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
