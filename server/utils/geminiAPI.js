const axios = require('axios');

async function getInsights(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  for (let i = 0; i < 5; i++) {
    try {
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: prompt }] }]
      });

      return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights generated.";
    } catch (err) {
      if (err.response?.status === 503 && i < 2) {
        console.warn(`Retrying Gemini API... attempt ${i + 1}`);
        await new Promise(res => setTimeout(res, 1000 * (i + 1)));
      } else {
        console.error("Gemini API Error:", err.response?.data || err.message);
        throw new Error("Failed to fetch insights from Gemini API");
      }
    }
  }
}
module.exports = getInsights;
