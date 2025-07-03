const express = require("express");
const makePayment = require("../controllers/paymentController")


const router = express.Router();

router.post("/create-order", makePayment);


module.exports = router;