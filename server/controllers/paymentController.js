const Razorpay = require('razorpay');


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const makePayment =  async (req, res) => {
  const options = {
    amount: 49900, // ₹499
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };
  const order = await instance.orders.create(options);
  res.json(order);
};

module.exports = makePayment;