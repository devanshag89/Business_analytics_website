import { FileText, ArrowUpRight, Download, Eye, User, Calendar, Clock } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';

const ViewReports = () => {
  const [allInsights, setAllInsights] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showFullReport, setShowFullReport] = useState(false);
  const { user } = useAuth();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!user?._id) return;

    const getAllInsights = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/insights/get-all-insights`, {
          userId: user._id,
        });

        if (!response?.data?.allInsights) {
          console.log("No insights received");
          return;
        }

        setAllInsights(response.data.allInsights);
        console.log("Fetched insights:", response.data.allInsights);
      } catch (err) {
        console.error("Error fetching insights:", err);
      }
    };

    getAllInsights();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Time not available';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid time';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadReportAsPDF = async (report) => {
    try {
      // Create a simple HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${report.title} - Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { border-bottom: 2px solid #14b8a6; padding-bottom: 10px; margin-bottom: 20px; }
            .user-info { background: #f0fdfa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .insights { background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
            h1 { color: #14b8a6; margin: 0; }
            h2 { color: #374151; }
            .meta { color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${report.title}</h1>
            <div class="meta">
              Generated on: ${formatDate(report.createdAt || report._id)} at ${formatTime(report.createdAt || report._id)}
            </div>
          </div>
          
          <div class="user-info">
            <h2>User Information</h2>
            <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company}</p>
            <p><strong>Report ID:</strong> ${report._id}</p>
          </div>
          
          <div class="insights">
            <h2>Insights Report</h2>
            <div style="white-space: pre-wrap;">${report.insightReport}</div>
          </div>
        </body>
        </html>
      `;

      // Create a blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title}_${formatDate(report.createdAt)}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const openFullReport = (report) => {
    setSelectedReport(report);
    setShowFullReport(true);
  };

  const closeFullReport = () => {
    setShowFullReport(false);
    setSelectedReport(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-teal-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">All Reports</h2>
        <p className="text-teal-50">Access and manage your generated analytics reports</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Your Insights Reports</h3>
            <div className="flex items-center space-x-2 text-sm bg-teal-500 text-white px-3 py-1 rounded-full">
              <span>{allInsights.length} reports generated</span>
            </div>
          </div>
        </div>
        
        {allInsights.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No reports generated yet</p>
            <p className="text-sm">Upload your data to generate insights reports</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {allInsights.map((report) => (
              <div key={report._id} className="p-6 hover:bg-gray-50 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                        {report.title}
                      </h4>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Complete
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                      <span className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>Insights Report</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(report.createdAt || report._id)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(report.createdAt || report._id)}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-teal-600 flex items-center space-x-1">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>
                        {report.insightReport.substring(0, 100)}
                        {report.insightReport.length > 100 ? '...' : ''}
                      </span>
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => openFullReport(report)}
                      className="group relative p-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      title="View Full Report"
                    >
                      <Eye className="w-5 h-5" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                    </button>
                    <button 
                      onClick={() => downloadReportAsPDF(report)}
                      className="group relative p-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      title="Download Report"
                    >
                      <Download className="w-5 h-5" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Report Modal */}
      {showFullReport && selectedReport && (
        <div className="fixed inset-0 bg-gradient-to-b from-slate-800 to-slate-700 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{selectedReport.title}</h3>
                <p className="text-sm text-gray-600">
                  Generated on {formatDate(selectedReport.createdAt || selectedReport._id)} at {formatTime(selectedReport.createdAt || selectedReport._id)}
                </p>
              </div>
              <button 
                onClick={closeFullReport}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* User Details Section */}
              <div className="bg-teal-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-teal-600" />
                  User Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="text-gray-800">{user.firstName} {user.lastName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Company:</span>
                    <p className="text-gray-800">{user.company}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Report ID:</span>
                    <p className="text-gray-800 font-mono text-xs">{selectedReport._id}</p>
                  </div>
                </div>
              </div>

              {/* Insights Report Section */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Insights Report</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                    {selectedReport.insightReport}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => downloadReportAsPDF(selectedReport)}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button 
                onClick={closeFullReport}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReports;