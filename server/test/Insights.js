const express = require('express');
const router = express.Router();
const getInsights = require('../utils/geminiAPI');
const parseCSVtoTable = require('../utils/parseCSV');
const path = require('path');

router.post('/generate', async (req, res) => {
  const { razorpay_payment_id, filename } = req.body;


  const filePath = path.join(__dirname, '../uploads', filename);
  const table = await parseCSVtoTable(filePath);
  const prompt = `
Analyze the following business table and provide 5 meaningful insights.
Show trends, outliers, or patterns. Format output as bullet points.

${table}
`;

  const insights = await getInsights(prompt);
  res.json({ insights });
});

module.exports = router;
