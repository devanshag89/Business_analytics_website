import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import GenerateAnalysis from './GenerateAnalysis';
import ViewReports from './ViewReports';
import ViewTransactions from './ViewTransactions';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('generate');

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <Navbar />
      
      <main className="ml-64 mt-10 pt-20 p-6 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {activeComponent === 'generate' && <GenerateAnalysis />}
          {activeComponent === 'reports' && <ViewReports />}
          {activeComponent === 'transactions' && <ViewTransactions/>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;