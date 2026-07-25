import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, Activity, Calendar, FileText, Settings, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Patient History', href: '/history', icon: History },
  { name: 'Predictive Charts', href: '/predictive', icon: Activity },
  { name: 'Scheduling', href: '/scheduling', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: FileText },
];

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen?.(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-16 items-center px-6 border-b justify-between">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-primary mr-3" />
            <span className="text-xl font-bold tracking-tight">CareScope</span>
          </div>
          <button 
            className="md:hidden p-2 -mr-2 rounded-md text-muted-foreground hover:bg-muted"
            onClick={() => setIsMobileMenuOpen?.(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen?.(false)}

                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <button 
            onClick={() => setShowSettings(true)}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </button>
        </div>
      </div>

      {/* Settings Modal (Mock) */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-md rounded-xl shadow-lg border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Preferences</h2>
              <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Email Notifications</h4>
                  <p className="text-xs text-muted-foreground">Receive daily summaries.</p>
                </div>
                <div 
                  onClick={() => setEmailNotifs(!emailNotifs)}
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${emailNotifs ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${emailNotifs ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Data Sharing</h4>
                  <p className="text-xs text-muted-foreground">Help improve our AI models.</p>
                </div>
                <div 
                  onClick={() => setDataSharing(!dataSharing)}
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${dataSharing ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${dataSharing ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-muted/30 flex justify-end">
              <button onClick={() => setShowSettings(false)} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
