import { CreditCard, ArrowUpRight, Calendar, Clock, DollarSign, Hash, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';

const ViewTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFullTransaction, setShowFullTransaction] = useState(false);
  const { user } = useAuth();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!user?._id) return;

    const getAllTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/transactions/getTransations/${user._id}`);

        if (!response?.data) {
          console.log("No transactions received");
          return;
        }

        setAllTransactions(response.data);
        console.log("Fetched transactions:", response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    getAllTransactions();
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

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const openFullTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowFullTransaction(true);
  };

  const closeFullTransaction = () => {
    setShowFullTransaction(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-teal-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">All Transactions</h2>
        <p className="text-teal-50">View and manage your payment history</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Your Transaction History</h3>
            <div className="flex items-center space-x-2 text-sm bg-teal-500 text-white px-3 py-1 rounded-full">
              <span>{allTransactions.length} transactions</span>
            </div>
          </div>
        </div>
        
        {allTransactions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No transactions found</p>
            <p className="text-sm">Your payment history will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {allTransactions.map((transaction) => (
              <div key={transaction._id} className="p-6 hover:bg-gray-50 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                        {transaction.title}
                      </h4>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                      <span className="flex items-center space-x-1">
                        <span className="font-semibold text-teal-600">{formatAmount(transaction.amount)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(transaction.createdAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(transaction.createdAt)}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-teal-600 flex items-center space-x-1">
                      <span>Reference Id : {transaction.referenceId}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => openFullTransaction(transaction)}
                      className="group relative p-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      title="View Transaction Details"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Transaction Modal */}
      {showFullTransaction && selectedTransaction && (
        <div className="fixed inset-0 bg-gradient-to-b from-slate-800 to-slate-700 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{selectedTransaction.title}</h3>
                <p className="text-sm text-gray-600">
                  Transaction completed on {formatDate(selectedTransaction.createdAt)} at {formatTime(selectedTransaction.createdAt)}
                </p>
              </div>
              <button 
                onClick={closeFullTransaction}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Transaction Details Section */}
              <div className="bg-teal-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-teal-600" />
                  Transaction Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Transaction ID:</span>
                    <p className="text-gray-800 font-mono text-xs">{selectedTransaction._id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Reference ID:</span>
                    <p className="text-gray-800 font-mono text-xs">{selectedTransaction.referenceId}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Amount:</span>
                    <p className="font-semibold text-lg text-teal-600">{formatAmount(selectedTransaction.amount)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Status:</span>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Information Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Account Information</h4>
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
                    <span className="font-medium text-gray-600">User ID:</span>
                    <p className="text-gray-800 font-mono text-xs">{selectedTransaction.userId}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button 
                onClick={closeFullTransaction}
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

export default ViewTransactions;