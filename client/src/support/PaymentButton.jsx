import { BarChart2, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const PaymentButton = ({ filename, setInsights, isGenerating, setIsGenerating, title }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const {user} = useAuth();
  const loadRazorpay = async () => {
    setIsGenerating(true);
    try {
      console.log(user._id);
      console.log(title);
      console.log(filename);
      console.log("Razorpay Key ID:", import.meta.env.VITE_RAZORPAY_KEY_ID);
      const { data } = await axios.post(`${BASE_URL}/payment/create-order`);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        order_id: data.id,
        
        handler: async function (response) {
          try{
          const res = await axios.post(`${BASE_URL}/insights/generate`, {
            razorpay_payment_id: response.razorpay_payment_id,
            filename,
            title,
            userId : user._id,
          });
          setInsights(res.data.insights);
          console.log(res.data.insightId)
          setIsGenerating(false);
        }
        catch(err){
          console.log(err);
          setIsGenerating(false);
          alert("Error in generating insights");
        }
        },
        
        modal: {
          ondismiss: () => {
            setIsGenerating(false);
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setIsGenerating(false);
      console.error("Payment error:", error);
    }
  };

  return (
    <button 
      onClick={loadRazorpay} 
      disabled={isGenerating}
      className="w-full bg-teal-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl mt-6"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          <span>Pay & Generate Insights</span>
        </>
      )}
    </button>
  );
};


export default PaymentButton