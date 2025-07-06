import { useState } from 'react';
import { TrendingUp, Users, DollarSign, Upload } from 'lucide-react';
import FileUpload from '../support/FileUpload';
import InsightsDisplay from '../support/InsigtsDisplay';
import PaymentButton from '../support/PaymentButton';

const GenerateAnalysis = () => {
  const [filename, setFilename] = useState(null);
  const [insights, setInsights] = useState(null);
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
        <div className="flex border-b border-gray-200 mb-6">
          <div className="pb-2 px-4 font-medium text-teal-500 border-b-2 border-teal-500">
            <div className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Data</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your report"
              className="w-full p-3 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200"
            />
          </div>

          <FileUpload setFilename={setFilename} title={title}/>

          {filename && title && (
            <PaymentButton 
              filename={filename} 
              setInsights={setInsights}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
              title={title}
            />
          )}

          {insights && <InsightsDisplay insights={insights} />}
        </div>
      </div>
    </div>
  );
};

export default GenerateAnalysis;
