import { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign} from 'lucide-react';


const GenerateAnalysis = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-teal-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Generate Analysis Report</h2>
        <p className="text-teal-50">Create comprehensive business insights with AI-powered analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 border-l-4 border-teal-500">
          <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Sales Analytics</h3>
          <p className="text-gray-600 text-sm">Analyze sales performance and trends</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 border-l-4 border-slate-500">
          <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-slate-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Customer Insights</h3>
          <p className="text-gray-600 text-sm">Understand customer behavior patterns</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 border-l-4 border-gray-500">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Revenue Analysis</h3>
          <p className="text-gray-600 text-sm">Track revenue streams and profitability</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Configure Your Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200">
              <option>Comprehensive Analysis</option>
              <option>Quick Summary</option>
              <option>Detailed Report</option>
              <option>Executive Summary</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-teal-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating Analysis...</span>
            </>
          ) : (
            <>
              <BarChart3 className="w-5 h-5" />
              <span>Generate Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GenerateAnalysis