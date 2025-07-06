const express = require("express");
const {generateInsights, getAllInsights} = require('../controllers/insightsController')


const router = express.Router();

router.post("/generate", generateInsights);
router.post("/get-all-insights", getAllInsights);


module.exports = router;