export const mockMetrics = {
  totalPatients: 12450,
  activeStaff: 342,
  avgWaitTime: "18m",
  bedOccupancy: 84, // percentage
};

export const mockAppointments = [
  { id: "A1", time: "09:00 AM", patient: "Sarah Jenkins", doctor: "Dr. Smith", department: "Cardiology", status: "Completed" },
  { id: "A2", time: "10:30 AM", patient: "Michael Chen", doctor: "Dr. Adams", department: "Neurology", status: "In Progress" },
  { id: "A3", time: "11:15 AM", patient: "Emily Davis", doctor: "Dr. Lee", department: "Pediatrics", status: "Waiting" },
  { id: "A4", time: "01:00 PM", patient: "Robert Wilson", doctor: "Dr. Smith", department: "Cardiology", status: "Scheduled" },
  { id: "A5", time: "02:45 PM", patient: "Jessica Taylor", doctor: "Dr. Patel", department: "Oncology", status: "Scheduled" },
];

export const mockInsightsData = [
  { name: 'Mon', outpatient: 400, inpatient: 240, emergency: 120 },
  { name: 'Tue', outpatient: 300, inpatient: 139, emergency: 80 },
  { name: 'Wed', outpatient: 200, inpatient: 980, emergency: 210 },
  { name: 'Thu', outpatient: 278, inpatient: 390, emergency: 150 },
  { name: 'Fri', outpatient: 189, inpatient: 480, emergency: 90 },
  { name: 'Sat', outpatient: 239, inpatient: 380, emergency: 240 },
  { name: 'Sun', outpatient: 349, inpatient: 430, emergency: 190 },
];

export const mockPatientHistory = [
  { id: "H1", date: "2026-05-12", title: "Initial Consultation", description: "Patient reported mild chest pain.", type: "visit" },
  { id: "H2", date: "2026-05-15", title: "ECG Test", description: "Normal sinus rhythm, no acute changes.", type: "lab" },
  { id: "H3", date: "2026-06-02", title: "Follow-up Visit", description: "Prescribed beta-blockers, symptoms improved.", type: "visit" },
  { id: "H4", date: "2026-07-20", title: "Routine Blood Work", description: "Cholesterol slightly elevated.", type: "lab" },
];

export const mockForecastData = [
  { month: 'Jan', actual: 1200, forecast: 1250 },
  { month: 'Feb', actual: 1100, forecast: 1150 },
  { month: 'Mar', actual: 1400, forecast: 1350 },
  { month: 'Apr', actual: 1300, forecast: 1380 },
  { month: 'May', actual: 1500, forecast: 1450 },
  { month: 'Jun', actual: null, forecast: 1550 },
  { month: 'Jul', actual: null, forecast: 1600 },
];

export const mockPatientsList = [
  { id: "P001", name: "Sarah Jenkins", age: 45, gender: "Female", condition: "Hypertension", lastVisit: "2026-07-20" },
  { id: "P002", name: "Michael Chen", age: 32, gender: "Male", condition: "Migraine", lastVisit: "2026-07-22" },
  { id: "P003", name: "Emily Davis", age: 9, gender: "Female", condition: "Asthma", lastVisit: "2026-07-15" },
  { id: "P004", name: "Robert Wilson", age: 58, gender: "Male", condition: "Type 2 Diabetes", lastVisit: "2026-07-01" },
  { id: "P005", name: "Jessica Taylor", age: 29, gender: "Female", condition: "Pregnancy", lastVisit: "2026-07-24" },
  { id: "P006", name: "David Miller", age: 64, gender: "Male", condition: "Arthritis", lastVisit: "2026-06-30" },
  { id: "P007", name: "Amanda White", age: 41, gender: "Female", condition: "Anemia", lastVisit: "2026-07-10" },
];
