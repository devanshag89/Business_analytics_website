const getInsights = require('../utils/geminiAPI');
const parseCSVtoTable = require('../utils/parseCSV');
const InsightsModel = require('../models/InsightsSchema');
const path = require('path');



const generateInsights = async (req, res) => {
  try {
    const { razorpay_payment_id, filename, title, userId } = req.body;

    const filePath = path.join(__dirname, '../uploads', filename);
    const table = await parseCSVtoTable(filePath);
    const prompt = `
      Analyze the following business table and provide 5 meaningful insights.
      Show trends, outliers, or patterns. Format output as bullet points.

      ${table}
    `;

    const insights = await getInsights(prompt);

    const InsightsSave = await InsightsModel.create({
      userId: userId,
      title: title,
      insightReport: insights
    });

    

    res.json({ insights, insightId: InsightsSave._id });
  } catch (error) {
    console.error("Error generating insights:", error);
    res.status(500).json({ message: 'Failed to generate insights', error: error.message });
  }
};

const getAllInsights = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: 'userId is not received' });

    const allInsights = await InsightsModel.find({ userId });

    if (!allInsights || allInsights.length === 0)
      return res.status(404).json({ message: 'There are no insights to show' });

    return res.status(200).json({ message: 'All the insights are fetched', allInsights });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ message: 'Failed to fetch insights', error: error.message });
  }
};

module.exports = { generateInsights, getAllInsights };
