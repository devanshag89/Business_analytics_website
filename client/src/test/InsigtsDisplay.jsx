const InsightsDisplay = ({ insights }) => {
  if (!insights) return null;

  return (
    <div className="mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-3 text-blue-600">AI-Generated Insights</h2>
      
      <div className="whitespace-pre-line text-gray-800 leading-relaxed">
        {insights}
      </div>
    </div>
  );
};

export default InsightsDisplay;
