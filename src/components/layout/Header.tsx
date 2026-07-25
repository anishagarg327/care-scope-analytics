import { Bell, Search, User, Moon, Sun, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockPatientsList } from '../../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function Header({ setIsMobileMenuOpen }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear search on navigation
  useEffect(() => {
    setSearchQuery('');
    setShowResults(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Global search logic (Mock)
  const searchResults = mockPatientsList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4); // limit to 4 results

  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Appointment', desc: 'Sarah Jenkins at 10:30 AM', time: '5m ago', unread: true },
    { id: 2, title: 'Lab Results Ready', desc: 'Blood work for Michael Chen', time: '1h ago', unread: true },
    { id: 3, title: 'System Update', desc: 'Scheduled maintenance at midnight', time: '2h ago', unread: false },
  ]);

  const hasUnread = notifications.some(n => n.unread);

  const markAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6 shadow-sm relative z-50">
      <div className="flex flex-1 items-center">
        <button
          onClick={() => setIsMobileMenuOpen?.(true)}
          className="md:hidden mr-3 p-2 -ml-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-foreground bg-muted ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-shadow"
            placeholder="Search patients by name or ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            onFocus={() => setShowResults(searchQuery.length > 0)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                setSearchQuery('');
                setShowResults(false);
                navigate(`/reports?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
          />

          {/* Search Dropdown */}
          {showResults && (
            <div className="absolute mt-1 w-full bg-card rounded-md shadow-lg border overflow-hidden">
              {searchResults.length > 0 ? (
                <ul className="max-h-60 overflow-auto py-1">
                  {searchResults.map((result) => (
                    <li 
                      key={result.id} 
                      className="px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent input from losing focus immediately
                        setSearchQuery('');
                        setShowResults(false);
                        navigate(`/reports?search=${result.id}`);
                      }}
                    >
                      <div className="text-sm font-medium">{result.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {result.id} • {result.condition}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">No patients found.</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="ml-4 flex items-center space-x-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            onBlur={() => setTimeout(() => setShowNotifications(false), 200)}
            className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
            )}
            <Bell className="h-5 w-5" />
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card rounded-md shadow-lg border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-semibold text-sm">Notifications</h3>
                <span 
                  onMouseDown={markAllAsRead} 
                  className="text-xs text-primary cursor-pointer hover:underline"
                >
                  Mark all as read
                </span>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <li key={notif.id} className={`px-4 py-3 border-b last:border-0 hover:bg-muted transition-colors cursor-pointer ${notif.unread ? 'bg-muted/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium text-sm flex items-center">
                        {notif.unread && <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>}
                        {notif.title}
                      </div>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                    <div className="text-xs text-muted-foreground ml-3.5">{notif.desc}</div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 border-t text-center text-xs font-medium text-primary hover:bg-muted cursor-pointer transition-colors">
                View all notifications
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold shadow-inner">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
