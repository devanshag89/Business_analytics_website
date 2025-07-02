require("dotenv").config();
const {db} = require("./database/db");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/test', (req, res) => {
    res.send("app is working");
})


app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    db().then(() => {
        console.log(`Sever is listening on port ${PORT}`);
    })
})