import { Filter, Download, MoreHorizontal, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockPatientsList } from '../data/mockData';

export default function Reports() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filterCondition, setFilterCondition] = useState('');

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  const filteredPatients = mockPatientsList.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = filterCondition ? patient.condition === filterCondition : true;
    return matchesSearch && matchesCondition;
  });

  const conditions = Array.from(new Set(mockPatientsList.map(p => p.condition)));

  const handleExportCSV = () => {
    if (filteredPatients.length === 0) return;

    const headers = ['Patient ID', 'Name', 'Age', 'Gender', 'Condition', 'Last Visit'];
    const csvRows = [headers.join(',')];

    for (const patient of filteredPatients) {
      const row = [
        patient.id,
        `"${patient.name}"`,
        patient.age,
        patient.gender,
        `"${patient.condition}"`,
        new Date(patient.lastVisit).toLocaleDateString()
      ];
      csvRows.push(row.join(','));
    }

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "patient_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customizable Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Filter, sort, and export comprehensive patient data.</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button 
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm w-full sm:w-auto justify-center"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input 
            type="text" 
            placeholder="Search by ID or Name..." 
            className="pl-9 pr-3 py-2 w-full border rounded-md bg-card focus:ring-2 focus:ring-primary outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
          <select 
            className="pl-9 pr-3 py-2 w-full border rounded-md bg-card focus:ring-2 focus:ring-primary outline-none appearance-none"
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
          >
            <option value="">All Conditions</option>
            {conditions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-b">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Patient ID</th>
                <th scope="col" className="px-6 py-4 font-semibold">Name</th>
                <th scope="col" className="px-6 py-4 font-semibold">Age/Gender</th>
                <th scope="col" className="px-6 py-4 font-semibold">Condition</th>
                <th scope="col" className="px-6 py-4 font-semibold">Last Visit</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y border-t-0">
              {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{patient.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{patient.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{patient.age} • {patient.gender}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{new Date(patient.lastVisit).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No patients found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <div>Showing {filteredPatients.length} entries</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border rounded bg-primary text-primary-foreground font-medium">1</button>
            <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
