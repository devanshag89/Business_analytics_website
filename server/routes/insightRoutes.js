const express = require("express");
const generateInsights = require('../controllers/insightsController')


const router = express.Router();

router.post("/generate", generateInsights);


module.exports = router;