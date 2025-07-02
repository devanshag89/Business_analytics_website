import { User, Activity } from 'lucide-react';
import { useAuth } from '../contexts/authContext';

const Navbar = () => {

  const {user} = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b border-slate-200 fixed top-0 left-0 right-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-700">
              DataVision
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-700 font-medium">{user.firstName} {user.lastName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar