import axios from 'axios';

const PaymentButton = ({ filename, setInsights }) => {
  const loadRazorpay = async () => {
    console.log(filename);
    console.log("Razorpay Key ID:", import.meta.env.VITE_RAZORPAY_KEY_ID);
    const { data } = await axios.post('http://localhost:5000/api/payment/create-order');
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      order_id: data.id,
      
      handler: async function (response) {
        const res = await axios.post('http://localhost:5000/api/insights/generate', {
          razorpay_payment_id: response.razorpay_payment_id,
          filename,
        });
        setInsights(res.data.insights);
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={loadRazorpay} className="bg-green-600 text-white px-4 py-2 rounded mt-4">Pay & Analyze</button>;
};

export default PaymentButton;
