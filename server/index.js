require("dotenv").config();
const {db} = require("./database/db");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://business-analytics-website.onrender.com',
  credentials: true
}));

app.get('/test', (req, res) => {
    res.send("app is working");
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require('./routes/upload');
const paymentRoutes = require('./routes/paymentRoutes');
const insightsRoutes = require('./routes/insightRoutes');
const messageRoutes = require('./routes/messageRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/newMessage',messageRoutes);
app.use('/api/transactions',transactionRoutes);

app.get('/',(req,res)=>{
    res.send("api is working");
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    db().then(() => {
        console.log(`Sever is listening on port ${PORT}`);
    })
})