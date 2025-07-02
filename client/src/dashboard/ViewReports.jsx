import { FileText, ArrowUpRight, Download, Eye } from 'lucide-react';


const ViewReports = () => {
  const reports = [
    {
      id: 1,
      title: "Q4 2024 Sales Analysis",
      date: "Dec 28, 2024",
      type: "Sales Analytics",
      status: "Complete",
      insights: "Revenue increased by 23%"
    },
    {
      id: 2,
      title: "Customer Behavior Study",
      date: "Dec 25, 2024",
      type: "Customer Insights",
      status: "Complete",
      insights: "Engagement up 15%"
    },
    {
      id: 3,
      title: "Marketing ROI Report",
      date: "Dec 22, 2024",
      type: "Marketing Analytics",
      status: "Complete",
      insights: "ROI improved by 18%"
    },
    {
      id: 4,
      title: "Product Performance Analysis",
      date: "Dec 20, 2024",
      type: "Product Analytics",
      status: "Processing",
      insights: "Analysis in progress..."
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-teal-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">All Reports</h2>
        <p className="text-teal-50">Access and manage your generated analytics reports</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Recent Reports</h3>
            <div className="flex items-center space-x-2 text-sm bg-teal-500 text-white px-3 py-1 rounded-full">
              <span>{reports.length} reports generated</span>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors duration-200 group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                      {report.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Complete' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{report.type}</span>
                    </span>
                    <span>{report.date}</span>
                  </div>
                  
                  <p className="text-sm text-teal-600 mt-2 flex items-center space-x-1">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{report.insights}</span>
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewReports