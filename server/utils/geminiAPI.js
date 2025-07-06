const axios = require('axios');

async function getInsights(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const maxRetries = 5;
  const initialDelay = 1000;
  const retryableStatusCodes = [503];

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.post(
        url,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          timeout: 30000,
        }
      );

      return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights generated.";
    } catch (err) {
      const isRetryable =
        (!err.response || retryableStatusCodes.includes(err.response.status)) &&
        attempt < maxRetries - 1;

      if (!isRetryable) {
        console.error("Gemini API Error:", err.response?.data || err.message);
        throw new Error("Failed to fetch insights from Gemini API");
      }

      console.warn(`Retrying Gemini API... attempt ${attempt + 1}. Reason:`, err.response?.status || err.message);
      const delay = initialDelay * (attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Max retries reached for Gemini API");
}

module.exports = getInsights;
