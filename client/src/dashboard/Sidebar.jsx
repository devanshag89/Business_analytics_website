import { BarChart3, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/authContext';

const Sidebar = ({ activeComponent, setActiveComponent }) => {

  const {logout} = useAuth();

  const menuItems = [
    {
      id: 'generate',
      icon: BarChart3,
      label: 'Generate Analysis Report',
      description: 'Create new insights'
    },
    {
      id: 'reports',
      icon: FileText,
      label: 'View All Reports',
      description: 'Browse past reports'
    }
  ];

  return (
    <div className="w-64 mt-4 bg-gradient-to-b from-slate-800 to-slate-700 text-white h-screen fixed left-0 top-16 shadow-2xl z-10">
      <div className="pt-8"></div>
      
      <nav className="px-4 mt-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveComponent(item.id)}
              className={`w-full flex items-center space-x-4 p-4 rounded-xl mb-3 transition-all duration-300 hover:transform hover:scale-105 group ${
                activeComponent === item.id
                  ? 'bg-teal-600 shadow-lg shadow-teal-500/25'
                  : 'hover:bg-slate-600/70'
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors duration-300 ${
                activeComponent === item.id ? 'bg-teal-500' : 'bg-slate-600 group-hover:bg-teal-700'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className="text-slate-300 text-xs">{item.description}</div>
              </div>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4 mb-20">
        <button onClick={logout} className="w-full flex items-center space-x-3 p-4 text-red-300 hover:text-red-200 hover:bg-red-800/30 rounded-xl transition-all duration-300 group">
          <div className="p-2 rounded-lg bg-red-900/30 group-hover:bg-red-500/50 transition-colors duration-300">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar